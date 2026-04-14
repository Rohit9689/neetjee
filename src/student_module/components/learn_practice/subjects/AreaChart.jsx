import React, { Component } from "react";
import Chart from "react-apexcharts";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import moment from "moment";
import axios from "axios";


class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ["#633FD2"],
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995],
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
        },
        stroke: {
          width: 1,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          y: {
            formatter: function (
              value,
              { series, seriesIndex, dataPointIndex, w }
            ) {
              return value;
            },
          },
        },
      },

      series: [
        {
          name: "Practice",
          data: [2, 40, 45, 45, 2],
        },
      ],
      loader:0,
      getPracticeGraph:[]
    };
  }
  componentDidMount = () => {
    this.setState({
      loader:1
    });

    axios.get(`${this.props.graph}`)
        .then(response => {
            console.log("SingleBlogSection", response.data);
            if (response.status == 200) {
                this.setState({
                  getPracticeGraph: response.data,
                    loader:0
                });
            }
            else {
                this.setState({
                  getPracticeGraph: [],
                    loader:0
                });
            }

        })
        .catch(error => {
            console.log(error);
        });
}
  getOptions(series) {
    let options = {
      colors: ["#633FD2"],
      chart: {
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        width: 1,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value;
          },
        },
      },
    };

    let timeseries = options.xaxis.categories;

    if (series.length > 0) {
      for (let i = 0; i < series.length; i++) {
        timeseries.push(
          moment.unix(series[i].timestamp).format("MMM DD")
        );
      }
    }

    options.xaxis.categories = timeseries;

    return options;
  }

  getSeries(series) {
    let data = Array();
    let timeseries = Array();
    for (let i = 0; i < series.length; i++) {
      
      // for (let j = 0; j < series[i].timeseries.length; j++) {
      //   timeseries.push(series[i].timeseries[j].value);
      // }
      timeseries.push(series[i].value);
      
    }
    data.push({ name: "Practice", data: timeseries });
    //console.log("series", data);
    return data;
  }

  render() {
    console.log(
      "AreaChart",
      this.props.graph
    );

    if (this.state.loader==1) return (
    <div className="shadow border-0 mb-4 justify-content-center d-flex align-items-center" style={{height: 90}}>
    <div class="spinner-border text-center" style={{color:"#633FD2"}}></div>
</div>);

    return (
      <Chart
        options={this.getOptions(this.state.getPracticeGraph)}
        series={this.getSeries(this.state.getPracticeGraph)}
        type="area"
        height="90px"
      />
      
    );
  }
}
export default AreaChart;

