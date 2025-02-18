class CreateConflicts < ActiveRecord::Migration[7.1]
  def change
    create_table :conflicts do |t|
      t.references :kanji, null: false, foreign_key: true
      t.references :user1, null: false, foreign_key: {to_table: :users}
      t.references :user2, null: true, foreign_key: {to_table: :users}
      t.text :user1_state, array: true, default: []
      t.text :user2_state, array: true, default: []
      t.string :status
      t.integer :winner
      t.integer :time

      t.timestamps
    end
  end
end
