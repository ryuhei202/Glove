class ChangeMassagesToMessages < ActiveRecord::Migration[7.0]
  def change
    rename_table :massages, :messages
  end
end
