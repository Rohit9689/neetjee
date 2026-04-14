import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

export class ColumnChartTwo extends Component {
    constructor(props) {
        super(props);
        let correct = [];
        let wrong = [];
        let difficulty = [];

        if (props.complexity_strength != undefined) {

            props.complexity_strength.map((item) => {
                correct.push(item.correct);
                wrong.push(item.wrong);
                difficulty.push(item.difficulty);
            })
        }
        console.log("props.complexity_strength", wrong, correct, difficulty);
        this.state = {

            series: [{
                name: 'Correct',
                data: correct
            }, {
                name: 'Wrong',
                data: wrong
            }],
            // series: [{
            //     name: 'Net Profit',
            //     data: [87, 105, 91, 114]
            // }, {
            //     name: 'Revenue',
            //     data: [56, 58, 63, 66]
            // }],

            options: {
                chart: {
                    type: 'bar',
                    height: 250,
                    toolbar: {
                        show: false
                    },
                },
                colors: ['#38d2ad', '#F44336'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%'
                    },
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                grid: {
                    show: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: difficulty,
                    labels: {
                        show: true,
                        rotate: 0,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false
                    },
                },

                yaxis: {
                    show: true,
                    title: {
                        text: this.props.titleHeading.Title,
                        rotate: 90,
                        offsetY: 12,
                        floating: false,
                        //xaxis: 65,
                        style: {
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#A7A7A7'
                        },
                    },
                },

                fill: {
                    opacity: 1,
                    colors: ['#38d2ad', '#F44336']
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return " Complexity Strength"
                        }
                    }
                }
            },
        };
    }
    render() {
        return (
            <div id="ColumnChartTwo">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={180} />
            </div>
        )
    }
}

export default ColumnChartTwo
