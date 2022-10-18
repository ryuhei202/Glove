import axios from 'axios';
import { usersIndex } from '../urls/index'

export const fetchUsers =() => {
  return axios.get(usersIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
