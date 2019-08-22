class UsersController < ApplicationController
  before_action :authenticate_user!, only:[:new,:destroy,:update]
  before_action :current_user
  def update
    @user=User.find_by_id(params[:id])
    if @user.status==1
	     @user.status=2
	     if @user.save
		     	flash[:notice]="Changes Saved"
		     	redirect_to admins_path
	     else
	        flash[:notice]="Something went wrong"
	     end
    else
			@user.status=1
			if @user.save
			flash[:notice]="Changes Saved"
				redirect_to admins_path
			else
			  flash[:notice]="Something went wrong"
			end
    end
  end
end
