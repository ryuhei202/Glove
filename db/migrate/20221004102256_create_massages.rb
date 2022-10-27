class CreateMassages < ActiveRecord::Migration[7.0]
  def change
    create_table :massages do |t|
      t.references :room, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :massage, null:false

      t.timestamps
    end
    add_index :messages, [:user_id, :created_at]
  end
end
