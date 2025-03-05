class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :index]

  def home
    if params[:mode] == "kanji"
      redirect_to kanji_index_path
    end
    if params[:mode] == "story"
      redirect_to practice_index_path
    end
    if params[:mode] == "battle"
      redirect_to conflicts_path
    end
    if params[:mode] == "daily"
      p "daily kanji"
      p Rails.cache.fetch(:todays_kanji)
      kanji = Rails.cache.fetch(:todays_kanji, expires_in: 24.hours) do
        (Kanji.all.sample).id
      end
      redirect_to kanji_path(kanji)
    end
    @last_five_kanji = last_five_kanji(@user_profile)
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map { |unlock| unlock.kanji.kanji }.reverse.take(5)
  end

  def index
  end

  private

  def last_five_kanji(user_profile)
    Unlock.where(user: current_user).includes(:kanji).order(created_at: :desc).limit(5).map { |unlock| unlock.kanji }
  end
end
