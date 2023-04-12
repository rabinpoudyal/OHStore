import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";

import "./App.css";
import Login from "./features/login/Login";
import Spinner from "./Spinner";
import Products from "./features/products/Product";
import StoreNavbar from "./Navbar";
import { selectIsSignedIn } from "./features/login/loginSlice";
import Root from "./layouts/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

function App({ isLoading }) {
  const isLoggedIn = useSelector(selectIsSignedIn);

  return (
    <div className="">
      <Spinner isLoading={isLoading} />
      <RouterProvider router={router} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: Object.values(state).some((item) => item.status === "loading"),
});

export default connect(mapStateToProps)(App);
