import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

class LineChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            series: [{
                name: "Desktops",
                data: [10, 30, 25, 49, 62, 69, 90]
            }],
            options: {
                chart: {
                    height: 210,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: '#38d2ad',
                    width: 2,
                    dashArray: 0,
                },
                markers: {
                    size: 0,
                    colors: '#38d2ad',
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 6
                    }
                }
            },
        };

    }

    render() {
        return (
            <div id="lineChart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={210} />
            </div>
        )
    }
}

export default LineChart
