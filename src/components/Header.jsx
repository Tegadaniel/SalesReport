import React from "react";
import "bootswatch/dist/lux/bootstrap.css";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={`${styles.header} mt-3 text-center p-3 `}>
        <h1>Sky High Data Analysis</h1>
      <Link to="/">Table Data</Link>
      <Link to="/chart">Chart Data</Link>
    </header>
  );
}
