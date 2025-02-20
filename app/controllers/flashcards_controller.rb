class FlashcardsController < ApplicationController
  def index
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map(&:kanji)
  end
end
