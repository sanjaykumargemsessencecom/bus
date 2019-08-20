class ChangeRoleToBeIntegerInUsers < ActiveRecord::Migration[5.2]
  def change
  	change_column :users, :role, :integer
  end
end
