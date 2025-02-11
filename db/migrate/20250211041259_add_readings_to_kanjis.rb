class AddReadingsToKanjis < ActiveRecord::Migration[7.1]
  def change
    add_column :kanjis, :kunyomi, :string
    add_column :kanjis, :onyomi, :string
    add_column :kanjis, :stroke_count, :integer
  end
end
