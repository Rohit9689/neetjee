import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import { Card } from 'react-bootstrap';
const GET_DASHBOARDDATA = gql`
 query($params: DashboardInput) {
    getDashboardData(params: $params) {
        exam_graph{
            id
            subject
            timeseries{
                timestamp
                value
                practice_percentage
            }
        }
         
          }
        }
`;
class StudentScoreRangeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false
                    }
                },
                grid: {
                    show: false
                },
                stroke: {
                    width: [2, 2, 2, 2, 2]
                },
                xaxis: {
                    categories: ['0', '1-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-100'],
                    labels: {
                        show: true,
                        style: {
                            fontSize: '12px',
                            fontWeight: 400,
                        }
                    }
                },
                colors: ['#1B2430', '#A2B969', '#F4A00B', '#F36F13', '#0D95BC']
            },
            series: [
                {
                    name: "Over All",
                    data: [40, 25, 50, 49, 21, 90, 51, 30, 45, 15, 20]
                },
                {
                    name: "Botany",
                    data: [12, 54, 61, 32, 56, 81, 19, 25, 30, 25, 15]
                },
                {
                    name: "Zoology",
                    data: [12, 45, 55, 76, 41, 23, 43, 35, 40, 60, 20]
                },
                {
                    name: "Physics",
                    data: [10, 30, 40, 25, 60, 81, 19, 22, 15, 20, 3]
                },
                {
                    name: "Chemistry",
                    data: [5, 20, 30, 40, 60, 25, 15, 30, 40, 20, 2]
                }
            ]
        };
    }
    getOptions(series) {
        let options = {
            chart: {
                id: "basic-bar",
                toolbar: {
                    show: false,
                },
            },
            grid: {
                show: false
            },
            stroke: {
                width: [2, 2, 2],
            },
            xaxis: {
                categories: [],
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: 400,
                    }
                }
            },
            colors: ['#1B2430', '#A2B969', '#F4A00B', '#F36F13', '#0D95BC']
        };

        let timeseries = options.xaxis.categories;

        if (series.length > 0) {
            for (let i = 0; i < series[0].timeseries.length; i++) {
                timeseries.push(
                    //moment.unix(series[0].timeseries[i].timestamp).format("MMM DD")
                    series[0].timeseries[i].timestamp
                );
            }
        }

        options.xaxis.categories = timeseries;

        return options;
    }

    getSeries(series) {
        let data = Array();

        for (let i = 0; i < series.length; i++) {
            let timeseries = Array();
            for (let j = 0; j < series[i].timeseries.length; j++) {

                let pvalue = series[i].timeseries[j].practice_percentage;
                timeseries.push(pvalue);


            }

            data.push({ name: series[i].subject, data: timeseries });
        }

        return data;
    }
    render() {
        const getDashboardData = this.props.getDashboardData;
        const loading1 = getDashboardData.loading;
        const error1 = getDashboardData.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) {
            return (
                <React.Fragment>
                    <Card as={Card.Body} className="justify-content-center flex-row">
                        <div class="spinner-border text-primary text-center"></div>
                    </Card>
                </React.Fragment>
            )

        }
        else {
            return (
                <Chart
                    options={this.getOptions(getDashboardData.getDashboardData.exam_graph)}
                    series={this.getSeries(getDashboardData.getDashboardData.exam_graph)}
                    type="line"
                    width="100%"
                    height="200"
                />
            );
        }


    }
}




export default withRouter(
    compose(
        graphql(
            GET_DASHBOARDDATA,
            {
                options: props => ({
                    variables: {
                        params: {
                            exam_id: parseInt(props.stateData.eexamptype),
                            test: props.stateData.etesttype.toString(),
                            test_names: props.stateData.etestname,
                            class_ids: props.stateData.eclass.toString(),
                            category_ids: props.stateData.ecategory.toString(),
                            location_levels: props.stateData.elocation.toString(),
                            region_ids: props.stateData.eregion.toString(),
                            clusters: props.stateData.ecluster.toString(),
                            branch_ids: props.stateData.ebranch.toString(),
                            section_ids: props.stateData.esection,
                            start_time: props.stateData.startDate,
                            end_time: props.stateData.endDate,
                            institution_id: parseInt(Cookies.get("institutionid")),
                            username: Cookies.get("username")
                        }
                    },
                    fetchPolicy: 'network-only'
                }),
                name: "getDashboardData"
            }
        )
    )(StudentScoreRangeChart)
);