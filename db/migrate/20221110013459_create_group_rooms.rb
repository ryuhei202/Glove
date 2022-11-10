class CreateGrourooms < ActiveRecord::Migration[7.0]
  def change
    create_table :group_rooms do |t|
      t.string :groupname, null: false

      t.timestamps
    end
  end
end
