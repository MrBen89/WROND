class AddFieldsToUserProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :user_profiles, :ranking, :string
    add_column :user_profiles, :language_preference, :string
    add_column :user_profiles, :theme, :string
  end
end
