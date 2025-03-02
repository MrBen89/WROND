class ApplicationController < ActionController::Base
  helper UserProfilesHelper
  before_action :authenticate_user!, :set_default_meta_tags
  before_action :set_user_profile, if: :user_signed_in?
  before_action :calc_xp, if: :user_signed_in?
  include Pundit::Authorization

  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  def index

  end

  def calc_base_xp(level)
    total = 0
    for l in 1..level do
      total += (50 + (50* l))
    end
    total
  end

  def calc_xp
    @next_level = 50 + (current_user.user_profile.level.to_i * 50)
    @current_xp = current_user.user_profile.total_xp - calc_base_xp(current_user.user_profile.level.to_i - 1)
    @ratio = (100 - ((@current_xp.to_f / @next_level.to_f) * 100)).to_i
  end

  def set_default_meta_tags
    set_meta_tags default_meta_tags
  end

  def default_meta_tags
    {
      meta_product_name: "WROND!",
      meta_title: "WROND! - Learn Kanji - The Fun Way!",
      meta_description: "Learn to read kannji via fun and engaging number puzzles!",
      meta_image: "WROND.png" # should exist in `app/assets/images/`,
  }
  end

  private

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end

  def set_user_profile
    @user_profile = current_user.user_profile
  end


end
