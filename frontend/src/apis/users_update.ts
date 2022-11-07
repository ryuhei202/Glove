import axios from 'axios';
import { UpDateUser } from '../interfaces';
import { usersShow } from '../urls';



export const updateUser = (userid: number, params:UpDateUser) => {

return axios.patch(usersShow(userid),
  {
    name: params.name,
    gender: params.gender,
    self_introduction: params.self_introduction
  }).then(res => {
    return res.data

  }).catch((e) => {throw e;})

}
