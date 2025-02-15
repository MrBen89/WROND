module UserProfilesHelper
  def outline_color_for_level(level)
    case level
    when 1
      'purple'
    when 2
      'blue'
    when 3
      'green'
    when 4
      'yellow'
    when 5
      'orange'
    when 6
      'red'
    else
      'none'
    end
  end

  def upgrade_unlocked?(level, upgrade_level)
    level >= upgrade_level
  end

  def user_profile_color_options
    {
      purple: 1,
      blue: 2,
      green: 3,
      yellow: 4,
      orange: 5,
      red: 6
    }
  end
end
