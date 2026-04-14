import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import TextEditor from '../../../../neetjee_guru/components/text_editor/TextEditor';
import Select from 'react-select';
import parse, { domToReact } from "html-react-parser";
import { MultiSelect } from "react-multi-select-component";
class SingleNoteModal extends Component {
    constructor(props) {
        super(props)

    }

    decodefun(data) {
        var decdata = decodeURIComponent(data);
        // decdata = decdata.replace(/font-family/g, "ff");

        return decdata;
    }
    render() {
        console.log("SingleNoteModal", this.props);
        //start get test data
        let testnewArray = [];
        this.props.studentGlobals.tags.map((item) => {
            if (item != undefined) {
                if (item.type == "bookmark") {
                    const obj = {
                        value: item.id,
                        label: item.tag,
                    };
                    testnewArray.push(obj);
                }

            }

        })
        let testselectall = true;
        let testlabelledBy = "Select";
        let testdisableSearch = false;
        if (testnewArray.length > 0) {
            testselectall = true;
            testdisableSearch = false;
        }
        else {
            testdisableSearch = true;
            testselectall = false;
            testlabelledBy = "No Options"
        }
        //end get test data
        return (
            <Modal {...this.props}
                size="sm" aria-labelledby="example-modal-sizes-title-lg">
                 <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-lg">Bookmarks</Modal.Title>
                        <div onClick={() => { this.props.onHide() }} size="sm" variant="text-decoration-none text-dark link" style={{cursor: "pointer"}} className="py-2">
                            <i className="far fa-times" />
                        </div>
                    </Modal.Header>


                <Modal.Body className="p-4" style={{ height: 200 }}
                >
                    <Form>
                        {this.props.stateData.currentStep == 5 ? (
                            <Form.Text className="form-text text-danger">
                                Bookmark saved successfully
                            </Form.Text>
                        ) : (
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.submitError3}
                                </Form.Text>
                            )}
                        <Form.Row>

                            <Form.Group 
                                as={Col}
                                lg={12}
                                md={12}
                                sm={12} 
                                controlId="SelectTag">
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Tags are selected.",
                                        "selectSomeItems": testlabelledBy
                                    }
                                    }
                                    disableSearch={testdisableSearch}
                                    hasSelectAll={testselectall}
                                    options={testnewArray}
                                    value={this.props.stateData.btagsvalue}
                                    onChange={(e) =>this.props.handleMutipleInputChange(e,"btags")}
                                    labelledBy={"Select"}
                                />


                            </Form.Group>
                            <Col
                                lg={12}
                                md={12}
                                sm={12} className="text-center">
                                <span>or</span>
                            </Col>
                            <Form.Group as={Col}
                                lg={12}
                                md={12}
                                sm={12} controlId="NewTag2">
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Enter New Tag"
                                    name="bnewtag"
                                    value={this.props.stateData.bnewtag}
                                    onChange={this.props.handleInputChange}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4 py-0 d-block">
                    <Row className="text-center">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">

                        <Button

                        onClick={() => { this.props.onHide()}}
                        size="sm" variant="text-decoration-none text-dark link" className="py-2">
                        Cancel
                        </Button>

                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button
                                onClick={(e) => this.props.bookhandleFormSubmit(this.props.removecontypId, this.props.custonid)}
                                size="sm" variant="text-decoration-none text-dark link" className="py-2">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SingleNoteModal
