import React, { Component } from 'react'
import { components } from 'react-select'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Image } from 'react-bootstrap'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { withRouter } from "react-router-dom";
class SingleCustomRevisionMaterialHeader extends Component {
    constructor(props) {
        super(props);
        let bgclass = "custom-revision-material-header py-3";
        if (props.getStudentRevisionMaterial.stateData.multichecked == true) {
            bgclass = "custom-revision-material-header py-3 bg-dark";
        }
        this.state = {
            bgclass: bgclass
        }
    }
    render() {
        return (
            <div className={this.state.bgclass}>
                <Container>
                    <Row>
                        <Col xl={12} lg={12} md={12}>
                            <div className="top_header">
                                <Link className="text-white" to={
                                    {
                                        pathname: "/student/revision-material-groups/custom-revision-materials",
                                        state: {
                                            multiStateData: this.props.getStudentRevisionMaterial.stateData.multiStateData,

                                            content_type: this.props.getStudentRevisionMaterial.stateData.contentType
                                        }
                                    }
                                }>View All</Link>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(SingleCustomRevisionMaterialHeader)
