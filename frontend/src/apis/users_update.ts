import axios from 'axios';
import { UpDateUser } from '../interfaces';
import { usersShow } from '../urls';



export const updateUser = (userid: number, params:any) => {

return axios.patch(usersShow(userid),
  params).then(res => {
    return res.data

  }).catch((e) => {throw e;})

}
