class User < ApplicationRecord
  has_many:members, dependent: :destroy
  has_many:massages, dependent: :destroy
  has_many:rooms, through: :members
 
  
  before_save { self.email = email.downcase }
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  has_secure_password

  validates :password, presence: true, length: { minimum: 6 }

  enum gender: { man: 0, woman: 1 }

  validates :self_introduction, length: { maximum: 500 }






end
