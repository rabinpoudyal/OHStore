import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Login from "./features/login/Login";
import Spinner from "./Spinner";
import Products from "./features/products/Product";
import StoreNavbar from "./Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />
  }
]);

function App({ isLoading }) {
  return (
    <div className="">
      <StoreNavbar />
      <Spinner isLoading={isLoading} />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: Object.values(state).some((item) => item.status === "loading"),
});

export default connect(mapStateToProps)(App);
