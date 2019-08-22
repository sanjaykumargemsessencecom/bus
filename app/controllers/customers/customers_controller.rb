class Customers::CustomersController < ApplicationController
  before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :current_user
  before_action :current_user_customer?
  def account
      @reservation= current_user.reservations    
  end
 	def current_user_customer?
	  if current_user
		  if current_user.role!="customer"
  			 flash[:notice] = "You are not Customer"
  			 user_session=nil
  			 redirect_to root_path
		  end	
    end
  end

end
