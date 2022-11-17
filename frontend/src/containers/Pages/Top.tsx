
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInStatesContext } from "../../providers/LoggedInStatesProvider";
import { Header } from "../Templetes/Header";


export const Top = (props:any) => {

  return (
    <>
    <Header>toppage</Header>
    <Link to="/users">ユーザー一覧ページです</Link>
    <br />
    <Link to="/signup">ユーザー登録ページです</Link>
    <br />
    <Link to="/login">ログインページです</Link>
    <br />
    <Link to="/chatrooms">chatroom</Link>
     
    </>
  )
};
