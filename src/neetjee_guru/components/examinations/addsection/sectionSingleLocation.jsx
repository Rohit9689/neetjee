import React, { Component } from 'react'
import { Card, Col } from 'react-bootstrap';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";


class SectionSingleLocation extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {


        console.log("SingleLocation", this.props);
        const globals = this.props.globals;
        const loading1 = globals.loading;
        const error1 = globals.error;

        if (loading1) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        return (
            <React.Fragment>
                <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                    <Card as={Card.Body} className="border-0 shadow-sm">
                        <p className="location_name mb-2">Total Sections</p>
                        <h4 className="counts font-weight-bold">{this.props.sectioncount}</h4>

                    </Card>
                </Col>
                {globals.globals.sectionData.section_data.map(Data => (
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Card as={Card.Body} className="border-0 shadow-sm">
                            <p className="location_name mb-2">{Data.section_category} - Category</p>
                            <h4 className="counts font-weight-bold">{Data.count}</h4>
                        </Card>
                    </Col>
                ))}
            </React.Fragment>
        )
    }
}

export default withRouter(compose(
    graphql(gql` 
    query($institution_id: Int!) {
    globals(institution_id: $institution_id){
        sectionData{
                    total_count
                    section_data{
                        section_category
                        count
                    }
                }
                regions{
                    id
                    region
                }
                classes{
                    id
                    class
                }
                globalBranches{
                    id
                    branch_name
                }
                globalSectionCategory{
                    id
                    section_category
                }
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    institution_id: props.insid
                },
          fetchPolicy: 'network-only'
            }), name: "globals"
        }))(SectionSingleLocation));
