class ApplicationController < ActionController::API
  include ActionController::Cookies
#userでセッションを作成する。
  def log_in(user)
    session[:user_id] = user.id
  end

end
