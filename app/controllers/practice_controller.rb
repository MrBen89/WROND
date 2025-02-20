class PracticeController < ApplicationController

  def index
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @kanji = ["漢","字","日","本","語","大","根","怪"]
  end
end
