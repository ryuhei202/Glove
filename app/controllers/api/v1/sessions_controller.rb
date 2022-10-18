module Api
  module V1
    class SessionsController < ApplicationController

      def create
        user = User.find_by(email: params[:session][:email].downcase)
      
        # userが有効かつ、パスワードが正しいか
        if user&.authenticate(params[:session][:password])
          log_in user
          #params[:session][:remember_me] ? remember(user) : forget(user)
          render json: {}, status: :ok
        else
          render json: {}, status: :bad_request
        end
      end
    
    end
  end
end
