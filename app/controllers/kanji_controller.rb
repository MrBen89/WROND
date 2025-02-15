class KanjiController < ApplicationController

  def index
    @kanji = policy_scope(Kanji)
  end

  def show
    @kanji = Kanji.find(params[:id])
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @puzzle = Puzzle.new
    authorize @user_profile
  end
end
