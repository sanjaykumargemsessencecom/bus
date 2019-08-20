class ChangeRoleToBeStringInUsers < ActiveRecord::Migration[5.2]
  def change
  	  change_column :users, :role, :string
  end
end
