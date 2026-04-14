import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

class ColumnChart extends Component {
    constructor(props) {
        super(props);
        console.log("props.subject_strength", props.subject_strength);
        let subjectstrength = [];
        let subjects = [];
        if (props.subject_strength != undefined) {

            props.subject_strength.map((item) => {
                subjectstrength.push(item.strength);
                subjects.push(item.subject);
            })
        }
        this.state = {

            series: [{
                name: 'Subject Strength - A',
                //data: [44, 55, 41, 67]
                data: subjectstrength
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
                colors: ['#077EE6'],
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
                    //categories: ['Botnay', 'Zoology', 'Chemistry', 'Physics'],
                    categories: subjects,
                },
                // legend: {
                //     position: 'right',
                //     offsetY: 40
                // },
                fill: {
                    opacity: 1
                },
                yaxis: {
                    show: true,
                    title: {
                        text: this.props.titleHeading.Title,
                        rotate: 90,
                        floating: false,
                        style: {
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#A7A7A7'
                        },
                    },
                }
            },


        };
    }
    render() {
        return (
            <div id="columnChart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={this.props.height} />
            </div>
        )
    }
}

export default ColumnChart
