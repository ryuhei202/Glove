import axios from 'axios';
import { eachRoomsIndex, roomsIndex } from '../urls/index'


export const getEachRooms =(id:number,userid:number) => {
  return axios.get(eachRoomsIndex(id),{params:{userId:userid}})
  .then(res => {
    console.log(res);
    return res.data

  })
  .catch((e) => console.log(e))
}
