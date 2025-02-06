class CreateKanjis < ActiveRecord::Migration[7.1]
  def change
    create_table :kanjis do |t|
      t.string :kanji
      t.text :puzzleInfo, array: true, default: []
      t.string :jlptLevel
      t.string :grade
      t.integer :strokeCount
      t.text :meaning, array: true, default: []

      t.timestamps
    end
  end
end
