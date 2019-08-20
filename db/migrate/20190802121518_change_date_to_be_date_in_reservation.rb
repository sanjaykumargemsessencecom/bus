class ChangeDateToBeDateInReservation < ActiveRecord::Migration[5.2]
  def change
  	  	  change_column :reservations, :date, :date
  end
end
