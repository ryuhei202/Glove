class ApplicationController < ActionController::Base
  include ActionController::Cookies


  skip_before_action :verify_authenticity_token

    helper_method :login, :current_user,  :logged_in_now?, :log_out,  :session_have?, 

    def login(user)
        session[:user_id] =  user.id    
    end

    def current_user
        if session[:user_id]
        @current_user ||= User.find(session[:user_id])     
        end
    end


    def log_out
        reset_session
        @current_user = nil
    end


    def logged_in_now?
        !@current_user.nil?
    end

    def session_have?
        !session[:user_id].nil?
    end



  
  
end
