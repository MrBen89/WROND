class Kanji < ApplicationRecord
  has_many :puzzles, dependent: :destroy
  has_many :conflicts
end
