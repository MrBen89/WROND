require 'open-uri'
require 'nokogiri'

namespace :scraper do
  desc "Scrape JLPT levels for kanji"
  task jlpt: :environment do
    puts "✅ Running JLPT scraper..."

    JLPT_LEVELS = {
      "n5" => 33,
      "n4" => 30,
      "n3" => 90,
      "n2" => 91,
      "n1" => 173
    }

    def fetch_jlpt_levels(level, pages)
      (1..pages).each do |page|
        url = "https://jisho.org/search/%23jlpt-#{level}%20%23kanji?page=#{page}"
        puts "🔍 Fetching JLPT level data from #{url}"

        begin
          html = URI.open(url).read
          doc = Nokogiri::HTML(html)

          doc.css(".character").each do |entry|
            kanji = entry.at_css(".literal")&.text&.strip || "Unknown"

            kanji_entry = Kanji.find_or_initialize_by(kanji: kanji)
            jlpt_level = level.gsub("n", "").to_i
            kanji_entry.update!(jlptLevel: jlpt_level)

            puts "📌 Updated JLPT Level for #{kanji}: #{jlpt_level}"
          end

          puts "📄 Finished page #{page} of JLPT-#{level}"
          sleep(1)
        rescue => e
          puts "❌ Error on page #{page} of JLPT-#{level}: #{e.message}"
          next
        end
      end
    end

    JLPT_LEVELS.each { |level, pages| fetch_jlpt_levels(level, pages) }

    puts "✅ JLPT level data updated in the database!"
  end
end
