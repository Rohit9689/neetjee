import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import './_navbars.scss'

class CusExamNavbar extends Component {

    constructor(props) {
        super(props);
        let totalExamCount = parseInt(props.exam_time) * parseInt(props.getPracticeQuestions.length);
        console.log("totalExamCount", totalExamCount);
        this.state = {
            timerStatus: false,
            totalExamCount: totalExamCount
        }

        
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
        if (this.state.totalExamCount == 0) {
            this.props.ParenthandleFormSubmit();
        }
        this.timer = setInterval(() => {
            this.timeFunction();
        }, 1000)
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

    render() {
        console.log("timecount", this.state.totalExamCount, this.props.getPracticeQuestions.length);
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
                        {/* <Nav className="mr-auto">
                            <Button variant="light" style={{ width: 150, borderRadius: 25 }}>
                                <i className="fas fa-pause text-danger mr-2" /> Stop Exam
                        </Button>
                        </Nav> */}
                        <Nav >
                            {this.props.getPracticeQuestions != "" ? (
                                <Button variant="light" style={{ width: 180, borderRadius: 25 }} onClick={this.props.ParenthandleFormSubmit}>
                                    <i className="fas fa-pause text-danger mr-2" /> Complete Exam
                            </Button>
                            ) : ("")}
                        </Nav>
                        <Nav className="mx-auto">
                            <h6 className="title text-muted">{this.props.getData.type}</h6>
                        </Nav>
                        <Nav className="ml-auto">
                            <div className="timecounter">
                                <i className="fas fa-clock mr-2" /> Time Left : {this.minutesTimer(this.state.totalExamCount)}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default withRouter(CusExamNavbar)
