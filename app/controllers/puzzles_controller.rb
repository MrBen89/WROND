class PuzzlesController < ApplicationController
  def create
    @puzzle = Puzzle.new(puzzle_params)
    @puzzle.user = current_user
    authorize @puzzle
    @puzzle.save
  end

  private
  def puzzle_params
    params.require(:puzzle).permit(:time, :kanji_id)
  end
end
