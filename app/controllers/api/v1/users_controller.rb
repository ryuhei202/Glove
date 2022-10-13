module Api
  module V1
    class UsersController < ApplicationController

      def index
        users = User.all

        render json: {
          users: users
        }, status: :ok
      end

      def show 
        @user = User.find(params[:id])

        render json: {
          user: @user
        }, status: :ok
      end


      def create
        @user = User.new(user_params)
        if @user.save!
          render json: {
            user: @user
          }
        else
          render json: {
            errors: @user.errors
          }, status: 422
        end
      end

      # def create
      #   @user = User.new(name: name, gender: gender, email: email, password: password )
      #   @user.save
      #   # if @user.save
      #   #   redirect_to 'users/@user.id'
      #   # else
      #   #   render 'users/signup'
      #   # end
      # end

      wrap_parameters :user, include: [:name, :gender, :email, :password]

  private

    def user_params
      params.require(:user).permit(:name, :gender, :email, :password)
          
  end

  






    end
    
  end
end
