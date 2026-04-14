import React, { Component } from "react";
import Chart from "react-apexcharts";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import moment from "moment";
import ReactApexChart from 'react-apexcharts';
import { Row, Col } from "react-bootstrap";

const FETCH_PRACTICE_GRAPH = gql`
  query($mobile: String!, $timeline: Int) {
    getPracticeGraph(mobile: $mobile, timeline: $timeline) {
      id
      subject
      chapter
      timeseries {
        timestamp
        value
      }
      
    }
  }
`;

class MainLineChart extends Component {
  constructor(props) {
    super(props);
this.state = {
};
  }
  // getviewsSeries(series) {
  //   let data = Array();
  //   series[0].viewseries.map((item)=>{
  //     data.push({
  //       name:item.type,
  //       data:[]
  //     });
  //   });

  //   let ShortNotes = Array();
  //       let RevisionMaterials = Array();
  //       series.map((s)=>{
  //         s.viewseries.map((item)=>{
  //           if(item.type=="Short Notes"){
  //             ShortNotes.push(item.value);
  //           }
  //           else if(item.type=="Revision Materials"){
  //             RevisionMaterials.push(item.value);
  //           }
            
  //         });
  //       });
  //     const filterData=data.map((a)=>{
  //     if(a.name=="Short Notes"){
  //       return{...a, data:ShortNotes}
  //     }
  //     else if(a.name=="Revision Materials"){
  //       return{...a, data:RevisionMaterials}
  //     }
  //   });
  //   console.log("filterData", filterData);

  //   return filterData;
  // }
  // getViewsOptions(series) {
  //   console.log("getViewsOptions", series);
  //   let options = {
  //     chart: {
  //       type: 'bar',
  //       height: 250,
  //       toolbar: {
  //         show: false
  //       },
  //     },
  //     colors: [],
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         columnWidth: '55%'
  //       },
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     grid: {
  //       show: false
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ['transparent']
  //     },
  //     xaxis: {
  //       categories: [],
  //       labels: {
  //         show: true,
  //         rotate: 0,
  //         rotateAlways: false,
  //         hideOverlappingLabels: true,
  //         showDuplicates: false,
  //         trim: false
  //       },
  //     },

  //     yaxis: {
  //       show: true,
  //       title: {
  //         text: this.props.titleHeading,
  //         rotate: 90,
  //         offsetY: 12,
  //         floating: false,
  //         style: {
  //           fontSize: '14px',
  //           fontWeight: 600,
  //           color: '#A7A7A7'
  //         },
  //       },
  //     },

  //     fill: {
  //       opacity: 1,
  //       colors: []
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (val) {
  //           return "Views - " + val;
  //         }
  //       }
  //     }
  //   };

  //   let viewseries = options.xaxis.categories;
  //   let colors = [];

  //   if (series.length > 0) {
  //     series.map((ca) => {
  //       viewseries.push(
  //         ca.subject
  //       );
  //     });
  //     series[0].viewseries.map((a) => {
  //       let color = "";
  //       if (a.type == "Short Notes") {
  //         color = "#3ac555";
  //       }
  //       else if (a.type == "Revision Materials") {
  //         color = "#f05d70";
  //       }
  //       // else if (ca.id == "3") {
  //       //   color = "#0060ce";
  //       // }
  //       // else if (ca.id == "4") {
  //       //   color = "#00040a";
  //       // }
  //       // else if (ca.id == "5") {
  //       //   color = "#c37800";
  //       // }
  //       colors.push(
  //         color
  //       );
        
  //     });
  //   }

  //   options.xaxis.categories = viewseries;
  //   options.fill.colors = colors;
  //   options.colors = colors;
  //   return options;
  // }


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
        timeseries.push(series[i].timeseries[j].value);
      }

      data.push({ name: series[i].subject, data: timeseries });
    }

    return data;
  }

  render() {
    console.log("Props", this.props, Cookies.get("mobile"));

    if (this.props.getPracticeGraph.loading) return null;

    return (
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Chart
            options={this.getOptions(this.props.getPracticeGraph.getPracticeGraph)}
            series={this.getSeries(this.props.getPracticeGraph.getPracticeGraph)}
            type="line"
            width="100%"
            height="180"
          />
        </Col>
        {/* <Col xl={6} lg={6} md={12}>
          <ReactApexChart
            options={this.getViewsOptions(this.props.getPracticeGraph.getPracticeGraph)}
            series={this.getviewsSeries(this.props.getPracticeGraph.getPracticeGraph)} type="bar" height={180} />

        </Col> */}

      </Row>
    );
  }
}

export default graphql(FETCH_PRACTICE_GRAPH, {
  options: (props) => ({
    variables: {
      mobile: Cookies.get("mobile"),
      timeline: parseInt(props.timeseries),
    },
    fetchPolicy: "cache-and-network",
  }),
  name: "getPracticeGraph",
})(MainLineChart);
