import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { gethotelAsync, hotelSelector } from '../redux/reducer/hotelReducer';
import ReactApexChart from 'react-apexcharts';
import './style.css';

const Hotel = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(hotelSelector);
  useEffect(() => {
    dispatch(gethotelAsync())
  }, [dispatch])
  // console.log(data);
  let requests = {};
  let departments = new Set();
  for (let i = 0; i < data?.length; i++) {
    if (requests[data[i].hotel.name]) {
      requests[data[i].hotel.name]++;
    } else {
      requests[data[i].hotel.name] = 1;
    }
    departments.add(data[i].desk.name)
  }
  // console.log(requests);
  // console.log(departments);


  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    title: {
      text: 'Request per Hotel',
      align: 'center'
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    toolbar: {
      show: false,
    },
    xaxis: {
      categories: Object.keys(requests),
    },
    yaxis: {
      stepSize: 2,
      min: 0,
      max: 8
    },
  };


  const series = [{
    name: 'request',
    data: Object.values(requests)
  }];


  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="line" height={350} width={600} />
      <div className="bottom">
        <div className="total-request">
          Total Request: {data?.length}
        </div>
        <div className="department">
          List of unique department names across all Hotels : {" "}
          {
            [...departments].map((value) => (
              <span key={value}>
                {value}, {" "}
              </span>
            ))
          }
        </div>
      </div>
    </div >
  );
};

export default Hotel