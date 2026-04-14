import React, { Component } from "react";
import Chart from "react-apexcharts";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import moment from "moment";
import { Card } from 'react-bootstrap';

const FETCH_PRACTICE_GRAPH = gql`
  query($params: StudentGraphInput) {
    getStudentPracticeGraph(params: $params) {
      id
      subject
      timeseries {
        timestamp
        value
        practice_percentage
       }
    }
  }
`;

class MainLineChartForHome extends Component {
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

    if (series!=undefined) {
      if(series.length>0){
        for (let i = 0; i < series[0].timeseries.length; i++) {
          timeseries.push(
            moment.unix(series[0].timeseries[i].timestamp).format("MMM DD")
          );
        }
      }
      
    }

    options.xaxis.categories = timeseries;

    return options;
  }

  getSeries(series) {
    let data = Array();
if (series!=undefined) {
  console.log("getSeries", series);
for (let i = 0; i < series.length; i++) {
      let timeseries = Array();
      for (let j = 0; j < series[i].timeseries.length; j++) {
        if (this.props.stateData.practise == "1") {
          let value = series[i].timeseries[j].value;
          timeseries.push(value);
        }
        else {
          let pvalue = series[i].timeseries[j].practice_percentage;
          timeseries.push(pvalue);
        }

      }

      data.push({ name: series[i].subject, data: timeseries });
    }
}

    

    return data;
  }

  render() {
    console.log("graphquery","exam_id:", parseInt(this.props.stateData.examtype),
    "institution_id:", parseInt(Cookies.get("institutionid")),
    "start_time:", this.props.stateData.startDate,
    "end_time:", this.props.stateData.endDate,
    "branch_id:", parseInt(this.props.stateData.branch),
    "class_id:", parseInt(this.props.stateData.class),
    "section_id:", parseInt(this.props.stateData.section), Cookies.get("username"));


    if (this.props.getStudentPracticeGraph.loading) {
      return (
        <Card as={Card.Body} className="justify-content-center flex-row">
          <div class="spinner-border text-primary text-center"></div>
        </Card>
      );
    }
    else {
      return (<Card.Body className="p-1">
        <Chart
          options={this.getOptions(this.props.getStudentPracticeGraph.getStudentPracticeGraph)}
          series={this.getSeries(this.props.getStudentPracticeGraph.getStudentPracticeGraph)}
          type="line"
          width="100%"
          height="180"
        />
      </Card.Body>

      );
    }

  }
}

export default graphql(FETCH_PRACTICE_GRAPH, {
  options: (props) => ({
    variables: {
      params: {
        exam_id: parseInt(props.stateData.examtype),
        institution_id: parseInt(Cookies.get("institutionid")),
        start_time: props.stateData.startDate,
        end_time: props.stateData.endDate,
        branch_id: parseInt(props.stateData.branch),
        class_id: parseInt(props.stateData.class),
        section_id: parseInt(props.stateData.section),
        username:Cookies.get("username")
      }
    },
    fetchPolicy: "cache-and-network",
  }),
  name: "getStudentPracticeGraph",
})(MainLineChartForHome);
