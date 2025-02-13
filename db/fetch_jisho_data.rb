require 'json'
require 'net/http'
require 'uri'

# Load puzzle data to get the list of kanji
puzzle_file_path = File.join(__dir__, 'puzzles.json')
puzzle_data = JSON.parse(File.read(puzzle_file_path))["puzzles"]
kanji_list = puzzle_data.map { |p| p["name"] }.uniq

kanji_data = {}

kanji_list.each_with_index do |kanji, index|
  url = URI("https://jisho.org/api/v1/search/words?keyword=#{URI.encode_www_form_component(kanji)}")
  response = Net::HTTP.get(url)
  parsed_data = JSON.parse(response)

  if parsed_data["data"] && !parsed_data["data"].empty?
    kanji_info = parsed_data["data"].first

    kanji_data[kanji] = {
      jlptLevel: kanji_info.dig("jlpt", 0),
      meanings: kanji_info.dig("senses", 0, "english_definitions"),
      kunyomi: kanji_info.dig("japanese", 0, "reading"),
      onyomi: kanji_info.dig("japanese", 1, "reading"),
      strokeCount: nil # Jisho API doesn't directly provide stroke count
    }
  else
    kanji_data[kanji] = { jlptLevel: nil, meanings: [], kunyomi: [], onyomi: [] }
  end

  puts "Fetched #{index + 1}/#{kanji_list.size}: #{kanji}"

  sleep(0.2) # Prevent rate-limiting
end

# Save data to JSON file
File.write(File.join(__dir__, "jisho_kanji.json"), JSON.pretty_generate(kanji_data))
puts "✅ Kanji data saved to db/jisho_kanji.json!"
