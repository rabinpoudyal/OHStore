import axios from "axios";
import { GET_PRODUCTS } from "../../endpoints";

// A mock function to mimic making an async request for data
export function getProducts() {
  return axios.get(GET_PRODUCTS);
}
