import axios from 'axios';
import { usersShow } from '../urls/index'


export const fetchUsersShow =(userid: number) => {
  return axios.get(usersShow(userid))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
