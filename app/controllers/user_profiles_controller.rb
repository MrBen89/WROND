class UserProfilesController < ApplicationController
  def show
    @user = UserProfile.find(current_user.id)
    authorize @user
  end
end
