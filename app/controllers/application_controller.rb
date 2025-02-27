class ApplicationController < ActionController::Base
  helper UserProfilesHelper
  before_action :authenticate_user!, :set_default_meta_tags
  before_action :set_user_profile, if: :user_signed_in?
  include Pundit::Authorization

  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?


  def index

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
