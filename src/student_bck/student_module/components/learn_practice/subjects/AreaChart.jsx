import React, { Component } from "react";
import Chart from "react-apexcharts";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import moment from "moment";

const FETCH_PRACTICE_GRAPH = gql`
  query($mobile: String!, $timeline: Int, $subject: Int, $chapter: Int) {
    getPracticeGraph(
      mobile: $mobile
      timeline: $timeline
      subject: $subject
      chapter: $chapter
    ) {
      # id
      subject
      chapter
      timeseries {
        timestamp
        value
      }
    }
  }
`;

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
    };
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
        timeseries.push(series[i].timeseries[j].value);
      }

      data.push({ name: "Practice", data: timeseries });
    }

    console.log("series", data);
    return data;
  }

  render() {
    console.log(
      "AreaChart",
      this.props.subject,
      this.props.chapter,
      this.props.getPracticeGraph
    );

    if (this.props.getPracticeGraph.loading) return (
    <div className="shadow border-0 mb-4 justify-content-center d-flex align-items-center" style={{height: 90}}>
    <div class="spinner-border text-center" style={{color:"#633FD2"}}></div>
</div>);

    return (
      <Chart
        options={this.getOptions(this.props.getPracticeGraph.getPracticeGraph)}
        series={this.getSeries(this.props.getPracticeGraph.getPracticeGraph)}
        type="area"
        height="90px"
      />
      
    );
  }
}

export default graphql(FETCH_PRACTICE_GRAPH, {
  options: (props) => ({
    variables: {
      mobile: Cookies.get("mobile"),
      timeline: 1,
      subject: parseInt(props.subject),
      chapter: parseInt(props.chapter),
      topic:parseInt(props.topic)
    },
    fetchPolicy: "cache-and-network",
  }),
  name: "getPracticeGraph",
})(AreaChart);
