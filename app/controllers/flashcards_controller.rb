class FlashcardsController < ApplicationController
  def index
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map(&:kanji)

    @n5_done = @unlocked_kanji.select { |kanji| kanji.jlptLevel == "5" }
    @n5_total = Kanji.where(jlptLevel: "5").count

    @n4_done = @unlocked_kanji.select { |kanji| kanji.jlptLevel == "4" }
    @n4_total = Kanji.where(jlptLevel: "4").count

    @n3_done = @unlocked_kanji.select { |kanji| kanji.jlptLevel == "3" }
    @n3_total = Kanji.where(jlptLevel: "3").count

    @n2_done = @unlocked_kanji.select { |kanji| kanji.jlptLevel == "2" }
    @n2_total = Kanji.where(jlptLevel: "2").count

    @n1_done = @unlocked_kanji.select { |kanji| kanji.jlptLevel == "1" }
    @n1_total = Kanji.where(jlptLevel: "1").count
  end
end
