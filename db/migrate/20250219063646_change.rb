class Change < ActiveRecord::Migration[7.1]
  def change
    add_column(:conflicts, :u1_state, :json)
    add_column(:conflicts, :u2_state, :json)
    remove_column :conflicts, :user1_state
    remove_column :conflicts, :user2_state
  end
end
