class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  
  belongs_to :room
  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :message, presence: true, length: { maximum: 500 }
end
