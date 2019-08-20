class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.references :bus, foreign_key: true
      t.references :user, foreign_key: true
      t.datetime :date
      t.time :time
      t.integer :booked_seats, default: 0

      t.timestamps
    end
  end
end
