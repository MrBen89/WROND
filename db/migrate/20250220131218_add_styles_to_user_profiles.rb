class AddStylesToUserProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :user_profiles, :cell_style, :string
    add_column :user_profiles, :active_style, :string
    add_column :user_profiles, :background_style, :string
  end
end
