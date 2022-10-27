module Api
  module V1
    class MessagesController < ApplicationController
    
    
          
            def show
      
              users = User.where(language: params[:language])
              messages = []
      
              users.each do |user|
                messages = user.messages
              end
              
              render json: {
                users: users,
                messages: messages,
                status: :ok
              }
      
            end
      
        
      
    end
  end
end
