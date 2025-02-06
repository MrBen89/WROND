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

UserProfile.destroy_all
User.destroy_all

users = [
  { username: 'miaracoon', email: Faker::Internet.unique.email },
  { username: 'bigben69', email: Faker::Internet.unique.email },
  { username: 'liamlovehotel', email: Faker::Internet.unique.email },
  { username: 'welovejulian', email: Faker::Internet.unique.email }
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
