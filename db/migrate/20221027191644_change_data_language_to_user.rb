class ChangeDataLanguageToUser < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :language, :string
  end
end
