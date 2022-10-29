import axios from 'axios';
import { roomsIndex } from '../urls/index'


export const getRooms =() => {
  return axios.get(roomsIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.log(e))
}
