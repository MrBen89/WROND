class Conflict < ApplicationRecord
  #after_create_commit :broadcast_conflict
  #after_update_commit :broadcast_conflict


  belongs_to :kanji
  belongs_to :user1, class_name: "User", foreign_key: "user1_id", required: true
  belongs_to :user2, class_name: "User", foreign_key: "user2_id", optional: true

  private

  def broadcast_conflict
    p "broadcast"
    broadcast_append_to "available_games",
    partial: "conflicts/join_card",
    locals: { conflict: self }
  end
end
