class AddPuzzleDataToPuzzles < ActiveRecord::Migration[7.1]
  def change
    add_column :puzzles, :puzzle_data, :text
  end
end
