
import axios from 'axios';
import { SIGN_IN } from '../../endpoints';

export function signIn({ email, password }) {
  return axios.post(SIGN_IN, {
    email,
    password,
  });
}