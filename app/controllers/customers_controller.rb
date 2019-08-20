class CustomersController < ApplicationController
  before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :current_user
  before_action :right_user
  before_action :current_user_customer?
  def index
    @buses=[]
    @owner_id=[]
    @customer=User.find_by_id(current_user.id)
    @owner=User.where("role=? and status=?",1,2)
    @owner.each do |owner|
    @owner_id<<owner.id
    end  
    @search = if params[:source]
    cookies[:source]=params[:source]
    cookies[:destination]=params[:destination] 
    cookies[:date]=params[:date]
    @buses=Bus.where('source LIKE ? and destination LIKE ? and status=? and user_id IN (?) ', "%#{params[:source]}%", "%#{params[:destination]}%",1,@owner_id)
         else
       @buses=Bus.where("status=? and user_id IN (?)",1,@owner_id)
         end
  end

  def search
   params.require(:home).permit(:source,:destination)        
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
      u=User.find_by_id(current_user.id)
     if u.id != current_user.id
      	flash[:alert]="You are not autherize user"
        redirect_to customers_path
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
