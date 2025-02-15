module ApplicationHelper
  def level_color(level)
    case level
    when 1
      "red"
    when 2
      "orange"
    when 3
      "yellow"
    when 4
      "green"
    when 5
      "blue"
    else
      "gray"
    end
  end
end
