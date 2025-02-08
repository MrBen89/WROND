class KanjiController < ApplicationController

  def index
    @kanji = policy_scope(Kanji)
  end

  def show
    @user = UserProfile.find(current_user.id)
    authorize @user
  end
end
