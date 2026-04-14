import React, { Component } from 'react'
import Select from 'react-select';
import { components } from 'react-select'
import { Modal, Form, Col, Button } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import { MultiSelect } from "react-multi-select-component";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class TeacherModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getuserlevel() {
        const newArray = [
            { value: "1", label: "DEAN" },
            { value: "2", label: "PRINCIPAL" },
            { value: "3", label: "TEACHER" }
        ];
        return newArray;
    }
    getClassValues(vals) {
       let classes = Array();
        for (let i = 0; i < vals.length; i++) {
            const classval = vals[i];
            classes.push({ label: classval.class, value: classval.id });
        }
        classes.unshift({ label: "ALL", value: "0" });
        return classes;
    }
    render() {
        console.log("teachermodal", this.state);
        //start subject data
        let subjectnewArray = [];
        this.props.globals.subjects.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.subject,
                }
                subjectnewArray.push(newObj);
            }

        })
        let subjectselectall = true;
        let subjectlabelledBy = "Select";
        let subjectdisableSearch = false;
        if (subjectnewArray.length > 0) {
            subjectselectall = true;
            subjectdisableSearch = false;
        }
        else {
            subjectdisableSearch = true;
            subjectselectall = false;
            subjectlabelledBy = "No Options"
        }
        //end subject data

        //start branch data
        let branchnewArray = [];
        this.props.globals.globalBranches.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.branch_name,
                }
                branchnewArray.push(newObj);
            }

        })
        let branchselectall = true;
        let branchlabelledBy = "Select";
        let branchdisableSearch = false;
        if (branchnewArray.length > 0) {
            branchselectall = true;
            branchdisableSearch = false;
        }
        else {
            branchdisableSearch = true;
            branchselectall = false;
            branchlabelledBy = "No Options"
        }
        //end branch data

        //start section data
        let sectionnewArray = [];
        this.props.globals.globalSections.map((item) => {
            if (item != undefined) {
                if (this.props.stateData.branch.includes(item.branch_id.toString())) {
                    const newObj = {
                        value: item.id,
                        label: item.section_name,
                    }
                    sectionnewArray.push(newObj);
                }

            }

        })
        let sectionselectall = true;
        let sectionlabelledBy = "Select";
        let sectiondisableSearch = false;
        if (sectionnewArray.length > 0) {
            sectionselectall = true;
            sectiondisableSearch = false;
        }
        else {
            sectiondisableSearch = true;
            sectionselectall = false;
            sectionlabelledBy = "No Options"
        }
        //end section data
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Faculty Updated successfully
                        </Form.Text>
                    ) : (
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError}
                            </Form.Text>
                        )}
                    <Form>
                        <Row>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectTeacherName">
                                <Form.Label className="text-uppercase"> Faculty Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="teacher_name"
                                    onChange={this.props.parenthandleInputChange}
                                    autoComplete="off"
                                    value={this.props.stateData.teacher_name}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.teacher_name}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectBranch">
                                <Form.Label className="text-uppercase">User Level<span className="text-danger">*</span></Form.Label>
                                <SelectDropDown
                                    stateData={this.props.stateData.userlevelvalue}
                                    handleChange={this.props.selecthandleInputChange}
                                    name="userlevel"
                                    options={this.getuserlevel()}
                                    placeholderName={'user level'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />

                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.branch}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectContact">
                                <Form.Label className="text-uppercase"> Password<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="Password"
                                    placeholder="********"
                                    onChange={this.props.parenthandleInputChange}
                                    autoComplete="off"
                                    name="password"
                                    value={this.props.stateData.password}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.password}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectEmail">
                                <Form.Label className="text-uppercase"> Email<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.props.parenthandleInputChange}
                                    autoComplete="off"
                                    value={this.props.stateData.email}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectContact">
                                <Form.Label className="text-uppercase"> Contact No<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Mobile No"
                                    name="contact_no"
                                    onChange={this.props.parenthandleInputChange}
                                    autoComplete="off"
                                    value={this.props.stateData.contact_no}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.contact_no}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectClass">
                                <Form.Label className="text-uppercase">Class{this.props.stateData.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <SelectDropDown
                                    stateData={this.props.stateData.classvalue}
                                    handleChange={this.props.selecthandleInputChange}
                                    name="class"
                                    options={this.getClassValues(this.props.globals.classes)}
                                    placeholderName={'Class'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.class}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectSubjects">
                                <Form.Label className="text-uppercase"> Subjects{this.props.stateData.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Subjects are selected.",
                                        "selectSomeItems": subjectlabelledBy
                                    }
                                    }
                                    disableSearch={subjectdisableSearch}
                                    hasSelectAll={subjectselectall}
                                    options={subjectnewArray}
                                    value={this.props.stateData.subjectvalue}
                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "subject")}
                                    labelledBy={"Select"}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.subject}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectBranch">
                                <Form.Label className="text-uppercase">Branch<span className="text-danger">*</span></Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Branches are selected.",
                                        "selectSomeItems": branchlabelledBy
                                    }
                                    }
                                    disableSearch={branchdisableSearch}
                                    hasSelectAll={branchselectall}
                                    options={branchnewArray}
                                    value={this.props.stateData.branchvalue}
                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "branch")}
                                    labelledBy={"Select"}
                                />

                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.branch}
                                </Form.Text>
                            </Form.Group>
                        
                            <Form.Group as={Col} lg={6} md={12} sm={12} controlId="SelectSection">
                                <Form.Label className="text-uppercase">Section{this.props.stateData.userlevel == "3" ? (<span className="text-danger">*</span>) : ("")}</Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Sections are selected.",
                                        "selectSomeItems": sectionlabelledBy
                                    }
                                    }
                                    disableSearch={sectiondisableSearch}
                                    hasSelectAll={sectionselectall}
                                    options={sectionnewArray}
                                    value={this.props.stateData.sectionvalue}
                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "section")}
                                    labelledBy={"Select"}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.section}
                                </Form.Text>
                            </Form.Group>
                         </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4">
                    <Button onClick={this.props.handleFormSubmit} className="btn btn-success text-uppercase" >

                        Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default (TeacherModalEdit);