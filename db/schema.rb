# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_02_22_012501) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conflicts", force: :cascade do |t|
    t.bigint "kanji_id", null: false
    t.bigint "user1_id", null: false
    t.bigint "user2_id"
    t.string "status"
    t.integer "winner"
    t.integer "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "u1_state"
    t.json "u2_state"
    t.index ["kanji_id"], name: "index_conflicts_on_kanji_id"
    t.index ["user1_id"], name: "index_conflicts_on_user1_id"
    t.index ["user2_id"], name: "index_conflicts_on_user2_id"
  end

  create_table "kanjis", force: :cascade do |t|
    t.string "kanji"
    t.text "puzzleInfo", default: [], array: true
    t.string "jlptLevel"
    t.string "grade"
    t.text "meaning", default: [], array: true
    t.string "kunyomi"
    t.string "onyomi"
    t.integer "stroke_count"
  end

  create_table "puzzles", force: :cascade do |t|
    t.integer "time"
    t.integer "userDifficulty"
    t.bigint "user_id", null: false
    t.bigint "kanji_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["kanji_id"], name: "index_puzzles_on_kanji_id"
    t.index ["user_id"], name: "index_puzzles_on_user_id"
  end

  create_table "solid_cable_messages", force: :cascade do |t|
    t.text "channel"
    t.text "payload"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel"], name: "index_solid_cable_messages_on_channel"
    t.index ["created_at"], name: "index_solid_cable_messages_on_created_at"
  end

  create_table "unlocks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "kanji_id"
    t.index ["user_id"], name: "index_unlocks_on_user_id"
  end

  create_table "upgrades", force: :cascade do |t|
    t.string "name"
    t.string "level"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "upgrade_type"
  end

  create_table "user_profiles", force: :cascade do |t|
    t.string "username"
    t.text "bio"
    t.string "tagline"
    t.integer "level"
    t.integer "total_xp"
    t.string "profile_pic"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "cell_style_id"
    t.bigint "background_style_id"
    t.bigint "flagged_style_id"
    t.bigint "active_style_id"
    t.index ["active_style_id"], name: "index_user_profiles_on_active_style_id"
    t.index ["background_style_id"], name: "index_user_profiles_on_background_style_id"
    t.index ["cell_style_id"], name: "index_user_profiles_on_cell_style_id"
    t.index ["flagged_style_id"], name: "index_user_profiles_on_flagged_style_id"
    t.index ["user_id"], name: "index_user_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "conflicts", "kanjis"
  add_foreign_key "conflicts", "users", column: "user1_id"
  add_foreign_key "conflicts", "users", column: "user2_id"
  add_foreign_key "puzzles", "kanjis"
  add_foreign_key "puzzles", "users"
  add_foreign_key "unlocks", "users"
  add_foreign_key "user_profiles", "upgrades", column: "active_style_id"
  add_foreign_key "user_profiles", "upgrades", column: "background_style_id"
  add_foreign_key "user_profiles", "upgrades", column: "cell_style_id"
  add_foreign_key "user_profiles", "upgrades", column: "flagged_style_id"
  add_foreign_key "user_profiles", "users"
end
