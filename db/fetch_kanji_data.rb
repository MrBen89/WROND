require 'json'
require 'net/http'
require 'uri'

KANJI_API_URL = "https://kanjiapi.dev/v1/kanji/joyo"
kanji_list = JSON.parse(Net::HTTP.get(URI(KANJI_API_URL)))

kanji_details = {}

kanji_list.each_with_index do |kanji, index|
  kanji_url = "https://kanjiapi.dev/v1/kanji/#{URI.encode_www_form_component(kanji)}"
  kanji_data = JSON.parse(Net::HTTP.get(URI(kanji_url)))
  kanji_details[kanji] = kanji_data

  puts "Fetched details for #{index + 1}/#{kanji_list.size} Kanji" if (index + 1) % 10 == 0

  sleep(0.1)
end

File.open("db/kanji_data.json", "w") do |file|
   file.write(JSON.pretty_generate(kanji_details))
end

puts "✅ Kanji data saved to db/kanji_data.json!"
