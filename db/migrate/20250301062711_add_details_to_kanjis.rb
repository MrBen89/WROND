class AddDetailsToKanjis < ActiveRecord::Migration[7.1]
  def change
    add_column :kanjis, :audio, :string
    add_column :kanjis, :example_sentences, :json, default: []
  end
end
