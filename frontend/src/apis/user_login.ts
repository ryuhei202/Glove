import axios from 'axios';
import { usersLogin } from '../urls/index'

type Inputs = {
  email:string;
  password:string;
}

export const fetchLoginUser =(params:Inputs) => {
  return axios.post(usersLogin, { 
    email:params.email,
    password:params.password,
   }, { withCredentials: true })
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error);
  })
}
