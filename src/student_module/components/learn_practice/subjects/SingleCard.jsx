import React, { Component } from 'react'
import { Col, Card, Nav, Tab, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import AreaChart from './AreaChart';
import LineChart from './LineChart';


class SingleCard extends Component {
    render() {
        return (
            <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                <Card className="shadow-sm border-0 h-100">
                    <Card.Body className="p-2">
                        <Link to="/student/subject/topics">
                            <Card.Title><span>{this.props.id}</span> - {this.props.title}</Card.Title>
                            <Card.Text>Topics: <span>{this.props.topics}</span></Card.Text>
                        </Link>
                        <Tab.Container id="subject-tabs" defaultActiveKey="first">
                            <Nav variant="pills nav-fill" className="flex-row mt-3">
                                <Nav.Item className="graph">
                                    <Nav.Link eventKey="first"><i className="fal fa-chart-line" /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="learn">
                                    <Nav.Link eventKey="second"><i className="fal fa-book-reader" /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="practice">
                                    <Nav.Link eventKey="third"><i className="fal fa-file-invoice mr-2" /> <span>{this.props.practiceCount}</span></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="error">
                                    <Nav.Link eventKey="four"><i className="fal fa-file-search mr-2" /> <span>{this.props.errorCount}</span></Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="content">
                                        <h6 className="mb-0">{this.props.tabTitleOne}</h6>
                                        <AreaChart />
                                    </div>
                                    <div className="card-bottom dashboard">
                                        <p><Link to="/student/subject/chapter-status">{this.props.tabbottomTitleOne}</Link></p>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className="content">
                                        <h6 className="mb-0">{this.props.tabTitleTwo}</h6>
                                        <div className="card-box d-flex p-1">
                                            <Card className="border-primary w-100">
                                                <Card.Body className="p-2">
                                                    <div className="d-flex align-items-center">
                                                        <i className="text-primary fad fa-video fa-fw fa-2x mr-1" />
                                                        <div className="text-dark">Videos</div>
                                                    </div>
                                                    <div className="mt-4" style={{ fontSize: 12 }}>{this.props.availableVideos}</div>
                                                </Card.Body>
                                                <Card.Footer className="p-1">
                                                    <p>Watching <i className="ml-2 fal fa-long-arrow-right" /></p>
                                                </Card.Footer>
                                            </Card>
                                            <Card className="border-success w-100 ml-2">
                                                <Card.Body className="p-2">
                                                    <div className="d-flex align-items-center">
                                                        <i className="text-success fad fa-clipboard fa-fw fa-2x mr-1" />
                                                        <div className="text-dark">Revision <small>Material</small></div>
                                                    </div>
                                                    <div className="mt-2" style={{ fontSize: 12 }}>{this.props.availableMaterial}</div>
                                                </Card.Body>
                                                <Card.Footer className="p-1">
                                                    <p>Learning <i className="ml-2 fal fa-long-arrow-right" /></p>
                                                </Card.Footer>
                                            </Card>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <div className="content">
                                        <h6 className="mb-0">{this.props.tabTitleThree}</h6>
                                        <LineChart />
                                    </div>
                                    <div className="card-bottom practice">
                                        <p>{this.props.tabbottomTitleThree}</p>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="four">
                                    <div className="content">
                                        <h6 className="mb-0">{this.props.tabTitleFour}</h6>
                                        <Card as={Card.Body} className="mt-3 text-center">
                                            <p className="text-danger">Not Answered: 200</p>
                                            <p className="text-danger">Wrong Answered: 200</p>
                                            <Button variant="success" className="mt-2 right-answer">Corrected Answered: 100</Button>
                                        </Card>
                                    </div>
                                    <div className="card-bottom error">
                                        <p><Link to="/student/subject/start-error-exam">{this.props.tabbottomTitleFour}</Link></p>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col >
        )
    }
}

export default SingleCard
