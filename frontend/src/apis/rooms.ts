import axios from 'axios';
import { roomsIndex } from '../urls/index'


export const getRooms =(id:number) => {
  return axios.get(roomsIndex,{params:{userId:id}})
  .then(res => {
    return res.data
  })
  .catch((e) => console.log(e))
}
