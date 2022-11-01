module Api
  module V1
    class SessionsController < ApplicationController

      #login機能
      def create
        user = User.find_by(email: params[:session][:email].downcase)
      
        # userが有効かつ、パスワードが正しいか
        if user && user.authenticate(params[:session][:password])
          login(user)
          render json: { 
            logged_in: true,
            user: user,
            status: :created,
            current_user: current_user,
            session_have:session_have?
                       }
        else
          render json: {  status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。']}, status: :bad_request
        end
      end

      #logout機能
      def destroy
        log_out 
        render json: { status: 200, logged_out: true }
      end

      def logged_in?
        if current_user
            render json: { logged_in: true, user: @current_user }
        else
            render json: { logged_in: false, message: 'ユーザーが存在しません' }
        end
    end





      
    
    end
  end
end
