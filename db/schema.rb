# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_23_081102) do

  create_table "buses", force: :cascade do |t|
    t.string "bus_name"
    t.integer "bus_no"
    t.string "source"
    t.string "destination"
    t.integer "rent", default: 0
    t.integer "status"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_seats", default: 0
    t.index ["user_id"], name: "index_buses_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "bus_id"
    t.integer "user_id"
    t.date "date"
    t.time "time"
    t.integer "booked_seats", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "confirmed"
    t.index ["bus_id"], name: "index_reservations_on_bus_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "seats", force: :cascade do |t|
    t.integer "reservation_id"
    t.integer "seat_nos", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_id"], name: "index_seats_on_reservation_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "role", default: 0
    t.integer "status", default: 1
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

end
