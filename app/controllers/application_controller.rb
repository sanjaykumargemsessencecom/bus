class ApplicationController < ActionController::Base
	before_action :authenticate_user!, only:[:new,:destroy,:update]
	before_action :current_user
	before_action :configure_permitted_parameters, if: :devise_controller?

	def user_admin?
		if current_user
			if current_user.role=="admin"
				true
			else
				false
	 		end	
	   end
	end

	def user_owner? 
		if current_user
			if current_user.role=="owner"
			  true
			else
				false
			end	
		end
	end

	def user_customer?
		if current_user
			if current_user.role=="customer"
				  true
			else
					false
			end	
		end
	end

	helper_method :user_admin?
	helper_method :user_owner?
	helper_method :user_customer?



	protected

	  def configure_permitted_parameters
	    devise_parameter_sanitizer.permit(:sign_up, keys: [:name,:role])
	    devise_parameter_sanitizer.permit(:account_update, keys: [:name]) 
	  end


end
