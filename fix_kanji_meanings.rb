require 'json'

KANJI_DATA_FILE = "db/kanji_data.json"

kanji_data = JSON.parse(File.read(KANJI_DATA_FILE))

kanji_data.each do |kanji, details|
  details["meanings"] = [details["meanings"].first] if details["meanings"].is_a?(Array)
end

File.write(KANJI_DATA_FILE, JSON.pretty_generate(kanji_data))
puts "✅ Updated kanji meanings to keep only the first one."
