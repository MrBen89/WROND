class KanjiController < ApplicationController
  def index
    @kanji = Kanji.all
  end
  def show
    @user = UserProfile.find(current_user.id)
    authorize @user
  end
end
