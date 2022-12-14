module Api
  module V1
    class UsersController < ApplicationController

      def index
        user = User.find(params[:userId])
        users = User.where(language:user.language)

        render json: {
          users: users,
          session_have: session_have?,
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
        @group_room = Room.find_by(language:params[:language])
        if @user.save!
          login @user
          @group_room.members.create!(user_id: @user.id)
          render json: {
            logged_in: true,
            user: current_user,
            status: :created,
          }
        else
          render json: {
            logged_in: false,
            errors: @user.errors
          }, status: 422
        end
      end

      def update
        @user = User.find(params[:id])
        if @user.update!(user_params)
          render json: {
            logged_in: true,
            user: @user
          }
        else
          render json: {
            logged_in: false,
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
      params.require(:user).permit(:name, :gender, :language, :email, :password, :self_introduction, :profile_image)
          
    end
  end
    
  end
end
