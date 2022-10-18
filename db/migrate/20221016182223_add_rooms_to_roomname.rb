class AddRoomsToRoomname < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :room_name, :string
  end
end
