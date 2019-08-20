class AddMoreFiledToBus < ActiveRecord::Migration[5.2]
  def change
    add_column :buses, :total_seats, :integer, default: 0
  end
end
