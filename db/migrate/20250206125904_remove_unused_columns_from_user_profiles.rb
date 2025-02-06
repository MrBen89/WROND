class RemoveUnusedColumnsFromUserProfiles < ActiveRecord::Migration[7.1]
  def change
    remove_column :user_profiles, :ranking, :string
    remove_column :user_profiles, :language_preference, :string
    remove_column :user_profiles, :theme, :string
  end
end
