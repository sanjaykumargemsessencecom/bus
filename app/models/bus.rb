class Bus < ApplicationRecord
  belongs_to :user
  has_many :reservations, dependent: :delete_all
  enum  status:[:incomplete,:completed]
end
