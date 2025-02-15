module UserProfilesHelper
  def outline_color_for_level(level)
    case level
    when 1..10
      'green'
    when 11..20
      'blue'
    when 21..30
      'purple'
    else
      'red'
    end
  end
end
