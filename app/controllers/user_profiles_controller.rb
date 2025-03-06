class UserProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_profile, only: [:show, :edit, :update]
  before_action :authorize_user_profile, only: [:edit, :update]


  def show
    @user_profile = UserProfile.find_by(user_id: current_user.id)
    @upgrades = Upgrade.all
    authorize @user_profile
  end

  def edit
  end

  def update
    # if !user_profile_params[:total_xp].nil?
    #   @user_profile.total_xp = user_profile_params[:total_xp]
    #   @user_profile.level = user_profile_params[:level]
    #   @user_profile.save
    #   redirect_to "/"
    if  params.has_key?(:upgrade)
      if Upgrade.find(params[:upgrade]).upgrade_type == "cell"
        @user_profile.update(cell_style: Upgrade.find(params[:upgrade].to_i))
        redirect_to @user_profile, notice: "Style changed."
      elsif Upgrade.find(params[:upgrade]).upgrade_type =="active"
        @user_profile.update(active_style: Upgrade.find(params[:upgrade].to_i))
        redirect_to @user_profile, notice: "Style changed."
      elsif Upgrade.find(params[:upgrade]).upgrade_type == "flagged"
        @user_profile.update(flagged_style: Upgrade.find(params[:upgrade].to_i))
        redirect_to @user_profile, notice: "Style changed."
      elsif Upgrade.find(params[:upgrade]).upgrade_type == "background"
        @user_profile.update(background_style: Upgrade.find(params[:upgrade].to_i))
        redirect_to @user_profile, notice: "Style changed."
      elsif @user_profile.update(user_profile_params)
        redirect_to @user_profile, notice: "User profile was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
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
    params.require(:user_profile).permit(:username, :tagline, :bio, :profile_pic, :level, :total_xp, :upgrade, :type)
  end
end
