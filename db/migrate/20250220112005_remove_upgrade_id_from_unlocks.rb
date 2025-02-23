class RemoveUpgradeIdFromUnlocks < ActiveRecord::Migration[7.1]
  def change
    remove_column :unlocks, :upgrade_id, :bigint
  end
end
