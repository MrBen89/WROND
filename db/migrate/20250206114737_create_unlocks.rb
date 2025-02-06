class CreateUnlocks < ActiveRecord::Migration[7.1]
  def change
    create_table :unlocks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :upgrade, null: false, foreign_key: true

      t.timestamps
    end
  end
end
