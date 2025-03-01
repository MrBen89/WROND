require_relative 'config/environment'  # Load Rails environment
require 'json'

# Paths
KANJI_JSON_PATH = "db/kanji_data.json"

# Load existing kanji_data.json
kanji_data = File.exist?(KANJI_JSON_PATH) ? JSON.parse(File.read(KANJI_JSON_PATH)) : {}

# Fetch all kanji from the database
kanji_from_db = Kanji.all

kanji_from_db.each do |kanji|
  kanji_char = kanji.kanji

  # Merge old data with new scraped data
  kanji_data[kanji_char] ||= {}  # Initialize if missing

  # Preserve old fields while adding new ones
  kanji_data[kanji_char].merge!(
    "strokes" => kanji_data[kanji_char]["strokes"] || kanji.stroke_count,
    "grade" => kanji_data[kanji_char]["grade"] || kanji.grade,
    "freq" => kanji_data[kanji_char]["freq"], # Preserve if exists
    "jlpt_old" => kanji_data[kanji_char]["jlpt_old"], # Preserve if exists
    "jlpt_new" => kanji.jlptLevel, # Update with new level
    "meanings" => kanji.meaning || kanji_data[kanji_char]["meanings"],
    "readings_on" => kanji.onyomi&.split(", ") || kanji_data[kanji_char]["readings_on"],
    "readings_kun" => kanji.kunyomi&.split(", ") || kanji_data[kanji_char]["readings_kun"],
    "audio" => kanji.audio || kanji_data[kanji_char]["audio"],
    "example_sentences" => kanji.example_sentences || kanji_data[kanji_char]["example_sentences"],
    "wk_level" => kanji_data[kanji_char]["wk_level"], # Preserve if exists
    "wk_meanings" => kanji_data[kanji_char]["wk_meanings"], # Preserve if exists
    "wk_readings_on" => kanji_data[kanji_char]["wk_readings_on"], # Preserve if exists
    "wk_readings_kun" => kanji_data[kanji_char]["wk_readings_kun"], # Preserve if exists
    "wk_radicals" => kanji_data[kanji_char]["wk_radicals"] # Preserve if exists
  )
end

# Save back to kanji_data.json
File.write(KANJI_JSON_PATH, JSON.pretty_generate(kanji_data))

puts "✅ kanji_data.json updated with new scraped data!"
