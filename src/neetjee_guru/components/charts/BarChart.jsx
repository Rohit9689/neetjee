import React, { Component } from 'react'
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(...registerables);



class BarChart extends Component {
    constructor(props) {
        super(props)
        console.log("result_graph", props.result_graph);
        let label = [];
        let data = [];
        props.result_graph.map((item) => {
            if (item != undefined) {
                const newObj = item.limit;
                const newObjData = item.percentage
                label.push(newObj);
                data.push(parseInt(newObjData));
            }

        })
        this.state = {
            label: label,
            data: data
        }
    }
    render() {
        const chartData = {
            //labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
            labels: this.state.label,
            datasets: [
                {
                    label: 'Percentage',
                    backgroundColor: ['rgba(20, 115, 230, 0.8)',
                        'rgba(184, 179, 59, 0.8)',
                        'rgba(111, 144, 75, 0.8)',
                        'rgba(154, 104, 155, 0.8)',
                        'rgba(214, 92, 92, 0.8)',
                        'rgba(40, 144, 144, 0.8)',

                        'rgba(229, 146, 95, 0.8)',
                        'rgba(165, 199, 63, 0.8)',
                        'rgba(223, 182, 58, 0.8)',
                        'rgba(166, 196, 220, 0.8)',
                    ],
                    borderColor: ['rgba(20, 115, 230, 0.8)',
                        'rgba(184, 179, 59, 0.8)',
                        'rgba(111, 144, 75, 0.8)',
                        'rgba(154, 104, 155, 0.8)',
                        'rgba(214, 92, 92, 0.8)',
                        'rgba(40, 144, 144, 0.8)',

                        'rgba(229, 146, 95, 0.8)',
                        'rgba(165, 199, 63, 0.8)',
                        'rgba(223, 182, 58, 0.8)',
                        'rgba(166, 196, 220, 0.8)',
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    //data: [100, 95, 75, 43, 30, 30, 28, 25, 15, 10, 0]
                    data: this.state.data
                }
            ]
        };
        return (
            <div className="charts">
                <Bar
                    data={chartData}
                    // width={100}
                    height={330}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Percentage Of Students',
                            fontSize: 14,
                            position: 'left',
                            rotate: '90deg'
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        )
    }
}

export default BarChart
