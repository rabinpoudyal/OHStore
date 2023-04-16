
import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from '../../endpoints';

export function signIn({ email, password }) {
  return axios.post(SIGN_IN, {
    email,
    password,
  });
}

export function signOut() {
  return axios.delete(SIGN_OUT, {
    headers: {
      'access-token': localStorage.getItem('accessToken'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    },
  });
}