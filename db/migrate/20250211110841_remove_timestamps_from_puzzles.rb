class RemoveTimestampsFromPuzzles < ActiveRecord::Migration[7.1]
  def up
    remove_column :kanjis, :created_at
    remove_column :kanjis, :updated_at
  end

  def down
    add_timestamps :kanjis, null: false, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
