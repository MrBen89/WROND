class User < ApplicationRecord
  after_create :create_profile
  { on_delete: :cascade }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_one :user_profile, class_name: "UserProfile"
  has_many :conflicts
  has_many :unlocks, dependent: :destroy
  has_many :puzzles, dependent: :destroy
  has_many :unlocked_kanji, through: :unlocks, source: :kanji

  private

  def create_profile
    user_prof = UserProfile.new
    user_prof.user = self
    user_prof.username = self.email.split("@")[0]
    user_prof.level = 1
    user_prof.total_xp = 0
    user_prof.tagline = "I Love Pies"
    user_prof.bio = "Tell us about yourself!"
    user_prof.cell_style = Upgrade.where(name: "Grey Background", upgrade_type: "cell").first
    user_prof.active_style = Upgrade.where(name: "Grey Squares", upgrade_type: "active").first
    user_prof.flagged_style = Upgrade.where(name: "Grey Squares", upgrade_type: "flagged").first
    user_prof.background_style = Upgrade.where(name: "None", upgrade_type: "background").first
    user_prof.save!
  end

end
