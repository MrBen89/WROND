class PracticePolicy <ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      UserProfile.find(current_user.user_profile.id)
    end
  end

  def index?
    true
  end
end
