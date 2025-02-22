class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:intro, :index]

  def home
  end

  def intro
    redirect_to home_path if user_signed_in?
  end

  def index
  end
end
