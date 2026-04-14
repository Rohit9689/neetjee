import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import './_navbars.scss';


class CustomPractiseExamNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultModalShow: false,
        }
    }
    render() {
        
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
                        <Nav >
                            {this.props.getStudentCustomPracticeQuestions != "" ? (
                                <Button variant="light" style={{ width: 180, borderRadius: 25 }} onClick={this.props.ParenthandleFormSubmit}>
                                    <i className="fas fa-stop text-danger mr-2" /> Exit Practise
                            </Button>
                            ) : ("")}
                        </Nav>
                       
                             <Nav className="mx-auto">
                             <h6 className="title text-muted mr-3">CUSTOM PRACTISE</h6>
                         </Nav>
                        
                       
                        <Nav className="ml-auto">
                            <div className="timecounter">
                                {/* <i className="fas fa-clock mr-2" /> Time Left : 2:35:48 */}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        )
    }
}

export default withRouter(CustomPractiseExamNavbar)
