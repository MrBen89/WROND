class AddKanjiIdToUnlocks < ActiveRecord::Migration[7.1]
  def change
    add_column :unlocks, :kanji_id, :bigint
  end
end
