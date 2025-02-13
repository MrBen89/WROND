class KanjiController < ApplicationController

  def index
    @kanji = policy_scope(Kanji)
  end

  def show
    @kanji = Kanji.find(params[:id])
    @user = UserProfile.find(current_user.id)
    @puzzle = Puzzle.new
    authorize @user
  end
end
