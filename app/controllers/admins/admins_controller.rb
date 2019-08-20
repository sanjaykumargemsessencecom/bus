class Admins::AdminsController < ApplicationController
    before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
    before_action :current_user_admin? 

    def bus
        @admin=User.find_by(id: params[:id])
        @buses=Bus.all
    end
    def check_bus
        @owner=User.find(params[:id])
        @buses=Bus.where(:user_id=>@owner.id)
    end

    def destroy
      	@owner=User.find(params[:owner_id])
        @bus=Bus.find_by_id(params[:id])
        @bus.destroy
        redirect_to admins_check_bus_path(@owner.id), notice: "Bus deleted!"
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
    private 
    def current_user_admin?
    	if current_user
    		if current_user.role!="admin"
    			flash[:notice] = "You are not admin"
    			user_session=nil
    			redirect_to root_path
    		end	
      end
    end
end
