class User < ApplicationRecord
  attr_accessor :remember_token
  before_save { self.email = email.downcase }
  has_many :members
  has_many :messages
  has_many :rooms, through: :members
 
  
  before_save { self.email = email.downcase }
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  has_secure_password

  validates :password, presence: true, length: { minimum: 6 },  on: :create

  enum gender: { man: 0, woman: 1 }

  enum language: { japanese:0,chinese:1,english:2,russian:3,romanian:4,lithuania:5,latvian:6,portuguese:7,polish:8,bulgarian:9,french:10,finnish:11,hungarian:12,turkish:13,german:14,danish:15,czech:16,slovenian:17,slovakian:18,spanish:19,swedish:20,greek:21,dutch:22,estonian:23,ukrainian:24,indonesian:25,italian:26 }

  validates :gender, :language, presence: true, on: :create

  validates :self_introduction, length: { maximum: 500 }

  # 渡された文字列のハッシュ値を返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # ランダムなトークンを返す
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  # 永続セッションのためにユーザーをデータベースに記憶する
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたトークンがダイジェストと一致したらtrueを返す
  def authenticated?(remember_token)
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end
  






end
