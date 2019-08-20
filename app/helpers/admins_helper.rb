module AdminsHelper
	def available(data)
  		@booked_seats=0
      @bus =Bus.find_by_id(data)
      @total_seats=@bus.total_seats
       if !cookies[:date]
        @date=Time.now.to_date
       else
        @date=cookies[:date]
       end
      @reservation=Reservation.where("bus_id=? and date=?",data,@date)
      @reservation.each do |b_seat|
          @booked_seats=@booked_seats+b_seat.booked_seats
      end
      @available_seats=@total_seats-@booked_seats
      @available_seats
	end
end
