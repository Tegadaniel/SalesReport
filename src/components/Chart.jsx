import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Api } from "../api/Api";
import MiddleLoader from "./MiddleLoader";

export default function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    Api().then((data) => {
      if (cancel) return;
      setData(data);
      setLoading(false);
    });

    return () => {
      cancel = true;
    };
  }, []);

  const techData = data.filter((a) => a.Category === "Technology").length;
  const furnitureData = data.filter((a) => a.Category === "Furniture").length;
  const officeData = data.filter(
    (a) => a.Category === "Office Supplies"
  ).length;

  const copData = data.filter((a) => a.Segment === "Corporate").length;
  const homeOfficeData = data.filter((a) => a.Segment === "Home Office").length;
  const ConsumerData = data.filter((a) => a.Segment === "Consumer").length;

  const eastData = data.filter((a) => a.Region === "East").length;
  const westData = data.filter((a) => a.Region === "West").length;
  const centralData = data.filter((a) => a.Region === "Central").length;
  const southData = data.filter((a) => a.Region === "South").length;

  const categoryState = {
    labels: ["Technology", "Furniture", "Office Supplies"],
    datasets: [
      {
        label: "Total Order",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,

        data: [techData, furnitureData, officeData],
      },
    ],
  };

  const RegionData = {
    labels: ["East", "West", "Central", "South"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [eastData, westData, centralData, southData],
      },
    ],
  };

  const segmentData = {
    labels: ["Corporate", "Home Office", "Consumer"],
    datasets: [
      {
        label: "Total Order",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [copData, homeOfficeData, ConsumerData],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <MiddleLoader />
      ) : (
        <>
          <h4 className="mt-2 text-center">Category Order Data</h4>
          <Bar
            data={categoryState}
            width="50px"
            height="20px"
            options={{
              maintainAspectRatio: true,
            }}
          />

          <h4 className="mt-5 text-center">Segement Order Data</h4>
          <Bar
            data={segmentData}
            width="50px"
            height="20px"
            options={{
              maintainAspectRatio: true,
            }}
          />

          {/* <h4 className="mt-5 text-center">Region Order Data</h4>
          <Pie
            data={RegionData}
            width="50px"
            height="20px"
            options={{
              maintainAspectRatio: true,
            }}
          /> */}
        </>
      )}
    </>
  );
}
