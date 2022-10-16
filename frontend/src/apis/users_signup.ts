import axios from "axios";
import { usersSignUp } from "../urls";

type Inputs = {
  name: string;
  gender: string;
  language: string;
  email: string;
  password: string;
};


export const fetchpostUsers =(params:Inputs) => {
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
