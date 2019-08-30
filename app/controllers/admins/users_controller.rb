class Admins::UsersController < ApplicationController
    before_action :authenticate_user!, only:[:index,:show,:new,:destroy,:update]
    def index
      @admin=User.find_by_id(current_user.id)
      @owners=User.where(:role => 'owner')
    end

    def update
      @user=User.find_by_id(params[:id])
      if @user.status==1
         @user.status=2
         if @user.save
            flash[:notice]="Changes Saved"
            redirect_to admins_users_path
         else
            flash[:notice]="Something went wrong"
         end
      else
        @user.status=1
        if @user.save
        flash[:notice]="Changes Saved"
          redirect_to admins_users_path
        else
          flash[:notice]="Something went wrong"
        end
      end
    end
end
