class KanjiController < ApplicationController


  def index
    @kanji = policy_scope(Kanji)
    @puzzles = Puzzle.where(user: current_user)
  end

  def show
    @on = kanji?("音")
    @kun = kanji?("訓")
    @yomi = kanji?("読")
    @kanji = Kanji.find(params[:id])
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @puzzle = Puzzle.new
    authorize @user_profile
  end

  def kanji?(input)
    kanji = Kanji.where(kanji: input)
    current_user.puzzles.where(kanji_id: kanji).count > 0
  end

end
