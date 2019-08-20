class Reservation < ApplicationRecord
  belongs_to :bus
  belongs_to :user
  has_many :seats, dependent: :delete_all
end
