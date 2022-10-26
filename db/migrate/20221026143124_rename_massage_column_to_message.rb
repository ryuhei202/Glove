class RenameMassageColumnToMessage < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :massage, :message
  end
end
