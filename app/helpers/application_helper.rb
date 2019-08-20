module ApplicationHelper
	def current_user_owners?(data) 
		if current_user
			if current_user.role=="owner"
			   true
			else
			   false
			end	
	    end
    end

   def booked?(data)
		@user=User.find_by_id(current_user.id)
	    @reservation_value=Reservation.where("bus_id=? and user_id=?",data,@user)
	    if @reservation_value.empty?
	    	true
	    else
	    	false
	    end

	end
 
end
