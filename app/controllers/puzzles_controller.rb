class PuzzlesController < ApplicationController
  def create
    @puzzle = Puzzle.new(time: puzzle_params[:time], kanji_id: puzzle_params[:kanji_id])
    @puzzle.user = current_user
    authorize @puzzle
    @puzzle.save
    @user_profile = UserProfile.find(current_user.user_profile.id)
    authorize @user_profile
    @user_profile.update(level: puzzle_params[:level], total_xp: puzzle_params[:total_xp])
  end

  private
  def puzzle_params
    params.require(:puzzle).permit(:time, :kanji_id, :level, :total_xp)
  end
end
