class RemoveGradeAndStrokeCountFromKanjis < ActiveRecord::Migration[7.1]
  def change
    remove_column :kanjis, :grade, :integer
    remove_column :kanjis, :strokeCount, :integer
  end
end
