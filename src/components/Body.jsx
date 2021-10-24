import React, { useState, useEffect } from "react";
import { Api } from "../api/Api";
import "bootswatch/dist/lux/bootstrap.css";
import "./Body.css";
import { formatNumber } from "../helpers/utils";

export default function Body() {
  const [salesData, setsalesData] = useState([]);
  // eslint-disable-next-line
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [itemsPerPage, setitemsPerPage] = useState(20);
  const [currentPage, setcurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = salesData.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(salesData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    Api()
      .then((data) => setsalesData(data))
      .catch((error) => setError(error.message));
  }, []);

  console.log(salesData);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit && currentPage > pages[0]) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip;</li>;
  }

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
        {currentItem.map((data, i) => {
          return (
            <tbody>
              <tr className="table-dark">
                <td>{data.Category}</td>
                <td>{data["Product Name"]}</td>
                <td>{formatNumber(data.Sales)}</td>
                <td>{formatNumber(data.Profit)}</td>
                <td>{data.Quantity}</td>
                <td>{data.Country}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
