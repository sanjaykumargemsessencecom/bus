class CustomersController < ApplicationController
  before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :current_user
  before_action :right_user
  before_action :current_user_customer?
  def account

      @reservation= current_user.reservations
      
  end

  def right_user
      u=User.find_by_id(params[:customer_id])
     if u.id != current_user.id
      	flash[:alert]="You are not autherize user"
        redirect_to root_path
     end
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
