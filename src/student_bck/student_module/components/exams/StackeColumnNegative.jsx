import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

class StackeColumnNegative extends Component {
    constructor(props) {
        super(props);
        
        let categories=[];
        let scoreOne=[];
        let scoreTwo=[];
        let scoreThree=[];
        props.subject_report.map((item)=>{
            if(item!=undefined){
                categories.push(item.subject);
                scoreOne.push(parseInt(item.correct));
                scoreTwo.push(parseInt(item.wrong));
                scoreThree.push(parseInt(item.not_answered));
            }

        });
        console.log("subject_report",categories, scoreOne, scoreTwo);
        this.state = {

            options: {
                chart: {
                    height: 220,
                    minumum:0,
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories:categories,
                    labels: {
                        style: {
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }
                    },
                },
                yAxis: {
                    // min: 0,
                    title: {
                        text: ''
                        // text: 'Total fruit consumption'
                    },

                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        borderWidth: 0,
                        borderRadius: 2,
                        dataLabels: {
                            enabled: true,
                        },
                    }
                },
                series: [{
                    name: 'correct',
                    data: scoreOne,
                    color: '#00B584',
                },
                {
                    name: 'Not answered',
                    data: scoreThree,
                    color: '#DF7E00',
                },
                 {
                    name: 'wrong',
                    data: scoreTwo,
                    color: '#E53935',
                }]
            }
        }
    }
    render() {

        return (
            <HighchartsReact highcharts={Highcharts} options={this.state.options} />
        )
    }
}

export default StackeColumnNegative
