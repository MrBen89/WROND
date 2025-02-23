class PuzzlesController < ApplicationController
  def create
    @puzzle = Puzzle.new(time: puzzle_params[:time], kanji_id: puzzle_params[:kanji_id])
    @puzzle.user = current_user
    authorize @puzzle

    if @puzzle.save
      Unlock.find_or_create_by!(user: current_user, kanji_id: @puzzle.kanji_id)

      @user_profile = UserProfile.find(current_user.user_profile.id)
      authorize @user_profile
      @user_profile.update(level: puzzle_params[:level], total_xp: puzzle_params[:total_xp])

      puts "✅ Puzzle saved! Kanji unlocked."
    else
      puts "❌ Puzzle failed to save."
    end
  end

  private
  def puzzle_params
    params.require(:puzzle).permit(:time, :kanji_id, :level, :total_xp)
  end
end
