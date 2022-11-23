class AddImageToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :image, :string
  end
end
