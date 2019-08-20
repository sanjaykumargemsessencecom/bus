class User < ApplicationRecord
		enum role: [:customer, :owner ,:admin]
		has_many :buses, dependent: :delete_all
		has_many :reservations, dependent: :delete_all


	  # Include default devise modules. Others available are:
	  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
	  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
