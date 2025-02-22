class PracticeController < ApplicationController

  def index
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map(&:kanji)
  end
end
