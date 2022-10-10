module Api
  module V1
    class UsersController < ApplicationController
      def index
        users = User.all

        render json: {
          users: users
        }, status: :ok
      end
    end
  end
end
