class AddUpgradeTypeToUpgrades < ActiveRecord::Migration[7.1]
  def change
    add_column :upgrades, :upgrade_type, :string
  end
end
