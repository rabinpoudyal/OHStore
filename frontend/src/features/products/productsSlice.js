import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  destroyProduct,
  editProduct,
  getProducts,
} from "./productsAPI";
import Jsona from "jsona";
const dataFormatter = new Jsona();

const initialState = {
  products: [],
  filters: {},
  selectedProduct: {},
  errors: [],
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

export const editProductAsync = createAsyncThunk(
  "edit/products",
  async ({ payload, id }) => {
    const response = await editProduct(payload, id);
    return response.data;
  }
);

export const destroyProductAsync = createAsyncThunk(
  "destroy/products",
  async (selectedProductId) => {
    const response = destroyProduct(selectedProductId);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        const products = dataFormatter.deserialize(action.payload);
        state.status = "idle";
        if(action.payload.meta.clear) {
          state.products = products;
        } else {
          state.products = [ ...state.products, ...products];
        }
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
        state.products = [...state.products].filter(
          (product) => product.id !== deletedProductId
        );
        state.errors = [];
      })
      .addCase(destroyProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = [action.error.message];
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [
          ...state.products,
          dataFormatter.deserialize(action.payload),
        ];
        state.errors = [];
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = [action.error.message];
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const newProductList = [...state.products].filter((item) => {
          return item.id !== action.payload.data.id;
        });
        state.products = [
          ...newProductList,
          dataFormatter.deserialize(action.payload),
        ];
        state.errors = [];
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = [action.error.message];
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
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectErrors = (state) => state.products.errors;
export const selectStatus = (state) => state.products.status;
export const selectIsLoading = (state) => state.products.status === "loading";

export default productsSlice.reducer;
