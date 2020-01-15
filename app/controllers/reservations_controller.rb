class ReservationsController < ApplicationController
	before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :bus_params, only:[:create]
	def index
      @reservation= current_user.reservations    
  end

  def new
    @bus=Bus.find_by_id(params[:bus_id])
    cookies[:bus_id]=@bus.id
    @reservation=Reservation.new
    @date = params[:date].to_date if params[:date]
    @reservation_value=Reservation.where("bus_id=? and date=?",cookies[:bus_id],@date)
    @seat_no=[]
    if @reservation_value
      @reservation_value.each do |r|
        @seat_no<< r.seats.map(&:seat_nos)
      end
    end
    @seats=Array(1..@bus.total_seats)
    respond_to do |format|
     format.js
     format.html
    end
  end

	def create
    seat_params=params.require(:reservation).permit(:seat_nos=>[])
    if cookies[:booked_seats]!=seat_params.values.first.length.to_i
      flash[:flash]="Wrong number of seats"
      redirect_to customers_path and return
    end
    @user=current_user
    @user.reservations.new(bus_params )
    @user.save
    @reservation_value=Reservation.where("bus_id=? and user_id=?",cookies[:bus_id],current_user.id).order(id: :desc).limit(1)
    @reservation_value.each do |id |
      @reservation=Reservation.find_by_id(id)
    end
    seat_params.values.first.each  do |value|
       @reservation.seats.create(seat_nos: value)
    end
    flash[:notice]="Booked Succeccfully"
    redirect_to root_path
  end

  def check_reservations
    @bus=Bus.find_by_id(params[:id])
    @user=[]
    @search = if params[:date]
    cookies[:date]=params[:date]
    @reservation_value=Reservation.where("bus_id=? and date=?",params[:id],params[:date])
         else
          @reservation_value=Reservation.where("bus_id=?",params[:id])
         end
    @reservation_value.each do |r|
      @user<<User.where("id=?",r.user_id)
    end
  end
  def cancelled
    @reservation=Reservation.find_by(id: params[:reservation_id])
    @reservation.status="cancelled"
    @reservation.update
    redirect_to reservations_path
  end
  
  def destroy
    @reservation=Reservation.find_by(id: params[:id])
    @reservation.destroy
    redirect_to reservations_path
  end
  def bus_params
    cookies[:booked_seats]=params.require(:reservation).permit(:booked_seats).values.first.to_i
    params.require(:reservation).permit(:booked_seats,:date).merge(bus_id: cookies[:bus_id],user_id: current_user.id)
  end
end
