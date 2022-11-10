import axios from 'axios';
import { groupChatsIndex } from '../urls/index'


export const getGroupChats =(language:string,userid:number) => {
  return axios.get(groupChatsIndex(language),{params:{userId:userid}})
  .then(res => {
    console.log(res);
    return res.data
  })
  .catch((e) => console.log(e))
}
