require 'open-uri'
require 'nokogiri'
require 'json'

KANJI_DATA_FILE = "db/kanji_data.json"
kanji_data = JSON.parse(File.read(KANJI_DATA_FILE))

def fetch_jlpt_levels
  correct_jlpt_levels = {}

  (1..5).each do |level|
    page = 1
    loop do
      url = "https://jisho.org/search/%23jlpt-n#{level}%20%23kanji?page=#{page}"
      puts "🔍 Fetching JLPT-N#{level}, Page #{page}"

      begin
        html = URI.open(url).read
        doc = Nokogiri::HTML(html)
        kanji_list = doc.css(".character a").map { |link| link.text.strip }

        break if kanji_list.empty?

        kanji_list.each { |kanji| correct_jlpt_levels[kanji] = level }

        page += 1
        sleep(1) # Avoid getting blocked
      rescue => e
        puts "❌ Error fetching JLPT-N#{level}, Page #{page}: #{e.message}"
        break
      end
    end
  end

  correct_jlpt_levels
end

new_jlpt_levels = fetch_jlpt_levels

kanji_data.each do |kanji, details|
  if new_jlpt_levels[kanji]
    details["jlpt_new"] = new_jlpt_levels[kanji].to_s
  end
end

File.write(KANJI_DATA_FILE, JSON.pretty_generate(kanji_data))
puts "✅ Updated JLPT levels in #{KANJI_DATA_FILE}"
