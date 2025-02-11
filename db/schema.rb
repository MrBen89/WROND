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

ActiveRecord::Schema[7.1].define(version: 2025_02_11_041259) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "kanjis", force: :cascade do |t|
    t.string "kanji"
    t.text "puzzleInfo", default: [], array: true
    t.string "jlptLevel"
    t.string "grade"
    t.integer "strokeCount"
    t.text "meaning", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "unlocks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "upgrade_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["upgrade_id"], name: "index_unlocks_on_upgrade_id"
    t.index ["user_id"], name: "index_unlocks_on_user_id"
  end

  create_table "upgrades", force: :cascade do |t|
    t.string "name"
    t.string "level"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  add_foreign_key "puzzles", "kanjis"
  add_foreign_key "puzzles", "users"
  add_foreign_key "unlocks", "upgrades"
  add_foreign_key "unlocks", "users"
  add_foreign_key "user_profiles", "users"
end
