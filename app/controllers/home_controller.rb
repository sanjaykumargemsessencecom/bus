class HomeController < ApplicationController
	before_action :authenticate_user!, only:[:new,:destroy,:update]
	before_action :current_user
	before_action :current_user_owners 
	before_action :current_user_customer

	def index
		@owner=User.where("role=? and status=?",1,2)
		@owner_id=[]
		@owner.each do |owner|
			@owner_id<<owner.id
			@search = if params[:source]
			@buses=Bus.where('source LIKE ? and destination LIKE ? and status=? and user_id IN (?) ', "%#{params[:source]}%", "%#{params[:destination]}%",1,@owner_id)
		else
			@buses=Bus.where("status=? and user_id IN (?)",1,@owner_id)
		end
			cookies[:source]=params[:source]
			cookies[:destination]=params[:destination] 
			cookies[:date]=params[:date]
	  end  
	end
	def search
     params.require(:home).permit(:source,:destination)
	end
	private 

	def current_user_owners 
		if current_user
			if current_user.role=="owner"
			  if current_user.status==2
	        @name="True"			      
		    else
		      @name="False"
		      flash[:alert]="Account not Verified"
		    end
			end	
		end
	end
	def current_user_customer
		if current_user
		  if current_user.role=="customer"
		    params[:id]=current_user.id
	    end
		end
	end
end
