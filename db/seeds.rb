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
require 'open-uri'
require 'json'
require 'net/http'
require 'uri'

UserProfile.destroy_all
User.destroy_all
Kanji.destroy_all
Puzzle.destroy_all

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

  UserProfile.create!(
    user: user,
    username: user_data[:username],
    bio: Faker::Quote.famous_last_words,
    tagline: Faker::Lorem.sentence(word_count: 3),
    level: rand(1..100),
    total_xp: rand(0..5000),
    profile_pic: Faker::Avatar.image(slug: user_data[:username], size: "100x100", format: "png")
  )
end

puts "Seeded #{User.count} users and #{UserProfile.count} profiles!"

#loads puzzle data
puzzle_file_path = File.join(Rails.root, 'db', 'puzzles.json')
puzzle_data = JSON.parse(File.read(puzzle_file_path))

# extract the mappings
puzzle_mapping = puzzle_data["puzzles"].map { |p| [p["name"], p["value"]] }.to_h

# getting kanji data
KANJI_API_URL = URI("https://kanjiapi.dev/v1/kanji/all")
response = Net::HTTP.get(KANJI_API_URL)
kanji_list = JSON.parse(response)

puts "Fetched #{kanji_list.size} kanji from API"

# seed kanji and puzzles.
kanji_list.each do |kanji|
  next unless puzzle_mapping.key?(kanji)

  kanji_record = Kanji.create!(
    kanji: kanji,
    puzzleInfo: [],
    jlptLevel: nil,
    grade: nil,
    strokeCount: nil,
    meaning: []
  )

  Puzzle.create!(
    kanji: kanji_record,
    user: default_user,
    puzzle_data: puzzle_mapping[kanji]
  )
end

puts "Seeded #{Kanji.count} kanji and #{Puzzle.count} puzzles!"
