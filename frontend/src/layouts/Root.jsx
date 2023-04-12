import React from "react";
import StoreNavbar from "../Navbar";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";

export default function Root() {
  return (
    <div>
      <StoreNavbar />
      <div className={styles.topPadding}>
        <Outlet />
      </div>
    </div>
  );
}
