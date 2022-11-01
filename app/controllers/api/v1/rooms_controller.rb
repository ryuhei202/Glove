module Api
  module V1
    class RoomsController < ApplicationController

    
      before_action :set_chat_room, only: %i[show]
      # before_action :set_current_user, only: %i[index]


      #個別チャット一覧
      def index
        rooms = []
    
        

          # current_user.rooms.order("created_at DESC").each do |room|
          #   # 部屋の情報（相手のユーザーは誰か、最後に送信されたメッセージはどれか）をJSON形式で作成
          #   rooms << {
          #     room: room,
          #     other_users: room.users.where.not(id: @current_user.id),
          #     last_message: room.messages[-1]
          #   }
          # end
        
          # else
          #   rooms = ["存在しません"]
          # end
      
       
    
        render json: { status: 200, rooms: rooms, session_have: session_have?, } 
      end
    
      def show
        other_user = @room.users.where.not(id: @current_user.id)
        messages = @room.messages.order("created_at ASC")
    
        render json: { status: 200, other_user: other_user, messages: messages }
      end
    
      private
    
        def set_chat_room
          @room = Room.find(params[:id])
        end

   
    end
  end
end

