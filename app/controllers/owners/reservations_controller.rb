class Owners::ReservationsController < ApplicationController
	before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :bus_params, only:[:create]
	def index
    @reservation= current_user.reservations
  end

  def check_reservations
    @bus=Bus.find_by_id(params[:bus_id])
    @user=[]
    @search = if params[:date]
    cookies[:date]=params[:date]
    @reservation_value=Reservation.where("bus_id=? and date=?",params[:bus_id],params[:date])
         else
          @reservation_value=Reservation.where("bus_id=?",params[:bus_id])
         end
    @reservation_value.each do |r|
      @user<<User.where("id=?",r.user_id)
    end
  end
  def destroy
    @reservation=Reservation.find_by(id: params[:id])
    @reservation.destroy
    redirect_to owners_reservations_path
  end
  def bus_params
    cookies[:booked_seats]=params.require(:reservation).permit(:booked_seats).values.first.to_i
    params.require(:reservation).permit(:booked_seats,:date).merge(bus_id: cookies[:bus_id],user_id: current_user.id)
  end

end
