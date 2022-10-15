import axios from 'axios';
import { usersShow } from '../urls/index'


export const fetchUserDelete =(userid: number) => {
  return axios.delete(usersShow(userid))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
