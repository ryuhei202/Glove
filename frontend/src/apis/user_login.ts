import axios from 'axios';
import { LogIn } from '../interfaces';
import { usersLogin } from '../urls/index'



export const fetchLoginUser =(params:LogIn) => {
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
