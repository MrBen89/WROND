class KanjiController < ApplicationController


  def index
    @kanji = policy_scope(Kanji)
    @puzzles = Puzzle.where(user: current_user)

    @n5_done = Unlock.select { |kanji| kanji.jlptLevel == "5" }
    @n5_total = Kanji.where(jlptLevel: "5")

    @n4_done = Kanji.joins(:puzzles).distinct.where(jlptLevel: "4")
    @n4_total = Kanji.where(jlptLevel: "4")

    @n3_done = Kanji.joins(:puzzles).distinct.where(jlptLevel: "3")
    @n3_total = Kanji.where(jlptLevel: "3")

    @n2_done = Kanji.joins(:puzzles).distinct.where(jlptLevel: "2")
    @n2_total = Kanji.where(jlptLevel: "2")

    @n1_done = Kanji.joins(:puzzles).distinct.where(jlptLevel: "1")
    @n1_total = Kanji.where(jlptLevel: "1")

    @all_done = Kanji.joins(:puzzles).distinct
    @all_total = Kanji.count
  end

  def show
    @next_kanji = Kanji.find(params[:id].to_i + 1)
    @kanji = Kanji.find(params[:id])
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @puzzles = Puzzle.where("kanji_id = ?", @kanji.id).order("time").limit(10)
    @puzzle = Puzzle.new
    authorize @user_profile

    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "Act as Wrondarou, an 8-bit pixelated samurai who gives cryptic but short helpful kanji hints.\nFormat hints as follows:\n1. Wrondarou's wisdom: A poetic, but accurate haiku-esque reference to the meaning about the kanji.\nGenerate a hint for this kanji: #{@kanji.kanji}\nMake it accurate and less cryptic"
      }]
    })
    @content = chatgpt_response["choices"][0]["message"]["content"]
  end

  def kanji?(input)
    kanji = Kanji.where(kanji: input)
    current_user.puzzles.where(kanji_id: kanji).count > 0
  end

end
