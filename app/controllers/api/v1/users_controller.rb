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
          user: @user,
          status: :ok
        }
      end


      def create
        @user = User.new(user_params)
        if @user.save!
          login @user
          render json: {
            user: @user,
            status: :created,
          }
        else
          render json: {
            errors: @user.errors
          }, status: 422
        end
      end

      def update
        @user = User.find(params[:id])
        if @user.update!(user_params)
          render json: {
            user: @user
          }
        else
          render json: {
            errors: @user.errors
          }, status: 422
        end
      end

      def destroy
        @user = User.find(params[:id])
        @user.destroy!
        render json: {
          user: @user
        }
      end


      wrap_parameters :user, include: [:name, :gender, :language, :email, :password, :self_introduction]

  private

    def user_params
      params.require(:user).permit(:name, :gender, :language, :email, :password, :self_introduction)
          
    end
  end
    
  end
end
