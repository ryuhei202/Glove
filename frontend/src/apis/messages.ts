import axios from 'axios';
import { messageIndex } from '../urls/index'

export const createMessage =() => {
  return axios.post(messageIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
