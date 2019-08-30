class Admins::BusesController < ApplicationController
  def index
      @owner=User.find(params[:user_id])
      @buses=Bus.where(:user_id=>@owner.id)
  end

  def destroy
      @bus=Bus.find_by_id(params[:id])
      @bus.destroy
      redirect_to admins_user_buses_path, notice: "Bus deleted!"
  end
end
