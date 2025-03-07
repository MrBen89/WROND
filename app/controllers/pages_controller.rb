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
      if params[:mode] == "practice"
        redirect_to flashcards_path
    end
    if params[:mode] == "daily"
      p "daily kanji"
      p Rails.cache.fetch(:todays_kanji)
      kanji = Rails.cache.fetch(:todays_kanji, expires_in: 24.hours) do
        (Kanji.all.sample).id
      end
      redirect_to kanji_path(kanji)
    end

    # @user_profile = current_user.user_profile
    # @current_xp = @user_profile.total_xp - (50 + (@user_profile.level * 50))
    # @next_level = calculate_next_level_xp
    # @ratio = (@current_xp.to_f / @next_level * 100).round(2)

    @kanji_progress = {
      "N5" => { percentage: calculate_kanji_percentage("5") },
      "N4" => { percentage: calculate_kanji_percentage("4") },
      "N3" => { percentage: calculate_kanji_percentage("3") },
      "N2" => { percentage: calculate_kanji_percentage("2") },
      "N1" => { percentage: calculate_kanji_percentage("1") }
    } if user_signed_in?

    @last_five_kanji = last_five_kanji(@user_profile)
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map { |unlock| unlock.kanji.kanji }.reverse
  end

  def index
  end

  private

  def last_five_kanji(user_profile)
    Unlock.where(user: current_user).includes(:kanji).order(created_at: :desc).limit(5).map { |unlock| unlock.kanji }
  end

  def ease_out(x, k = 0.1)
    100 * (1 - Math.exp(-k * x))
  end

  def calculate_kanji_percentage(level)
    total_kanji = Kanji.where(jlptLevel: level).count
    return 0 if total_kanji == 0

    completed_kanji = current_user.unlocked_kanji.where(jlptLevel: level).count
    percentage = (completed_kanji.to_f / total_kanji.to_i) * 100
    [ percentage, ease_out(percentage)]
  end

  def calculate_next_level_xp
    # Implement your logic to calculate the XP needed for the next level
    # For example:
    next_level_xp = (50 + (@user_profile.level * 50)) # Replace with actual calculation
    next_level_xp
  end
end
