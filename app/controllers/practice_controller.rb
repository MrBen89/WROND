class PracticeController < ApplicationController

  def index
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @kanji = policy_scope(Kanji)
  end
end
