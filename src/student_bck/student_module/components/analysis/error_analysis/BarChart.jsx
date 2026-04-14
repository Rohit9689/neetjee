import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
        options: {
            chart: {
                toolbar: {
                    show: false
                },
            },
            
            xaxis: {
                categories: ["Easy", "Moderate", "Difficult", "Highly Difficult"],
                labels: {
                    show: true,
                    rotate: 0,
                    style: {
                        fontSize: '12px',
                        fontWeight: 400,
                    }
                },
            },
            yaxis: {
                show: true,
                title: {
                    text: this.props.titleHeading.Title,
                    rotate: 90,
                    floating: false,
                    style: {
                        fontSize:  '14px',
                        fontWeight:  600,
                        color: '#A7A7A7'
                    },
                },
            },
            grid: {
                show: false,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    distributed: true,
                    startingShape: 'flat',
                    endingShape: 'flat',
                    columnWidth: '60%',
                }
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: true,
                distributed:false,
                textAnchor: 'start',
                offsetX:-10,
                offsetY:0,
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: "000000"
                },
            },
            colors: ['#fcd4d9', '#fee9ec', '#f77e8e','#f893a0'],  
        },
        series: [{
          name: 'series-1',
          data: [500, 1200, 900, 1400]
        }]
      }
    }
    render() {
      return (
        <Chart options={this.state.options}
        series={this.state.series} 
        type="bar"
        height={120} />
      )
    }
  }

export default BarChart;