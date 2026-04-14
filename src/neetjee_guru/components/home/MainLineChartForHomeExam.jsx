import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
class MainLineChartForHomeExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [2, 2, 2],
        },
        xaxis: {
          categories: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
        },
      },
      series: [
        {
          name: "subject1",
          data: [40, 25, 50, 49, 21, 70, 51],
        },
        {
          name: "subject2",
          data: [12, 54, 61, 32, 56, 81, 19],
        },
        {
          name: "subject3",
          data: [12, 45, 55, 76, 41, 23, 43],
        },
        {
          name: "subject4",
          data: [12, 45, 55, 76, 41, 23, 43],
        },
      ],
    };
  }

  getOptions(series) {
    let options = {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [2, 2, 2],
      },
      xaxis: {
        categories: [],
      },
    };

    let timeseries = options.xaxis.categories;

    if (series.length > 0) {
      for (let i = 0; i < series[0].timeseries.length; i++) {
        timeseries.push(
          moment.unix(series[0].timeseries[i].timestamp).format("MMM DD")
        );
      }
    }

    options.xaxis.categories = timeseries;

    return options;
  }

  getSeries(series) {
    let data = Array();

    for (let i = 0; i < series.length; i++) {
      let timeseries = Array();
      for (let j = 0; j < series[i].timeseries.length; j++) {
        // if (this.props.stateData.practise == "1") {
        //   let value = series[i].timeseries[j].value;
        //   timeseries.push(value);
        // }
        // else {
        let pvalue = series[i].timeseries[j].practice_percentage;
        timeseries.push(pvalue);
        // }

      }

      data.push({ name: series[i].subject, data: timeseries });
    }

    return data;
  }

  render() {

    return (
      <Chart
        options={this.getOptions(this.props.exam_graph)}
        series={this.getSeries(this.props.exam_graph)}
        type="line"
        width="100%"
        height="200"
      />
    );
  }
}

export default (MainLineChartForHomeExam);
