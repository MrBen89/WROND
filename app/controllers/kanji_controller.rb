class KanjiController < ApplicationController

  def index
    @kanji = policy_scope(Kanji)
  end

  def show
    @kanji = Kanji.find(params[:id])
    @user = UserProfile.find(current_user.id)
    authorize @user
  end
end
