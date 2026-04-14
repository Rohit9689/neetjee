import React, { Component } from 'react'
import Chart from "react-apexcharts";

class LineChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {
            colors: ['#00C596','#F05D70'],
            chart: {
              toolbar: {
                show: false
              },
              sparkline: {
                enabled: false
              }
            },
            xaxis: {
              categories: [1991,1992,1993,1994,1995],
              labels: {
                show: false,
                minHeight: 0,
                maxHeight: 10
              },
              tooltip: {
                enabled: false
              }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false
            },
            stroke: {
                width: 2
            },
            dataLabels: {
                enabled: false
            },
            legend:{
              show: true,
              position: 'top',
              offsetY: 8,
            }
            
          },
          
          series: [
            {
              name: "Correct answered",
              data: [10, 15, 25, 30, 35]
            },
            {
              name: "Wrong Answered",
              data: [20, 29, 37, 36, 44]
            }
          ]
        };
      }

    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                height="100px"
            />
        )
    }
}

export default LineChart
