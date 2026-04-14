import React, { Component } from 'react'
import Chart from "react-google-charts";

class GoogleReactLineChart extends Component {
    render() {
        const data = [
            ["Years", "Sales", "Expenses", "Employee"],
            ["2016", 30, 25, 20],
            ["2017", 25, 35, 15],
            ["2018", 15, 40, 10],
            ["2019", 10, 10, 25],
            ["2020", 5, 0, 25]
        ];

        return (
            <Chart
                chartType="LineChart"
                width="100%"
                loader={<div>Loading Chart</div>}
                height="150px"
                data={data}

                options={{
                    // title: "Company Performance",
                    // hAxis: {
                    //     title: 'Time',
                    // },
                    // vAxis: {
                    //     title: 'Popularity',
                    // },
                    series: {
                        curveType: 'function'
                    },
                    legend: {
                        position: "right"
                    },
                }
                }
                legendToggle
            />

        )
    }
}

export default GoogleReactLineChart
