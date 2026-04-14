import React, { Component } from "react";
import Chart from "react-apexcharts";

class VerticalBarChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        
        options : {
            chart: {
                tacked: true,
                sparkline: {
                    enabled: true
                }
            },
           
              
            plotOptions: {
                bar: {
                    horizontal: false,
                    distributed: true,
                    startingShape: 'rounded',
                    endingShape: 'rounded',
                    columnWidth: '25%',
                    colors: {
                        backgroundBarColors: ['#f9d6d3']
                    }
                },
            },
            dataLabels: {
                enabled: true,
                distributed:false,
                textAnchor: 'middle',
                offsetX:25,
                offsetY:0,
                formatter: function (val, opts) {
                    return val+"%"
                },
                style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    colors: "000000"
                },
            },
            stroke: {
                width: 0,
            },
                
            title: {
                text: '100%',
                floating: true,
                offsetX: -10,
                offsetY: 5,
                style: {
                    fontSize:  '12px',
                    fontWeight:  600,
                    color:  '#000000'
                },
                
              },
              subtitle: {
                floating: true,
                offsetX: -7,
                offsetY: 400,
                text: '0%',
                style: {
                    fontSize:  '12px',
                    fontWeight:  600,
                    color:  '#000000'
                },
              },
            tooltip: {
                enabled: true
            },
            xaxis: {
                categories: [''],
                
            },
            yaxis: {
                max: 100,
            },
            fill: {
                colors: '#E90808',
                opacity: 0.9
            }
            },
            series: [{
                name: 'Error In %',
                data: [50]
            }]
      }
    }
    render() {
      return (
        <Chart options={this.state.options}
        series={this.state.series} 
        type="bar"
        height={400} />
      )
    }
  }

export default VerticalBarChart;