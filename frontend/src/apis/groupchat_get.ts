import axios from 'axios';
import { groupChat } from '../urls/index'


export const groupChatGet = () => {
  return axios.get(groupChat).then(res => {
    return res.data
  }).catch((e) => console.error(e))
}
