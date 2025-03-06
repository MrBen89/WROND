class ChangeExampleSentencesToJsonb < ActiveRecord::Migration[7.1]
  def change
    change_column :kanjis, :example_sentences, :jsonb, using: 'example_sentences::jsonb'
  end
end
