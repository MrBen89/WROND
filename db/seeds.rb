# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'faker'
require 'json'
require 'net/http'
require 'uri'
require 'httparty'

Conflict.destroy_all
Unlock.destroy_all
Puzzle.destroy_all
UserProfile.destroy_all
Upgrade.destroy_all
User.destroy_all
Kanji.destroy_all

Upgrade.create!(
  name:"Grey Background",
  level: 0,
  description: "The default. Some might say classic.",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"Red Background",
  level: 1,
  description: "Squares as red as the setting sun",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"Orange Background",
  level: 2,
  description: "Squares as orange as the sweetest fruit",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"Yellow Background",
  level: 3,
  description: "Squares as yellow as foul smelling sulphur",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"Green Background",
  level: 4,
  description: "Squares as green as the softest grass",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"Blue Background",
  level: 5,
  description: "Squares as blue as the deepest ocean",
  upgrade_type: "cell"
)
Upgrade.create!(
  name:"WROND! Background",
  level: 10,
  description: "Squares that are just WROND!",
  upgrade_type: "cell"
)

Upgrade.create!(
  name:"Grey Squares",
  level: 0,
  description: "The default. Some might say classic.",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Red Squares",
  level: 2,
  description: "Squares as red as the setting sun",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Orange Squares",
  level: 3,
  description: "Squares as orange as the sweetest fruit",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Yellow Squares",
  level: 4,
  description: "Squares as yellow as foul smelling sulphur",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Green Squares",
  level: 5,
  description: "Squares as green as the softest grass",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Blue Squares",
  level: 6,
  description: "Squares as blue as the deepest ocean",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"WROND! Squares",
  level: 20,
  description: "Squares that are just WROND!",
  upgrade_type: "active"
)
Upgrade.create!(
  name:"Grey Squares",
  level: 0,
  description: "The default. Some might say classic.",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"Red Squares",
  level: 5,
  description: "Squares as red as the setting sun",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"Orange Squares",
  level: 10,
  description: "Squares as orange as the sweetest fruit",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"Yellow Squares",
  level: 15,
  description: "Squares as yellow as foul smelling sulphur",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"Green Squares",
  level: 20,
  description: "Squares as green as the softest grass",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"Blue Squares",
  level: 25,
  description: "Squares as blue as the deepest ocean",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"WROND! Squares",
  level: 30,
  description: "Squares that are just WROND!",
  upgrade_type: "flagged"
)
Upgrade.create!(
  name:"None",
  level: 0,
  description: "Nothing. Just the emptyness of the void",
  upgrade_type: "background"
)
Upgrade.create!(
  name: "Wrondarou",
  level: 10,
  description: "Everyone's favourite Samurai!",
  upgrade_type: "background"
)


default_user = User.create!(
  email: 'default_user@gmail.com',
  password: 'password'
)

users = [
  { username: 'mankymia', email: 'mankymia@gmail.com' },
  { username: 'bigben', email: 'bigben@gmail.com' },
  { username: 'lovelyliam', email: 'lovelyliam@gmail.com' },
  { username: 'juicyjulian', email: 'juicyjulian@gmail.com' }
]

users.each do |user_data|
  User.create!(
    email: user_data[:email],
    password: 'password'
  )

end

puts " Seeded #{User.count} users!"

kanji_file_path = File.join(Rails.root, 'db', 'kanji_data.json')
puzzle_file_path = File.join(Rails.root, 'db', 'puzzles.json')

kanji_data = JSON.parse(File.read(kanji_file_path))
puzzle_data = JSON.parse(File.read(puzzle_file_path))["puzzles"]

kanji_puzzle_map = puzzle_data.to_h { |p| [p["name"], p["value"]] }


kanji_records = kanji_data.map do |kanji, details|
  {
    kanji: kanji,
    jlptLevel: details["jlpt_new"],
    meaning: "{#{details['meanings'].map { |m| m.gsub('"', '') }.join(',')}}",
    kunyomi: "{#{details['readings_kun']&.map { |k| k.gsub('"', '') }.join(',')}}",
    onyomi: "{#{details['readings_on']&.map { |o| o.gsub('"', '') }.join(',')}}",
    stroke_count: details["strokes"] || 0,
    grade: details["grade"],
    puzzleInfo: kanji_puzzle_map[kanji] || [],
    audio: details["audio"],
    example_sentences: details["example_sentences"] || []
  }
end

Kanji.insert_all(kanji_records)



puts "Seeded #{Kanji.count} kanji from JSON!"

kanji_ids = Kanji.pluck(:kanji, :id).to_h

n5kanji = Kanji.where(jlptLevel: "5")
ben = UserProfile.where(username: "bigben").first
p ben
n5kanji.each do |kanji|
  if kanji.kanji != "三"
    Puzzle.create!(
      kanji: kanji,
      user_id: ben.user_id,
      time: 220
    )
    Unlock.create!(
      kanji: kanji,
      user_id: ben.user_id,
    )
  end
end

# puzzle_records = puzzle_data.filter_map do |p|
#   { kanji_id: kanji_ids[p["name"]], user_id: default_user.id, time: 30 } if kanji_ids[p["name"]]
# end

# Puzzle.insert_all(puzzle_records) if puzzle_records.any?

# puts "✅ Seeded #{Puzzle.count} puzzles!"

#Upgrades seeds - Will split into seperate file later
#
