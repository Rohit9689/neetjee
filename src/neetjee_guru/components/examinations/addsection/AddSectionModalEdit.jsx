import React, { Component } from 'react'
import { Row, Col, Modal, Card, Button, Form } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import { components } from 'react-select'

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class AddSectionModalEdit extends Component {
    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        this.state = {
        };
    }
    getbranches(data) {
        let getArray = [];
        data.map((mapData) => {
            const newObj = {
                value: mapData.id,
                label: mapData.branch_name
            }
            getArray.push(newObj);

        })
        return getArray;
    }
    getcategaries(data) {

        let getArray = [];
        data.map((mapData) => {
            const newObj = {
                value: mapData.id,
                label: mapData.category_name
            }
            getArray.push(newObj);

        })
        return getArray;

    }
    render() {
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Section</Modal.Title>
                </Modal.Header>
                {/* <Modal.Header className="d-flex justify-content-between">
                    <Modal.Title>Add New Section</Modal.Title>
                    <i class="fas fa-times" style={{ cursor: 'pointer' }} />
                </Modal.Header> */}
                <Modal.Body className="p-4">
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Section Updated successfully
                                                </Form.Text>
                    ) : (

                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError}
                            </Form.Text>
                        )}
                    <Form>
                        <Row>
                            <Col lg={6} md={12} sm={12}>
                                <Card as={Card.body} className="h-100 p-4">
                                    <Form.Group controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Branch Name</Form.Label>
                                        <SelectDropDown
                                            name="branch"
                                            stateData={this.props.stateData.branchvalue}
                                            handleChange={this.props.parentselecthandleInputChange}
                                            options={this.getbranches(this.props.globals.globalBranches)
                                            }
                                            placeholderName={'BRANCH'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Class Name</Form.Label>
                                        <SelectDropDown
                                            name="category"
                                            stateData={this.props.stateData.categoryvalue}
                                            handleChange={this.props.parentselecthandleInputChange}
                                            options={this.getcategaries(this.props.getCategories)
                                            }
                                            placeholderName={'Category'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Form.Group> */}
                                    <Form.Group controlId="SelectBranch">
                                        <Form.Label className="text-uppercase">Category</Form.Label>
                                        <SelectDropDown
                                            name="category"
                                            stateData={this.props.stateData.categoryvalue}
                                            handleChange={this.props.parentselecthandleInputChange}
                                            options={this.getcategaries(this.props.getCategories)
                                            }
                                            placeholderName={'CATEGORY'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="SelectPrinciple" className="mt-4">
                                        <Form.Label className="text-uppercase">
                                            Package Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="package"
                                            autoComplete="off"
                                            value={this.props.stateData.package}
                                            placeholderName={'PACKAGE'}
                                            readonly={"readonly"}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="SelectPrinciple" className="mt-4">
                                        <Form.Label className="text-uppercase">Section Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="SECTION"
                                            name="section"
                                            onChange={this.props.parenthandleInputChange}
                                            autoComplete="off"
                                            value={this.props.stateData.section}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.section}
                                        </Form.Text>
                                    </Form.Group>
                                </Card>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <Card as={Card.body} className="h-100 p-4">
                                    <Row className="px-2 mb-2 justify-content-between">
                                        <Form.Label className="text-uppercase">
                                            Complexity
                    </Form.Label>
                                        <Form.Label className="text-uppercase">%</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="InputDifficulty">
                                            <Form.Control
                                                type="text"
                                                placeholder="HIGH DIFFICULTY"
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="InputDifficultyValue">
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={this.props.stateData.high_difficult}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="InputDifficulty">
                                            <Form.Control
                                                type="text"
                                                placeholder="DIFFICULTY"
                                                disabled
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="InputDifficultyValue">
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={this.props.stateData.difficult}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="InputModerate">
                                            <Form.Control
                                                type="text"
                                                placeholder="MODERATE"
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="InputModerateVAlue">
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={this.props.stateData.moderate}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="InputEasy">
                                            <Form.Control type="text" placeholder="EASY" disabled />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="InputEasyValue">
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={this.props.stateData.easy}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4">
                    <Button
                        className="btn btn-success text-uppercase"
                        onClick={this.props.parenthandleFormSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddSectionModalEdit;
