import { createContext, useState } from "react";

export const ChatRoomsContext = createContext<any>({});

export const  ChatRoomsProvider = (props:any) => {
  const [ chatRooms, setChatRooms ] = useState<any>();

  return(
    <ChatRoomsContext.Provider value={ { chatRooms, setChatRooms } }>
      {props.children}
    </ChatRoomsContext.Provider>
  )
}
