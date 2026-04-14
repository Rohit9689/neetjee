import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Card, Accordion } from 'react-bootstrap'
import QuestionTypeComplexityInner from "./QuestionTypeComplexityInner";

class QuestionTypeComplexity extends Component {

    render() {

        return (
            <Card className="mt-4 questiontype-wise">
                <Accordion.Toggle as={Card.Header} eventKey="2" className="bg-white"
                    onClick={() => { this.props.topaccactiveFun("2") }}>
                    <Card.Title className="h6 mb-0 px-2">
                        {this.props.topdefaultActiveKey != "2" ? (
                            <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                        ) : (
                                <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                            )}

                                    Question Type Wise Weightage</Card.Title>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        {this.props.topdefaultActiveKey == "2" ? (
                            <QuestionTypeComplexityInner
                                actionsFormatter2={this.props.actionsFormatter2}
                                actionsFormatter3={this.props.actionsFormatter3}
                                handleModalFunction={this.props.handleModalFunction}
                                stateData={this.props.stateData} />
                        ) : ("")}

                    </Card.Body>
                </Accordion.Collapse>

            </Card>
        )
    }
}
export default withRouter(QuestionTypeComplexity);