class RenameNationalityColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :nationality, :language
  end
end
