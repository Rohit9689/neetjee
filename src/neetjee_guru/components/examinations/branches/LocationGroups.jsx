import React, { Component } from 'react'
import SingleLocation from './SingleLocation';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

import { Card, Col } from 'react-bootstrap'

const FETCH_GLOBALS = gql`
  query($username: String!) {
    globals(username: $username){
        branchData{
            total_count
            branch_data{
                region
                count
            }
        }
        }
    }
`;

class LocationGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.LocationsData
        }
    }
    render() {
        const {
            data: { loading, globals, error }
        } = this.props;
        if (loading) return null;

        return (
            <React.Fragment>
                <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                    <Card as={Card.Body} className="border-0 shadow-sm">
                        <p className="location_name mb-2">Total Branches</p>
                        <h4 className="counts font-weight-bold">{globals.branchData.total_count}</h4>
                    </Card>
                </Col>
                {globals.branchData.branch_data.map(Data => (
                    <SingleLocation key=""
                        locations={Data.region}
                        counts={Data.count}
                    />))}
            </React.Fragment>
        )
    }
}

export default withRouter(compose(
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    username: Cookies.get("username")
                },
            })
        }))(LocationGroups));
