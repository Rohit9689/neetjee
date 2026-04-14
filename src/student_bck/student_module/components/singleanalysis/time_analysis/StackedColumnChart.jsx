import React, { Component } from "react";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

class StackedColumnChart extends Component {
    constructor(props) {
        super(props);
        let categories = [];
        let dataintime = [];
        let errorintime = [];
        let lesstime = [];
        let errorlesstime = [];
        let overtime = [];
        let errorovertime = [];

        //console.log("StackedColumnChart", props.TimeAnalysisData.complexity_timewise_data);
        if (props.TimeAnalysisData != undefined) {
            if (props.type == "tc") {
                props.TimeAnalysisData.complexity_timewise_data.map((item) => {
                    categories.push(item.complexity);
                    item.time_data.map((item2) => {
                        dataintime.push(item2.intime);
                        errorintime.push(item2.intime_error);
                        lesstime.push(item2.lesstime);
                        errorlesstime.push(item2.lesstime_error);
                        overtime.push(item2.overtime);
                        errorovertime.push(item2.overtime_error);
                    });
                });
            }
            else if (props.type == "ts") {
                props.TimeAnalysisData.subject_timewise_data.map((item) => {
                    categories.push(item.subject);
                    item.time_data.map((item2) => {
                        dataintime.push(item2.intime);
                        errorintime.push(item2.intime_error);
                        lesstime.push(item2.lesstime);
                        errorlesstime.push(item2.lesstime_error);
                        overtime.push(item2.overtime);
                        errorovertime.push(item2.overtime_error);
                    });
                });
            }

        }


        this.state = {

            options: {
                chart: {
                    height: 200,
                    type: 'column'
                },

                title: {
                    text: ''
                },

                xAxis: {
                    min: 0,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    categories: categories,

                },

                yAxis: {
                    min: 0,
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,
                    title: ''

                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + '-' + this.y;

                    },
                },

                plotOptions: {
                    column: {
                        stacking: 'normal',
                        pointWidth: 20,
                        //gridLineWidth: 15
                    }
                },
                legend: {
                    enabled: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'In Time',
                    data: dataintime,
                    borderRadiusTopLeft: '20px',
                    borderRadiusTopRight: '20px',
                    stack: 'InTime',
                    color: '#01c595'

                }, {
                    name: 'Error',
                    data: errorintime,
                    stack: 'InTime',
                    color: '#ef5c6f',
                    showInLegend: false

                }, {
                    name: 'Less Time',
                    data: lesstime,
                    stack: 'LessTime',
                    borderRadiusTopLeft: '20px',
                    borderRadiusTopRight: '20px',
                    color: '#6d6d6d'
                }, {
                    name: 'Error',
                    data: errorlesstime,
                    stack: 'LessTime',
                    color: '#ef5c6f',
                    showInLegend: false
                }, {
                    name: 'Over Time',
                    data: overtime,
                    stack: 'OverTime',
                    borderRadiusTopLeft: '20px',
                    borderRadiusTopRight: '20px',
                    color: '#feae55'
                }, {
                    name: 'Error',
                    data: errorovertime,
                    stack: 'OverTime',
                    color: '#ef5c6f',
                    showInLegend: false
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

export default StackedColumnChart;