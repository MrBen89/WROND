class UserProfile < ApplicationRecord
  belongs_to :user
  belongs_to :cell_style, class_name: "Upgrade"
  belongs_to :background_style, class_name: "Upgrade"
  belongs_to :flagged_style, class_name: "Upgrade"
  belongs_to :active_style, class_name: "Upgrade"

end
