class RemoveStrokeCountFromKanjis < ActiveRecord::Migration[7.1]
  def change
    remove_column :kanjis, :strokeCount
  end
end
