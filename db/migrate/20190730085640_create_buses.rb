class CreateBuses < ActiveRecord::Migration[5.2]
  def change
    create_table :buses do |t|
      t.string :bus_name
      t.integer :bus_no
      t.string :source
      t.string :destination
      t.integer :rent, default: 0
      t.integer :status
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
