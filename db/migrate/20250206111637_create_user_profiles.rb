class CreateUserProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :user_profiles do |t|
      t.string :username
      t.text :bio
      t.string :tagline
      t.integer :level
      t.integer :total_xp
      t.string :profile_pic
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
