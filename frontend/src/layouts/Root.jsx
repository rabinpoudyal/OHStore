import React from "react";
import StoreNavbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <StoreNavbar />
      <div className="container mt-5 mb-5">
        <Outlet />
      </div>
    </div>
  );
}
