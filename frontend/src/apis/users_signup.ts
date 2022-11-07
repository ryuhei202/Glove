import axios from "axios";
import { SignUpData } from "../interfaces";
import { usersSignUp } from "../urls";




export const fetchpostUsers =(params:SignUpData) => {
  return axios.post(usersSignUp,
    {
      name: params.name,
      email: params.email,
      gender: params.gender,
      language: params.language,
      password: params.password
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
