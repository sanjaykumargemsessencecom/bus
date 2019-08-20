class AdminsController < ApplicationController
  before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
  before_action :current_user_admin? 

  def index
    @admin=User.find_by_id(current_user.id)
    @owners=User.where(:role => 'owner')
  end
 
  private 
  def current_user_admin?
    if current_user
      if current_user.role!="admin"
        flash[:notice] = "You are not admin"
        user_session=nil
        redirect_to admins_path
      end 
    end
  end
end
