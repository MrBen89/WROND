class KanjiController < ApplicationController


  def index
    @kanji = policy_scope(Kanji)
    @user = current_user
  end

  def show
    @on = kanji?("音")
    @kun = kanji?("訓")
    @yomi = kanji?("読")
    @kanji = Kanji.find(params[:id])
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @puzzles = Puzzle.where("kanji_id = ?", @kanji.id).order("time").limit(10)
    @puzzle = Puzzle.new
    authorize @user_profile
  end

  def kanji?(input)
    kanji = Kanji.where(kanji: input)
    current_user.puzzles.where(kanji_id: kanji).count > 0
  end

end
