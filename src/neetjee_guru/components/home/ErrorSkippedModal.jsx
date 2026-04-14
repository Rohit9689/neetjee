import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import TableSearchwithStudentResult from '../questioners/manage_questin_papers/TableSearchwithStudentResult';
import parse, { domToReact } from 'html-react-parser';
import SelectDropDown from '../selectdropdown/SelectDropDown'
import { components } from 'react-select';
import { withRouter } from "react-router-dom";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

class ErrorSkippedModal extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
        }
    }
    tablesectionData(data) {
        console.log("tablesectionData",data);
        let returnArray = [];
        data.map((mapitem) => {
            if (mapitem != undefined) {
                if (this.props.data == "skipped") {
                    if (mapitem.skipped_count > 0) {
                        const newObj = {
                            question: parse(mapitem.question),
                            subject: mapitem.subject_name,
                            chapter: mapitem.chapter_name,
                            error: mapitem.error_count,
                            skipped: mapitem.skipped_count
                        }
                        returnArray.push(newObj);
                    }
                }
                else if (this.props.data == "error") {
                    if (mapitem.error_count > 0) {
                        const newObj = {
                            question: parse(mapitem.question),
                            subject: mapitem.subject_name,
                            chapter: mapitem.chapter_name,
                            error: mapitem.error_count,
                            skipped: mapitem.skipped_count
                        }
                        returnArray.push(newObj);
                    }
                }
                else if (this.props.data == "errorskipped") {
                    const sum = parseInt(mapitem.error_count) + parseInt(mapitem.skipped_count);
                    if (sum > 0) {
                        const newObj = {
                            question: parse(mapitem.question),
                            subject: mapitem.subject_name,
                            chapter: mapitem.chapter_name,
                            error: mapitem.error_count,
                            skipped: mapitem.skipped_count,
                            errorskippedsum:parseInt(mapitem.error_count)+parseInt(mapitem.skipped_count)
                        }
                        returnArray.push(newObj);
                    }

                }


            }
        });

        return returnArray;
    }
    columnsFun() {
        let returnArray = [
            {
                dataField: "question",
                text: "Question ",
                sort: true
            },
            {
                dataField: "subject",
                text: "Subject ",
                sort: true
            },
            {
                dataField: "chapter",
                text: "Chapter ",
                sort: true
            }
        ];
        if (this.props.data == "error") {
            const newObj = {
                dataField: "error",
                text: "Error",
                sort: true
            }
            returnArray.push(newObj);
        }
        else if (this.props.data == "skipped") {
            const newObj = {
                dataField: "skipped",
                text: "Skipped",
                sort: true
            }
            returnArray.push(newObj);
        }
        else if (this.props.data == "errorskipped") {
            const newObj1 = {
                dataField: "error",
                text: "Error",
                sort: true
            }
            returnArray.push(newObj1);

            const newObj2 = {
                dataField: "skipped",
                text: "Skipped",
                sort: true
            }
            returnArray.push(newObj2);

            const newObj3 = {
                dataField: "errorskippedsum",
                text: "Error-Skipped",
                sort: true
            }
            returnArray.push(newObj3);
        }
        return returnArray;
    }
    defaultSortedFun() {
        let returnArray = [];
        if (this.props.data == "error") {
            const newObj = {
                dataField: "error",
                order: "desc"
            }
            returnArray.push(newObj);
        }
        else if (this.props.data == "skipped") {
            const newObj = {
                dataField: "skipped",
                order: "desc"
            }
            returnArray.push(newObj);
        }
        else if (this.props.data == "errorskipped") {
            // const newObj1 = {
            //     dataField: "skipped",
            //     order: "desc"
            // }
            // returnArray.push(newObj1);

            const newObj2 = {
                dataField: "errorskippedsum",
                order: "desc"
            }
            returnArray.push(newObj2);
        }
        console.log("returnArraysort", returnArray);
        return returnArray;
    }
    
    render() {
        
        
        if (this.props.geterrorskippeddata == undefined) {
            return null
        }
        let tablename = "";
        if (this.props.data == "error") {
            tablename = "Error Questions Data";
        }
        else if (this.props.data == "skipped") {
            tablename = "Skipped Questions Data";
        }
        else if (this.props.data == "errorskipped") {
            tablename = "Most Error and Skipped Questions Data";
        }
        return (
            <Modal {...this.props}
                size="xl" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4"
                //style={{ height: 522, overflowY: 'auto' }}
                >
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="studentTable">

                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Header className="bg-white  d-md-flex justify-content-between align-items-center">
                                    <Card.Title className="mb-0">{tablename}</Card.Title>
                                    <div className="split d-flex">
                                        <div className="first mr-2" style={{ width: 200 }}>
                                            <SelectDropDown
                                                stateData={this.props.stateData.subjectValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="subject"
                                                options={this.props.subjectfunction}
                                                placeholderName={'Subject'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </div>
                                        <div className="first mr-2" style={{ width: 200 }}>
                                            <SelectDropDown
                                                stateData={this.props.stateData.chapterValue}
                                                handleChange={this.props.selecthandleInputChange}
                                                name="chapter"
                                                options={this.props.chapterfunction}
                                                placeholderName={'Chapter'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </div>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <TableSearchwithStudentResult
                                    parentData={this.tablesectionData(this.props.geterrorskippeddata)}
                                        particlecolumns={this.columnsFun()}
                                        defaultSorted={this.defaultSortedFun()}
                                    tableHeading={this.props.stateData.TableHeaderData}
                                    name={tablename} 
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal >
        )
    }
}

export default withRouter(
    (ErrorSkippedModal)
);
