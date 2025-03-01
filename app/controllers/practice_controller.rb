class PracticeController < ApplicationController

  def index
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map { |unlock| unlock.kanji.kanji }

    # all_sentences = [
    #   "私は二級を合格して、一級を受けたいと思います。",
    #   "十個の単語を覚えなければならない",
    #   "鉛筆が折れた",
    #   "私の誕生日は二十一日",
    #   "私は日本語を勉強しています",
    #   "一個のりんご"
    # ]

    # selected_sentences = all_sentences.sample(5)

    # @processed_sentences = selected_sentences.map { |sentence| generate_sentence_with_missing_kanji(sentence) }

    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "Make an example sentence using #{@unlocked_kanji} in Japanese.\nOnly give the example sentence and give one for each kanji."
      }]
    })
    @content = chatgpt_response["choices"][0]["message"]["content"]

    # Split the @content into individual sentences
    generated_sentences = @content.split("\n").map(&:strip).reject(&:empty?)

    # Process the generated sentences
    @processed_sentences = generated_sentences.map { |sentence| generate_sentence_with_missing_kanji(sentence) }
  end


  private

  def generate_sentence_with_missing_kanji(sentence)
    kanji_in_sentence = sentence.chars.select { |char| @unlocked_kanji.include?(char) }
    return { original: sentence, modified: sentence, missing_kanji: [] } if kanji_in_sentence.empty?

    modified_sentence = sentence.chars.map do |char|
      if kanji_in_sentence.include?(char)
        # Add `data-expected-kanji` to store the correct kanji
        "<span class='drop-zone' data-kanji-target='dropZone' data-expected-kanji='#{char}'></span>"
      else
        char
      end
    end.join

    { original: sentence, modified: modified_sentence, missing_kanji: kanji_in_sentence }
  end

end
