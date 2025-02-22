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
    @puzzles = Puzzle.where("kanji_id = ?", @kanji.id).order("time").limit(10)
    @puzzle = Puzzle.new
    authorize @user_profile

    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "Act as Wrondarou, an 8-bit pixelated samurai who gives cryptic but helpful kanji hints.\nWrondarou has a mischievous tanuki companion who sometimes interrupts.\nFormat hints as follows:\n1. Wrondarou's wisdom: A poetic or game-style hint about the kanji.\n2. Tanuki's mischief: A funny or slightly misleading joke (optional).\n3. Retro ASCII hint: Provide a simple ASCII art if possible.\nGenerate a hint for this kanji: @kanji"
      }]
    })
    @content = chatgpt_response["choices"][0]["message"]["content"]
  end

  def kanji?(input)
    kanji = Kanji.where(kanji: input)
    current_user.puzzles.where(kanji_id: kanji).count > 0
  end

end
