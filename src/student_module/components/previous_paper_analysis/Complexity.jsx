import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Card, Accordion } from 'react-bootstrap'

import ComplexityInner from "./ComplexityInner";

class Complexity extends Component {
    render() {
        return (
            <Card className="mt-4 complexity">
                <Accordion.Header
                    as={Card.Header}
                    eventKey="1"
                    className="bg-white"
                    onClick={() => { this.props.topaccactiveFun("1") }}
                >
                    <Card.Title className="h6 mb-0 px-2">
                        {this.props.topdefaultActiveKey != "1" ? (
                            <i className="fa-fw far fa-plus-square mr-2" style={{ cursor: "pointer" }}></i>
                        ) : (
                                <i className="fa-fw far fa-minus-square mr-2" style={{ cursor: "pointer" }}></i>
                            )}

                                          Complexity Wise Weightage
                                    </Card.Title>
                </Accordion.Header>
                <Accordion.Body eventKey="1">

                    <Card.Body>
                        {this.props.topdefaultActiveKey == "1" ? (
                            <ComplexityInner
                                stateData={this.props.stateData}
                                actionsFormatter2={this.props.actionsFormatter2}
                                actionsFormatter3={this.props.actionsFormatter3}
                                handleModalFunction={this.props.handleModalFunction}
                                


                            />
                        ) : ("")}
                    </Card.Body>



                </Accordion.Body>
            </Card>
        )





    }
}
export default withRouter(Complexity);