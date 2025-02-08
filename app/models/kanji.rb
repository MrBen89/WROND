class Kanji < ApplicationRecord
  has_many :puzzles, dependent: :destroy
end
