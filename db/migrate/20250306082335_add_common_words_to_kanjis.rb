class AddCommonWordsToKanjis < ActiveRecord::Migration[7.1]
  def change
    add_column :kanjis, :common_words, :jsonb, default: []
  end
end
