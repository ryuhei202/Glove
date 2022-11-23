class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null:false
      t.string :password_digest, null:false
      t.integer :gender, null:false
      t.text :self_introduction 
      t.string :profile_image

      t.timestamps

    end
  end
end
