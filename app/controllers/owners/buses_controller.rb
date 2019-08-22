class Owners::BusesController < ApplicationController
  def index
      @buses=Bus.where(:user_id=>current_user.id)
  end
  def new
  	  @owner=User.find(current_user.id)
      @bus=@owner.buses.new
  end
	def create  
      @owner=User.find(current_user.id)    
      bus= params.require(:bus).permit(:bus_name,:bus_no,:source,:destination,:rent,:total_seats,:status)
      @owner.buses.create(bus)
      if !@owner.save
      	flash[:errors]="Something went wrong"

      else
      	redirect_to owners_buses_path
      end
  end 
  def edit
      @bus= Bus.find(params[:id])
      @owner=User.find(current_user.id)
  end

  def update
      @bus= Bus.find(params[:id])
      bus_params= params.require(:bus).permit(:bus_name,:bus_no,:source,:destination,:rent,:total_seats,:status)
      if @bus.update(bus_params)
         redirect_to owners_buses_path, notice: "Bus successfully updated!"
      end
  end

  def destroy
      @bus=Bus.find_by_id(params[:id])
      @bus.destroy
      redirect_to owners_buses_path, notice: "Bus deleted!"
  end

end
