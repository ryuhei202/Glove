import { createContext, useState } from "react";
import { User } from "../interfaces";

export const UserContext = createContext<any>({});

export const UserProvider = (props:any) => {

 
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  console.log(currentUserInfo)

  return (
    <UserContext.Provider value={{ currentUserInfo, setCurrentUserInfo }}>
      {props.children}
    </UserContext.Provider>
  )
}

