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

puts " Seeded #{User.count} users and #{UserProfile.count} profiles!"

kanji_file_path = File.join(Rails.root, 'db', 'kanji_data.json')
kanji_data = JSON.parse(File.read(kanji_file_path))

kanji_records = kanji_data.map do |kanji, details|
  {
    kanji: kanji,
    jlptLevel: details["jlpt"],
    meaning: details["meanings"],
    kunyomi: details["kun_readings"]&.join(", "),
    onyomi: details["on_readings"]&.join(", "),
    stroke_count: details["stroke_count"],
    grade: details["grade"],
    created_at: Time.now,
    updated_at: Time.now
  }
end

Kanji.insert_all(kanji_records)

puts "Seeded #{Kanji.count} kanji from JSON!"
