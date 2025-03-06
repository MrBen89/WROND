require 'json'

# Path to the JSON file (update with the correct path)
file_path = "db/kanji_data.json"

# Load JSON data
kanji_data = JSON.parse(File.read(file_path))

# Update database
kanji_data.each do |kanji, data|
  if data["example_sentences"] && !data["example_sentences"].empty?
    kanji_entry = Kanji.find_by(kanji: kanji)
    if kanji_entry
      kanji_entry.update(example_sentences: data["example_sentences"])
      puts "✅ Updated #{kanji} with example sentences."
    else
      puts "⚠️ Kanji #{kanji} not found in DB."
    end
  end
end

puts "✅ Done updating example sentences!"
