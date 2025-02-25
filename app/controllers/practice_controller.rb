# class PracticeController < ApplicationController

#   def index
#     @user_profile = UserProfile.find(current_user.user_profile.id)
#     @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map(&:kanji)

#     all_sentence = [
#       "私は二級を合格して、一級を受けたいと思います。",
#       "十個の単語を覚えなければならない",
#       "鉛筆が折れた"
#     ]

#     selected_sentence = all_sentence.sample(5)

#     @processed_sentences = selected_sentence.map { |sentence| generate_sentence_with_missing_kanji(sentence) }

#     private

#     def generate_sentence_with_missing_kanji(sentence)
#     kanji_in_sentence = sentence.chars.select { |char| @unlocked_kanji.include?(char) }

#     return sentence if kanji_in_sentence.empty?

#     kanji_to_replace = kanji_in_sentence.sample([1, 2].sample)

#     modified_sentence = sentence.chars.map do |char|
#       if kanji_to_replace.include?(char)
#         '<span class="drop-zone" data-kanji-target="dropZone"></span>'
#       else
#         char
#       end
#     end.join

#     { original: sentence, modified: modified_sentence, missing_kanji: kanji_to_replace }
#   end
# end


class PracticeController < ApplicationController

  def index
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @unlocked_kanji = policy_scope(Unlock).where(user: current_user).map { |unlock| unlock.kanji.kanji }

    all_sentences = [
      "私は二級を合格して、一級を受けたいと思います。",
      "十個の単語を覚えなければならない",
      "鉛筆が折れた",
      "私の誕生日は二十一日",
      "私は日本語を勉強しています",
      "一個のりんご"
    ]

    selected_sentences = all_sentences.sample(5)

    @processed_sentences = selected_sentences.map { |sentence| generate_sentence_with_missing_kanji(sentence) }
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
