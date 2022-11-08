import { createContext, useState } from "react";
import {  Room } from "../interfaces";

export const ChatRoomsContext = createContext<any>({});

export const  ChatRoomsProvider = (props:any) => {
  const [ chatRooms, setChatRooms ] = useState<Room[]>([]);

  return(
    <ChatRoomsContext.Provider value={ { chatRooms, setChatRooms } }>
      {props.children}
    </ChatRoomsContext.Provider>
  )
}
