import axios from 'axios';
import { groupChat } from '../urls/index'


export const groupChatGet = (language:any) => {
  return axios.get(groupChat(language)).then(res => {
    return res.data
  }).catch((e) => console.error(e))
}
