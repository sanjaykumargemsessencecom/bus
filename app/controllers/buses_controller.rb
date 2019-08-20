class BusesController < ApplicationController

  def index
      @owner=User.find(params[:owner_id])
      @buses=Bus.where(:user_id=>@owner.id)
  end
  def new
  	  @owner=User.find(params[:owner_id])
      @bus=@owner.buses.new
  end
	def create  
      @owner=User.find(params[:owner_id])    
      bus= params.require(:bus).permit(:bus_name,:bus_no,:source,:destination,:rent,:total_seats,:status)
      @owner.buses.create(bus)
      if !@owner.save
      	flash[:errors]="Something went wrong"

      else
      	redirect_to owner_path(@owner)
      end
  end 
  def edit
      @bus= Bus.find(params[:id])
      @owner=User.find(params[:owner_id])
  end

  def update
      @bus= Bus.find(params[:id])
      bus_params= params.require(:bus).permit(:bus_name,:bus_no,:source,:destination,:rent,:total_seats,:status)
      if @bus.update(bus_params)
         redirect_to owner_buses_path(current_user.id), notice: "Bus successfully updated!"
      end
  end

  def destroy
      @bus=Bus.find_by_id(params[:id])
      @bus.destroy
      redirect_to owner_buses_path(current_user.id), notice: "Bus deleted!"
  end
end
