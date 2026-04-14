import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import BreadcrumbHeading from '../../breadcrumbs/BreadcrumbHeading'

import './_promotestudent.scss'

class PromoteStudentSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breadcrumbsData: {
                Title: 'Promote Students'
            }
        }
    }

    render() {
        return (
            <div className="promote_student">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Link to="/settings/promote-students/promote-class">
                            <Card as={Card.Body} className="border-0 shadow-sm">
                                <div className="icon mb-3">
                                    <i className="fal fa-chart-line" />
                                </div>
                                <h6 className="counts font-weight-bold">Promote Class XI to XII</h6>
                            </Card>
                        </Link>
                    </Col>
                    <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                        <Link to="/settings/promote-students/promote-exit-class">
                            <Card as={Card.Body} className="border-0 shadow-sm">
                                <div className="icon mb-3">
                                    <i className="fal fa-external-link-alt" />
                                </div>
                                <h6 className="counts font-weight-bold">Exit Class XII Students</h6>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PromoteStudentSection
