class AddLanguageToRooms < ActiveRecord::Migration[7.0]
  def change
    add_column :rooms, :language, :string
  end
end
