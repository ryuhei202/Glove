import axios from 'axios';
import { usersShow } from '../urls';

type Inputs = {
  name: string;
  gender: string;
  // email: string;
  // password: string;
  self_introduction: string;
};

export const updateUser = (userid: number, params: Inputs) => {

return axios.patch(usersShow(userid),
  {
    name: params.name,
    // email: params.email,
    gender: params.gender,
    // password: params.password,
    self_introduction: params.self_introduction
  }).then(res => {
    return res.data

  }).catch((e) => {throw e;})

}
