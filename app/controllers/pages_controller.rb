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
  end

  def index
  end
end
