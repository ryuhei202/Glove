import axios from 'axios';
import { usersLogout } from '../urls/index'

// type Inputs = {
//   email:string;
//   password:string;
// }

export const fetchLogoutUser =() => {
  return axios.delete(usersLogout, { withCredentials: true })
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log(error);
  })
}
