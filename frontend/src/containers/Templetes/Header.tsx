import { useContext } from "react";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";

export const Header = (props:any) => {
  const loggedincontext = useContext(LoggedInStatesContext);
  console.log(loggedincontext.loggedInStates)
  return (
    <>
    <p>{props.children}</p>
    <h2>ログイン状態: {loggedincontext.loggedInStates}</h2>
    
    </>
  )
};
