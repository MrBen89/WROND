class Unlock < ApplicationRecord
  belongs_to :user
  belongs_to :upgrade
end
