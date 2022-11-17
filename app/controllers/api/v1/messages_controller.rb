module Api
  module V1
    class MessagesController < ApplicationController
    
            def create
              message = Message.new(message_params)
          
              if message.save
                render json: { status: 200, message: message }
              else
                render json: { status: 500, message:message.errors }
              end
            end
          
            private
          
              def message_params
                params.permit(:room_id, :user_id, :message, :image)
              end
        
      
    end
  end
end
