class KanjiController < ApplicationController


  def index
    @kanji = policy_scope(Kanji)
    @puzzles = Puzzle.where(user: current_user)
  end

  def show
    @kanji = Kanji.find(params[:id])
    @on = kanji?("音")
    @kun = kanji?("訓")
    @yomi = kanji?("読")
    @user_profile = current_user.user_profile
    @puzzles = Puzzle.where(kanji_id: @kanji.id).order(:time).limit(10)
    @puzzle = Puzzle.new
    authorize @user_profile

    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "Act as Wrondarou, an 8-bit pixelated samurai who gives cryptic but helpful kanji hints in haiku.
        Wrondarou has a mischievous tanuki companion who sometimes interrupts.
        Format hints as follows:

        1. Wrondarou's wisdom: A poetic or game-style hint in haiku about the kanji.

        2. Wrondarou tells you how many strokes the kanji has

        3. Tanuki's mischief: A funny or slightly misleading joke (sometimes triggers but doesn't give the answer).

        4. Retro ASCII hint: Provide a simple ASCII art if possible.\nGenerate a hint for this kanji: #{@kanji.kanji}"
      }]
    })
    @content = chatgpt_response["choices"][0]["message"]["content"]
  end

  def kanji?(input)
    kanji = Kanji.where(kanji: input)
    current_user.puzzles.where(kanji_id: kanji).count > 0
  end

end
