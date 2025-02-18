class ConflictPolicy <ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      Conflict.where(status: "searching")
    end
  end

  def show?
    true
  end

  def index?
    true
  end
end
