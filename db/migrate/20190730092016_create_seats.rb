class CreateSeats < ActiveRecord::Migration[5.2]
  def change
    create_table :seats do |t|
      t.references :reservation, foreign_key: true
      t.integer :seat_no

      t.timestamps
    end
  end
end
