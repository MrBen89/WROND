class KanjiController < ApplicationController
  def index
    @kanji = Kanji.all
    authorize @kanji
  end
  def show
    @kanji = Kanji.find(params[:id])  # Find Kanji by ID from the URL
    authorize @kanji
  end
end
