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


Puzzle.destroy_all
UserProfile.destroy_all
User.destroy_all
Kanji.destroy_all

default_user = User.create!(
  email: 'default_user@gmail.com',
  password: 'password'
)

users = [
  { username: 'miaracoon', email: 'miaracoon@gmail.com' },
  { username: 'bigben69', email: 'bigben69@gmail.com' },
  { username: 'liamlovehotel', email: 'liamlovehotel@gmail.com' },
  { username: 'welovejulian', email: 'welovejulian@gmail.com' }
]

users.each do |user_data|
  user = User.create!(
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
    puzzleInfo: kanji_puzzle_map[kanji] || []
  }
end

Kanji.insert_all(kanji_records)



puts "Seeded #{Kanji.count} kanji from JSON!"

kanji_ids = Kanji.pluck(:kanji, :id).to_h

# puzzle_records = puzzle_data.filter_map do |p|
#   { kanji_id: kanji_ids[p["name"]], user_id: default_user.id, time: 30 } if kanji_ids[p["name"]]
# end

# Puzzle.insert_all(puzzle_records) if puzzle_records.any?

puts "✅ Seeded #{Puzzle.count} puzzles!"
