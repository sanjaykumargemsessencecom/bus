class Admins::ReservationsController < ApplicationController
  def index
      @buses=[]
      @customer=User.find_by(id: current_user.id)
      @reservation=Reservation.where("user_id=?",@customer)
      @reservation.each do |r|
      bus_id=r.bus_id
      @buses<<Bus.where("id=?",bus_id)
    end
  end

  def check_reservations
    @bus=Bus.find_by_id(params[:id])
    @user=[]
    @reservation_value=Reservation.where("bus_id=?",params[:id])
    @reservation_value.each do |r|
      @user<<User.where("id=?",r.user_id)
    end
  end

  def destroy
    @reservation_value=Reservation.where("id=?",params[:id])
    @reservation_id=@reservation_value
    @reservation=Reservation.find_by(id: @reservation_id)
    @reservation.destroy
    redirect_to admins_reservations_path
  end
  def bus_params
    cookies[:booked_seats]=params.require(:reservation).permit(:booked_seats).values.first.to_i
    params.require(:reservation).permit(:booked_seats,:date).merge(bus_id: cookies[:bus_id],user_id: current_user.id)
  end
end