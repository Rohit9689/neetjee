import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import './_navbars.scss';



class ExamHistoryNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        console.log("ExamHistoryNavbar", this.props);
        return (
            <Navbar bg="white" className="examtop-header header-top shadow-sm" expand="md">
                <Container>
                    <div className="nav-brand">
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="mr-auto" inline="true">
                            <Button variant="link text-dark"
                                onClick={this.props.history.goBack}
                            >Go Back</Button>
                        </div>

                        <Nav className="mx-auto">
                            <h6 className="title text-muted mr-3">Question and Answers View</h6>
                        </Nav>
                        <Nav className="ml-auto">
                            <div className="timecounter">
                                {/* <i className="fas fa-clock mr-2" /> Time Left : 2:35:48 */}
                            </div>
                            {this.props.locdata.htype != "history" ? (<React.Fragment>
                                {this.props.type == "pexam" ? (
                                    <Link
                                        to={{
                                            pathname: "/student/subject/practice-result",
                                            state: {
                                                sessionid: this.props.locdata.sessionid,
                                                type: this.props.locdata.type,
                                                getData: this.props.history.location.state.getData,
                                                stype: this.props.locdata.stype,
                                            }
                                        }}
                                        className="d-flex align-items-center rounded-pill btn px-5 py-2" style={{ background: 'transparent', color: '#212B65', border: '1px solid #212B65' }} >
                                        Analysis
                                    </Link>
                                ) :
                                    this.props.type == "customp" ? (<Link to={{
                                        pathname: "/student/subject/custompractice-result",
                                        state: {
                                            sessionid: this.props.locdata.sessionid,
                                            type: this.props.locdata.type,
                                            examtype: this.props.locdata.examtype,
                                            stype: this.props.locdata.stype,
                                        }
                                    }}
                                        className="d-flex align-items-center rounded-pill btn px-5 py-2" style={{ background: 'transparent', color: '#212B65', border: '1px solid #212B65' }} >
                                        Analysis
                                    </Link>) : (
                                            <Link to={{
                                                pathname: "/student/subject/exam-result",
                                                state: {
                                                    sessionid: this.props.locdata.sessionid,
                                                    type: this.props.locdata.type,
                                                    examtype: this.props.locdata.examtype,
                                                    stype: this.props.locdata.stype,
                                                }
                                            }}
                                                className="d-flex align-items-center rounded-pill btn px-5 py-2" style={{ background: 'transparent', color: '#212B65', border: '1px solid #212B65' }} >
                                                Analysis
                                            </Link>
                                        )}
                            </React.Fragment>) : ("")}


                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar>
        )
    }
}

export default withRouter(ExamHistoryNavbar);
