import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import './_navbars.scss';


class StudentAssistentExamNavbar extends Component {
    constructor(props) {
        super(props)
        console.log("getStudentAssessmentQuestions", props.getStudentAssessmentQuestions);
        let totalExamCount = "";
        if (props.getStudentAssessmentQuestions[0].exam == 1) {
            // neet 60 sec
            totalExamCount = 60 * parseInt(props.getStudentAssessmentQuestions.length);
            //totalExamCount = 5;
        }
        else {
            //for mains 144sec
            //for adance 240 sec
            totalExamCount = 144 * parseInt(props.getStudentAssessmentQuestions.length);

        }

        console.log("totalExamCount", totalExamCount);
        this.state = {
            timerStatus: false,
            totalExamCount: totalExamCount
        }
    }
    minutesTimer = (data) => {
        var date = new Date(data * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        var t = hh + ":" + mm + ":" + ss;
        return t;
    }
    timeFunction = () => {
        console.log("tottime", this.state.timerStatus);
        if (this.state.timerStatus == false) {
            let totalExamCount = parseInt(this.state.totalExamCount) - 1;
            console.log("tottimestatus", totalExamCount);
            if (totalExamCount == 0) {
                this.setState({
                    timerStatus: true,
                    totalExamCount: totalExamCount
                });
                this.props.totTimeFunction();
            }
            else {
                this.setState({
                    totalExamCount: totalExamCount
                });
            }
        }
    }
    componentDidMount = () => {
        //console.log("this.state.totalExamCount123", this.state.totalExamCount);
        // if (this.state.totalExamCount == 0) {
        //     console.log("componentDidMounttotal");
        //     this.props.ParenthandleFormSubmit();
        // }
        this.timer = setInterval(() => {
            this.timeFunction();
        }, 1000)
    }
    render() {
        console.log("StudentAssistentExamNavbar", this.state);
        return (
            <Navbar bg="white" className="examtop-header header-top shadow-sm" expand="lg">
                <Container>
                    <div className="nav-brand">
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                    </div>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav >
                            {this.props.getPracticeQuestions != "" ? (
                                <Button variant="light" style={{ width: 180, borderRadius: 25 }} onClick={this.props.ParenthandleFormSubmit}>
                                    <i className="fas fa-pause text-danger mr-2" /> Complete Exam
                            </Button>
                            ) : ("")}
                        </Nav>
                        <Nav className="mx-auto">
                            <h6 className="title text-muted mr-3">STUDENT ASSESMENT TEST</h6>
                        </Nav>
                        <Nav className="ml-auto">
                            <div className="timecounter">
                                <i className="fas fa-clock mr-2" /> Time Left : {this.minutesTimer(this.state.totalExamCount)}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="ml-auto d-block d-xl-none d-lg-none text-right">
                        <h6 className="title text-muted">STUDENT ASSESMENT TEST</h6>
                        <div className="d-flex  align-items-center">
                            <Button variant="link text-dark text-decoration-none" className="p-0">
                                <i className="fas fa-pause text-danger mr-1" onClick={this.props.ParenthandleFormSubmit} /> Complete Exam
                            </Button>
                            <div className="timecounter ml-2">
                                <i className="fas fa-clock mr-1" /> Time Left :{this.minutesTimer(this.state.totalExamCount)}
                            </div>
                        </div>
                    </Nav>
                </Container>

            </Navbar>
        )
    }
}

export default withRouter(StudentAssistentExamNavbar)
