import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { liveDataShow } from "../apis/Service";

const RealTimeMap = () => {
  const [liveData, setLiveData] = useState([]);

  // API interaction
  const fetchData = async () => {
    try {
      const response = await liveDataShow();
      if (response?.error) {
        console.log("Api Break", response.error);
      } else {
        // console.log("live data", response.data);
        setLiveData(response.data);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  // Prepare chart option
  const options = {
    title: {
      text: "Monitoring The Well Data",
      align: "center",
    },
    subtitle: {
      text: "Displays Of the Real Time Data",
      align: "center",
    },
    tooltip: {
      shared: true, 
      useHTML: true, 
      formatter: function () {
        let s = `<strong>Date: ${Highcharts.dateFormat('%Y-%m-%d', this.x)}</strong><br/>`;
        this.points.forEach(point => {
          s += `<span style="color:${point.series.color}">${point.series.name}:</span> <b>${point.y}</b><br/>`;
        });
        return s; 
      },
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: [{
      title: {
        text: 'Price (USD)',
      },
      opposite: false, 
    }, {
      title: {
        text: 'Volume',
      },
      opposite: true,
    }],
    series: [
      {
        name: 'Close Price',
        data: liveData.map(item => [Date.parse(item.Date), item.Close]),
        tooltip: {
          valueSuffix: ' USD',
        },
      },
      {
        name: 'High Price',
        data: liveData.map(item => [Date.parse(item.Date), item.High]),
        tooltip: {
          valueSuffix: ' USD',
        },
      },
      {
        name: 'Low Price',
        data: liveData.map(item => [Date.parse(item.Date), item.Low]),
        tooltip: {
          valueSuffix: ' USD',
        },
      },
      {
        name: 'Open Price',
        data: liveData.map(item => [Date.parse(item.Date), item.Open]),
        tooltip: {
          valueSuffix: ' USD',
        },
      },
      {
        name: 'Volume',
        data: liveData.map(item => [Date.parse(item.Date), item.Volume]),
        tooltip: {
          valueSuffix: '',
        },
        yAxis: 1, 
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "80vw",
          height: "50vh",
        }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      </div>
    </div>
  );
};

export default RealTimeMap;
