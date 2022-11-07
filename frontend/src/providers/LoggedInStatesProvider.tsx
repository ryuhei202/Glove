import { createContext, useState } from "react";

export const LoggedInStatesContext = createContext<any>({});

export const  LoggedInStatesProvider = (props:any) => {
  const [ loggedInStates, setLoggedInStatus ] = useState(null);

  return(
    <LoggedInStatesContext.Provider value={ { loggedInStates, setLoggedInStatus } }>
      {props.children}
    </LoggedInStatesContext.Provider>
  )
}
