class OwnersController < ApplicationController
	before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
	before_action :current_user_owner?
	before_action :current_user
	before_action :right_user
	def show
		@owner=current_user.name	
	end
    def account
  	  @buses=[]
      @customer=User.find_by(id: current_user.id)
      @reservation=Reservation.where("user_id=?",@customer)
      @reservation.each do |r|
      bus_id=r.bus_id
      @buses<<Bus.where("id=?",bus_id)
      end
  end

  def right_user
     if params[:id] 
        @id=params[:id]
     else
        @id=params[:owner_id]
     end
		 u=User.find_by_id(@id)
		 if u.id != current_user.id 
		   flash[:alert]="You are not autherize user"
		  
		 end
  end
	private 
	def current_user_owner?
		if current_user
			if current_user.role!="owner"
				flash[:notice] = "You are not Bus Owner"
				user_session=nil
				
			end	
	  end
  end
end
