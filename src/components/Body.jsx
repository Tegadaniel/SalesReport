import React, { useState, useEffect } from "react";
import { Api } from "../api/Api";
import "bootswatch/dist/lux/bootstrap.css";
import { formatNumber } from "../helpers/utils";

export default function Body() {
  const [salesData, setsalesData] = useState([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setitemsPerPage] = useState(20);
  const [currentPage, setcurrentPage] = useState(1);

  const pages = [];
  for (let i = 1; i <= Math.ceil(salesData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    return (
      <li key={number} id={number}>
        {number}
      </li>
    );
  });
  console.log(renderPageNumbers);

  useEffect(() => {
    Api()
      .then((data) => setsalesData(data))
      .catch((error) => setError(error.message));
  }, []);

  console.log(salesData);
  if (error) return <h1>{error}</h1>;
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Profit</th>
            <th scope="col">Quantity</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        {salesData.map((data, i) => {
          return (
            <tbody>
              <tr className="table-dark">
                <td>{data.Category}</td>
                <td>{data['Product Name']}</td>
                <td>{formatNumber(data.Sales)}</td>
                <td>{formatNumber(data.Profit)}</td>
                <td>{data.Quantity}</td>
                <td>{data.Country}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
