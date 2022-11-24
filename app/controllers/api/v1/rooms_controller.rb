module Api
  module V1
    class RoomsController < ApplicationController

    
      before_action :set_chat_room, only: %i[show]
      before_action :set_groupchat_room, only: %i[groupshow]
      # before_action :set_current_user


     


      #個別チャット一覧
      def index
        rooms = []

        user = User.find(params[:userId])
        grouproom = user.rooms.find_by(language: user.language)
        grlastmessage = grouproom.messages[-1]
        directrooms= user.rooms.where.not(id: grouproom.id)
    
          directrooms.order("created_at DESC").each do |room|
            # 部屋の情報（相手のユーザーは誰か、最後に送信されたメッセージはどれか）をJSON形式で作成
            rooms << {
              room: room,
              other_users: room.users.where.not(id: user.id),
              last_message: room.messages[-1]
            }
          end
        render json: { status: 200, rooms: rooms, grouproom: grouproom, grlastmessage: grlastmessage } 
      end
    
      def show
        user = User.find(params[:userId])
        
        other_user = @room.users.where.not(id: user.id)
        messages = @room.messages.order("created_at ASC")
  
        render json: { status: 200, other_user: other_user, messages: messages, room: @room }
      end

      def groupshow
        user = User.find(params[:userId])
        
        other_user = @group_room.users.where.not(id: user.id)
        messages = @group_room.messages.order(created_at: :ASC)
    
        render json: { status: 200, other_user: other_user, messages: messages, room: @group_room }
      end

      def create

        user = User.find(params[:userId])
        other_user = User.find(params[:otherUserId])
        
        @room = Room.create!
        Member.create!(room_id:@room.id, user_id: user.id)
        Member.create!(room_id:@room.id, user_id: other_user.id)

        render json: {
          room: @room,
          room_member:@room.members
        }
     
      end
    
      private
    
        def set_chat_room
          @room = Room.find(params[:id])
        end

        def set_groupchat_room
          @group_room = Room.find_by(language: params[:language])
        end

   
    end
  end
end

