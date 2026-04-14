import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

class ColumnChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Subject Strength - A',
                data: [4, 4, 4, 4]
            }, {
                name: 'Subject Strength - B',
                data: [44, 55, 41, 67]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 200,
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#F44336', '#077EE6'],
                legend: {
                    show: false,
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '25%',
                      },
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: false
                },
                xaxis: {
                    // type: 'datetime',
                    categories: ['Botnay', 'Zoology', 'Chemistry', 'Physics'],
                },
                // legend: {
                //     position: 'right',
                //     offsetY: 40
                // },
                fill: {
                    opacity: 1
                }
            },


        };
    }
    render() {
        return (
            <div id="columnChart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={210} />
            </div>
        )
    }
}

export default ColumnChart
