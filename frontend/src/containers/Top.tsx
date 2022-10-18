
import { Link } from "react-router-dom";


export const Top = () => {
  return (
    <>
    <p>topページです</p>
    <Link to="/users">ユーザー一覧ページです</Link>
    <br />
    <Link to="/signup">ユーザー登録ページです</Link>
    <br />
    <Link to="/login">ログインページです</Link>
     
    </>
  )
};
