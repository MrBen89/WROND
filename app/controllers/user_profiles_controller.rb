class UserProfilesController < ApplicationController
  def show
    @user = UserProfile.find(current_user.id)
    authorize @user
  end

  def update
    @user_profile = UserProfile.find(current_user.user_profile.id)
    authorize @user_profile
    @user_profile.update(user_profile_params)

  end

  private

  def user_profile_params
    params.require(:user_profile).permit(:level, :total_xp)
  end
end
