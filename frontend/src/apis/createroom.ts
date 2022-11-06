import axios from 'axios';
import { roomsCreateIndex } from '../urls/index'

export const createRoom =(params:any) => {
  return axios.post(roomsCreateIndex,{
    userId:params.userid,
    otherUserId:params.other_userid
    })
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
