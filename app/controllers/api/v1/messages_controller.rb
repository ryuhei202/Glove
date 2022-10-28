module Api
  module V1
    class MessagesController < ApplicationController
    
    
          
            def show
      
              users = User.where(language: params[:language])
              usersnames = users.map { |user| user[:name]}

              messages = []
      
              users.each do |user|
                messages = user.messages
              end
              
              render json: {
                usersnames: usersnames,
                messages: messages,
                status: :ok
              }
      
            end
      
        
      
    end
  end
end
