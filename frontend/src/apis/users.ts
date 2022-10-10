import axios from 'axios';
import { usersIndex } from '../urls/index'

type Userstype = {
  created_at: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  password_digest: string;
  profile_image: string;
  self_introduction: string;
  updated_at: string;
}

export const fetchUsers =() => {
  return axios.get(usersIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
