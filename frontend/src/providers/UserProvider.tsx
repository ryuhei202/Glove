import { createContext, useState } from "react";

export const UserContext = createContext<any>({});

export const UserProvider = (props:any) => {

  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ currentUserInfo, setCurrentUserInfo }}>
      {props.children}
    </UserContext.Provider>
  )
}

