import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

class ColumnChartthee extends Component {
    constructor(props) {
        super(props);
        let CorrectData = [];
        let SkippedData = [];
        let ErrorData = [];
        let categories = [];
        if (props.ComplexityAnalysisData != undefined) {
            props.ComplexityAnalysisData.complexity_data.map((item) => {
                categories.push(item.complexity);
                CorrectData.push(item.correct);
                SkippedData.push(item.skipped);
                ErrorData.push(item.error);
            });

        }

        this.state = {

            series: [{
                name: 'Correct',
                data: CorrectData
            },
            {
                name: 'Skipped',
                data: SkippedData
            },
            {
                name: 'Error',
                data: ErrorData
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 250,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '85%',
                        endingShape: 'flat'
                    },
                },
                colors: ['#00C596', '#6D6D6D', '#F05D70'],
                legend: {
                    show: true,
                    position: 'top',
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                // yaxis: {
                //     show: false,
                //     // showAlways: true,

                // },

                xaxis: {
                    categories: categories,
                    labels: {
                        show: true,
                        rotate: 0,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false
                    },
                }
            }
        };
    }
    render() {
        return (
            <div id="columnChartthee">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={240} />
            </div>
        )
    }
}

export default ColumnChartthee
