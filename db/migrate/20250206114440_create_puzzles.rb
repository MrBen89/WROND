class CreatePuzzles < ActiveRecord::Migration[7.1]
  def change
    create_table :puzzles do |t|
      t.integer :time
      t.integer :userDifficulty
      t.references :user, null: false, foreign_key: true
      t.references :kanji, null: false, foreign_key: true

      t.timestamps
    end
  end
end
