class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  
  belongs_to :room
  belongs_to :user
  validates :user_id, presence: true
  validates :message, length: { maximum: 500 }
end
