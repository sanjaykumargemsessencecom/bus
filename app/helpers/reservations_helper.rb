module ReservationsHelper

  def seat_booked?(seat_ids)
		   @b_seat=[]
		   @seat_no.each do |seat|
  		   @b_seat<<seat
       end
		   seat_temp_array=[]
		   seat_temp_array<<seat_ids
       @b_seat=@b_seat.flatten
       params[:b_seat]=@b_seat.length
       if seat_temp_array.all?{|z| @b_seat.include?(z)}
     	    true
     	 else
     	   false
     	 end
  end
  def seat_no(r_id)
    seats=[]
    seat=Seat.where(reservation_id: r_id)
        seat.each do |seat|
          seats<<seat.seat_nos
        end
        seats=seats.join(",")
  end
end
