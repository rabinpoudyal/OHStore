import axios from "axios";
import { GET_PRODUCTS } from "../../endpoints";

// A mock function to mimic making an async request for data
export function getProducts(filters) {
  const { page, perPage, sort, order, ...rest } = filters;
  const query = Object.keys(rest)
    .map((key) => `${key}=${rest[key]}`)
    .join("&");
  return axios.get(`${GET_PRODUCTS}?${query}`);
}

export function addProduct(product) {
  return axios.post(GET_PRODUCTS, product);
}

export function editProduct(product, id) {
  return axios.patch(`${GET_PRODUCTS}/${id}`, product);
}

export function destroyProduct(id) {
  return axios.delete(`${GET_PRODUCTS}/${id}`);
}
