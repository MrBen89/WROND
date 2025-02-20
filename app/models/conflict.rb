class Conflict < ApplicationRecord
  after_create_commit :broadcast_conflict
  after_update_commit :broadcast_update

  belongs_to :kanji
  belongs_to :user1, class_name: "User", foreign_key: "user1_id", required: true
  belongs_to :user2, class_name: "User", foreign_key: "user2_id", optional: true

  private

  def broadcast_conflict
    broadcast_append_to "available_games",
    partial: "conflicts/join_card",
    locals: { conflict: self },
    target: "games"
  end

  def broadcast_update
    broadcast_update_to self,
    target: "conflicts_box",
    partial: "conflicts/p1puzzle",
    locals: { conflict: self }
  end

end
# def update_message
#   broadcast_replace_to(user, :message, target: "message", template: "messages/show", locals: { message: self })
# end
