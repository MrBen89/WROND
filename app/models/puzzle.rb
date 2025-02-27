class Puzzle < ApplicationRecord
  after_create_commit :update_highscores
  belongs_to :user
  belongs_to :kanji

  def update_highscores
    broadcast_update_to "highscore_box",
    partial: "kanji/highscore",
    locals: { puzzles: Puzzle.all.limit(10) },
    target: "highscores#{self.kanji_id}"
    p self.kanji_id
  end
end
