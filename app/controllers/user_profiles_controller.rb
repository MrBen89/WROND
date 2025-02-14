class UserProfilesController < ApplicationController
  before_action :set_user_profile, only: [:show, :edit, :update]
  before_action :authenticate_user!
  before_action :authorize_user_profile, only: [:edit, :update]
  def show
    @user = UserProfile.find_by(user_id: current_user.id)
    authorize @user_profile
  end

  def edit
  end

  def update
    if @user_profile.update(user_profile_params)
      redirect_to @user_profile, notice: "User profile was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user_profile
    @user_profile = UserProfile.find_by(user_id: current_user.id)
  end

  def authorize_user_profile
    authorize @user_profile
  end

  def user_profile_params
    params.require(:user_profile).permit(:username, :bio, :profile_pic)
  end
end
