class ApplicationController < ActionController::Base
  include ActionController::Cookies


  skip_before_action :verify_authenticity_token

    helper_method :login, :current_user, :logged_in?, :log_out, :current_user?, :session_have?

    def login(user)
        session[:user_id] =  user.id    
    end


    def current_user
    
        # #↓こいつ(session[:user_id])がnilになっていることが原因
        if session[:user_id]
            @current_user ||= User.find(session[:user_id]) 
        # else
        #     @current_user = User.find(17)
        end
    end

    def logged_in?
        !@current_user.nil?
    end

    def session_have?
        !session[:user_id].nil?
    end

    def log_out
        reset_session
        @current_user = nil
    end
  
      def current_user?(user)
        user && user == current_user
      end
end
