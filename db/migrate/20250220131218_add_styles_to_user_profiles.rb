class AddStylesToUserProfiles < ActiveRecord::Migration[7.1]
  def change
    add_reference :user_profiles, :cell_style
    add_reference :user_profiles, :background_style
    add_reference :user_profiles, :flagged_style
    add_reference :user_profiles, :active_style
    add_foreign_key :user_profiles, :upgrades, column: :cell_style_id
    add_foreign_key :user_profiles, :upgrades, column: :background_style_id
    add_foreign_key :user_profiles, :upgrades, column: :flagged_style_id
    add_foreign_key :user_profiles, :upgrades, column: :active_style_id
  end
end
