class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_one :user_profile, class_name: "UserProfile"
  has_many :conflicts
  has_many :unlocks
  has_many :puzzles
end
