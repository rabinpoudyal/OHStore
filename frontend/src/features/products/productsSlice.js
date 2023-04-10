import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addProduct, destroyProduct, getProducts } from "./productsAPI";
import Jsona from "jsona";
const dataFormatter = new Jsona();

const initialState = {
  products: [],
  filters: {},
  selectedProductId: null,
};

export const getProductsAsync = createAsyncThunk(
  "get/products",
  async (filters) => {
    const response = await getProducts(filters);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "create/products",
  async (product) => {
    const response = await addProduct(product);
    return response.data;
  }
);

export const destroyProductAsync = createAsyncThunk(
  "destroy/products",
  async (selectedProductId) => {
    const response = destroyProduct(selectedProductId)
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProductId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending , (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = dataFormatter.deserialize(action.payload);
      })
      .addCase(getProductsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(destroyProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(destroyProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedProductId = action.meta.arg;
        state.products = [ ...state.products ].filter(product => product.id !== deletedProductId);
      })
      .addCase(destroyProductAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = [...state.products, dataFormatter.deserialize(action.payload)];
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  products,
  setSelectedProduct,
  removeProductById,
  addNewProduct,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;