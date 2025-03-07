class Conflict < ApplicationRecord
  after_create_commit :broadcast_conflict
  after_update_commit :broadcast_update
  after_update_commit :broadcast_update_p1
  after_update_commit :broadcast_update_p2

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

  def broadcast_update_p1
    broadcast_update_to self,
    target: "room#{self.id}player#{user1.id}",
    partial: "conflicts/p2puzzle",
    locals: { conflict: self }
  end

  def broadcast_update_p2
    unless user2.nil?
      broadcast_update_to self,
      target: "room#{self.id}player#{user2.id}",
      partial: "conflicts/p2puzzle",
      locals: { conflict: self }
    end
  end
end
# def update_message
#   broadcast_replace_to(user, :message, target: "message", template: "messages/show", locals: { message: self })
# end
