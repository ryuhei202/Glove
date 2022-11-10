
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { Header } from "../Templetes/Header";


export const GroupChatRoom = (props:any) => {

  const  { language } = useParams<{ language: any }>();
  console.log(language)

  return (
    <>
    <Header>groupchatページです</Header>
    <br />
    <Link to="/chatrooms">chatrooms</Link>
     
    </>
  )
};
