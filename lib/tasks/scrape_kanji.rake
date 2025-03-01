require 'open-uri'
require 'nokogiri'

namespace :scraper do
  desc "Scrape kanji data and update database"
  task kanji: :environment do
    JLPT_LEVELS = {
    "n5" => 33,
  "n4" => 30,
  "n3" => 90,
  "n2" => 91,
  "n1" => 173
    }

    def fetch_words(level, pages)
      (1..pages).each do |page|
        url = "https://jisho.org/search/%23jlpt-#{level}%20%23words?page=#{page}"
        puts "🔍 Fetching #{url}"

        begin
          html = URI.open(url).read
          doc = Nokogiri::HTML(html)

          doc.css(".concept_light").each do |entry|
            # ✅ Get Kanji Word
            word = entry.at_css(".concept_light-representation span.text")&.text&.strip || "Unknown"

            # ✅ Get Furigana (reading)
            furigana_elements = entry.css(".furigana span").map(&:text)
            reading = furigana_elements.join("")

            # ✅ Get Meanings
            meanings = entry.css(".meaning-meaning").map(&:text).map(&:strip)

            # ✅ Get Audio (Fix missing https:)
            audio_tag = entry.at_css("audio source")
            audio = audio_tag ? "https:" + audio_tag["src"] : nil

            # ✅ Get Example Sentences
            # Example sentences extraction
example_sentences = entry.css(".sentence").map do |sentence|
  japanese = sentence.css("ul.japanese li").map(&:text).join(" ")
  english = sentence.at_css(".english")&.text&.strip || "N/A"
  { "japanese" => japanese, "english" => english }
end

# ✅ Debugging output to check extraction
puts "📝 Extracted Sentences for #{word}: #{example_sentences}"

            # ✅ Save to Database
            kanji_entry = Kanji.find_or_initialize_by(kanji: word)
            kanji_entry.update!(
              meaning: meanings,
              onyomi: reading,
              kunyomi: reading,
              jlptLevel: level.gsub("n", "").to_i,
              audio: audio,
              example_sentences: example_sentences
            )

            # Debugging Output
            puts "📘 Word: #{word}, Reading: #{reading}, Audio: #{audio}"
            puts "📝 Example Sentences: #{example_sentences}"
          end

          puts "📄 Finished page #{page} of JLPT-#{level}"
          sleep(1)
        rescue => e
          puts "❌ Error on page #{page} of JLPT-#{level}: #{e.message}"
          next
        end
      end
    end

    # Run the scraper for all JLPT levels
    JLPT_LEVELS.keys.each { |level| fetch_words(level, JLPT_LEVELS[level]) }

    puts "✅ Kanji data updated in the database!"
  end
end
