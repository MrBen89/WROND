require 'json'

file = './db/kanji_data.json'

kanji_data = JSON.parse(File.read(file))

kanji_data.each do |kanji, data|
  if data['meanings'].is_a?(Array)
    data['meanings'] = [data['meanings'].first]
  end
end

File.open(file, 'w') do |f|
  f.write(JSON.pretty_generate(kanji_data))
end

puts "Kanji data cleaned up successfully!"
