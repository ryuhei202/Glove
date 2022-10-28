
import { Link } from "react-router-dom";


export const Top = (props:any) => {
  return (
    <>
    <p>topページです</p>
    <h2>ログイン状態: {props.loggedInStatus}</h2>
    <Link to="/users">ユーザー一覧ページです</Link>
    <br />
    <Link to="/signup">ユーザー登録ページです</Link>
    <br />
    <Link to="/login">ログインページです</Link>
     
    </>
  )
};
