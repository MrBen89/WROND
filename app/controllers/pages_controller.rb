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
      redirect_to kanji_path()
    end
  end

  def index
  end
end
