module UsersHelper
	 def verfy_owner?(id)
        @user=User.find_by_id(id)
 
	     if @user.status==2
	      	true
	     else
	      	false
	     end     
    end
end
