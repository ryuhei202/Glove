import { createContext, useState } from "react";

export const LoginStatusContext = createContext<any>({});
export const LoginStatusProvider = (props:any) => {

  const [loginStatus, setLoginStatus] = useState(null);

  return (
    <LoginStatusContext.Provider value={{  loginStatus,setLoginStatus }}>
      {props.children}
    </LoginStatusContext.Provider>
  )
}

