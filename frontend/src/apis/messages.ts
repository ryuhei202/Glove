import axios from 'axios';
import { type } from 'os';
import { messageIndex } from '../urls/index'

// type MessageParams = {
// user_id:an;
// room_id:number;
// message:string;
// }

export const createMessage =(params:any) => {
  return axios.post(messageIndex,
   params
  // ,{
  //   headers: {
  //     'content-type': 'multipart/form-data',
  //   }}
    )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
