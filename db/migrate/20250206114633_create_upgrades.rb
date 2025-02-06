class CreateUpgrades < ActiveRecord::Migration[7.1]
  def change
    create_table :upgrades do |t|
      t.string :name
      t.string :level
      t.text :description

      t.timestamps
    end
  end
end
