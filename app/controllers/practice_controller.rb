class PracticeController < ApplicationController

  def index
    @user_profile = policy_scope(UserProfile)

  end
end
