import React, { Component } from 'react'
import Chart from "react-google-charts";

class GoogleChartOne extends Component {
    render() {
        return (
            <Chart
                width={'100%'}
                height={'150px'}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Year', 'Sales'],
                    ['2013', 1000],
                    ['2014', 1170],
                    ['2015', 660],
                    ['2016', 1030],
                ]}
                options={{
                    // title: 'Company Performance',
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    // For the legend to fit, we make the chart area smaller
                    chartArea: { width: '100%', height: '150px' },
                    // lineWidth: 25
                    series: {
                        1: { curveType: 'function' }
                    },
                    legend: {
                        position: "bottom"
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}

export default GoogleChartOne
