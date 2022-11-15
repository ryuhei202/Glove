module Api
  module V1
    class MessagesController < ApplicationController
    
    
          
            # def show
      
            #   users = User.where(language: params[:language])
            #   usersnames = users.map { |user| user[:name]}

            #   messages = []
      
            #   users.each do |user|
            #     messages = user.messages
            #   end
              
            #   render json: {
            #     usersnames: usersnames,
            #     messages: messages,
            #     status: :ok
            #   }
      
            # end
      

            def create
              message = Message.new(message_params)
          
              if message.save
                render json: { status: 200, message: message }
              else
                render json: { status: 500, message: "作成に失敗しました" }
              end
            end
          
            private
          
              def message_params
                params.permit(:room_id, :user_id, :message, :image)
              end
        
      
    end
  end
end
