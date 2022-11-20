import axios from 'axios';
import { usersIndex } from '../urls/index'

export const fetchUsers =(id:number) => {
  return axios.get(usersIndex,{params:{userId:id}})
  .then(res => {
    console.log(res)
    return res.data
  })
  .catch((e) => console.error(e))
}
