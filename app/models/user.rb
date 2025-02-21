class User < ApplicationRecord
  after_create :create_profile
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_one :user_profile, class_name: "UserProfile"
  has_many :unlocks
  has_many :puzzles

  private

  def create_profile
    user_prof = UserProfile.new
    user_prof.user = self
    user_prof.username = self.email
    user_prof.level = 0
    user_prof.total_xp = 0
    user_prof.tagline = "I Love Pies"
    user_prof.bio = "Tell us about yourself!"
    user_prof.cell_style = "Transparent"
    user_prof.active_style = "Dark Grey Squares"
    user_prof.flagged_style = "Light Grey Squares"
    user_prof.background_style = "None"
    user_prof.save
  end

end
