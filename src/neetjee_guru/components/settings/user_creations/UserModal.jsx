import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import { MultiSelect } from "react-multi-select-component";
// userTypes
const userTypes = [

    { value: "1", label: 'Operator' },
    { value: "2", label: 'Lecturer' }
];


const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class BranchModal extends Component {
    constructor(props) {
        super(props);
        //console.log("constructor", this.props);
        this.state = {
        };
    }
    // getSubjects() {
    //     console.log("getSubjects", this.props.globals.subjects);
    //     let getArray = [];
    //     for (let i = 0; i <= this.props.globals.subjects.length; i++) {
    //         let idata = this.props.globals.subjects[i];
    //         if (idata != undefined) {
    //             const newObj = {
    //                 value: idata.id,
    //                 label: idata.subject
    //             }
    //             getArray.push(newObj);
    //         }

    //     }
    //     return getArray;
    // }
    // getChapters = () => {
    //     let getArray = [];
    //     if (this.props.stateData.chapter.toString() != "0") {
    //         for (let i = 0; i <= this.props.globals.subjects.length; i++) {
    //             let idata = this.props.globals.subjects[i];
    //             if (idata != undefined) {
    //                 if (idata.id == this.props.stateData.subject) {
    //                     let chData = [];
    //                     if (this.props.stateData.class11 == "1") {
    //                         chData = idata.chapters.filter((a) => a.class == this.props.stateData.class11);
    //                     }
    //                     else if (this.props.stateData.class12 == "2") {
    //                         chData = idata.chapters.filter((a) => a.class == this.props.stateData.class12);
    //                     }
    //                     else if (this.props.stateData.class11 == "1" && this.props.stateData.class12 == "2") {
    //                         chData = idata.chapters;
    //                     }
    //                     if (chData.length > 0) {
    //                         const newObj1 = {
    //                             value: "0",
    //                             label: "ALL Chapters"
    //                         }
    //                         getArray.push(newObj1);
    //                     }
    //                     chData.map((chmapData) => {

    //                         const newObj = {
    //                             value: chmapData.id,
    //                             label: chmapData.chapter
    //                         }
    //                         getArray.push(newObj);
    //                     })

    //                 }
    //             }

    //         }
    //     }


    //     return getArray;
    // }
    getChaptersDefaultValues(data) {
        let getArray = [];
        let getValue = data.stateData.chapter;
        console.log("getValue", getValue.length);
        if (getValue.length > 0) {
            getValue.map((item, index) => {
                data.globals.subjects.map((subjects) => {
                    console.log("data.stateData.subject", data.stateData.subject);
                    if (subjects.id == data.stateData.subject) {
                        subjects.chapters.map((chmapdata) => {
                            if (chmapdata.id == item) {
                                //console.log("ticke");
                                const newObj = {
                                    value: chmapdata.id,
                                    label: chmapdata.chapter
                                }
                                getArray.push(newObj);
                            }
                        })
                    }

                })
            })
        }
        else {
            getArray = [];
        }
        console.log("getArray", getArray);

        return getArray;
    }

    render() {
        //console.log("BranchModal", this.props);
        //Get chapters
        let getArray = [];
        console.log("props subjects", this.props.globals.subjects);
        if (this.props.stateData.chapter.toString() != "0") {
            for (let i = 0; i <= this.props.globals.subjects.length; i++) {
                let idata = this.props.globals.subjects[i];
                if (idata != undefined) {
                    console.log("this.props.stateData.subject", this.props.stateData.subject);
                    this.props.stateData.subject.map((submap) => {
                        if (submap == idata.id) {
                            let chData = [];
                            if (this.props.stateData.class11 != "" && this.props.stateData.class12 != "") {
                                chData = idata.chapters;
                            }
                            else {
                                if (this.props.stateData.class11 == "1") {
                                    chData = idata.chapters.filter((a) => a.class == this.props.stateData.class11);
                                }
                                if (this.props.stateData.class12 == "2") {
                                    chData = idata.chapters.filter((a) => a.class == this.props.stateData.class12);
                                }
                            }
                            chData.map((chmapData) => {

                                const newObj = {
                                    value: chmapData.id,
                                    label: chmapData.chapter
                                }
                                getArray.push(newObj);
                            })

                        }
                    });

                }

            }
        }
        let chapterselectall = true;
        let chapterlabelledBy = "Select";
        let chapterdisableSearch = false;
        if (getArray.length > 0) {
            chapterselectall = true;
            chapterdisableSearch = false;
        }
        else {
            chapterdisableSearch = true;
            chapterselectall = false;
            chapterlabelledBy = "No Options"
        }
        //End chapters

        //start subjects
        let getSubjectArray = [];
        for (let i = 0; i <= this.props.globals.subjects.length; i++) {
            let idata = this.props.globals.subjects[i];
            if (idata != undefined) {
                const newObj = {
                    value: idata.id,
                    label: idata.subject
                }
                getSubjectArray.push(newObj);
            }

        }

        let subjectselectall = true;
        let subjectlabelledBy = "Select";
        let subjectdisableSearch = false;
        if (getSubjectArray.length > 0) {
            subjectselectall = true;
            subjectdisableSearch = false;
        }
        else {
            subjectdisableSearch = true;
            subjectselectall = false;
            subjectlabelledBy = "No Options"
        }
        //end subject

        return (
            <Modal {...this.props}
                show={this.props.stateData.modalShow}
                onHide={(e) => this.props.onHide1(e)}
                //show={this.state.modalShow} 
                //onHide={() => this.setState({ modalShow: false })}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-success">
                            User Saved successfully
                        </Form.Text>
                    ) : (
                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.submitError}
                        </Form.Text>
                    )}
                    <Form className="user-create-form">
                        <Row>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formFullname">
                                    <Form.Label column md="4" sm="4">
                                        Full Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Full Name"
                                            onChange={this.props.ParenthandleInputChange}
                                            autoComplete="off"
                                            name="fullname"
                                            value={this.props.stateData.fullname}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.fullname}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formUserName">
                                    <Form.Label column md="4" sm="4">
                                        User Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter User Name"
                                            onChange={this.props.ParenthandleInputChange}
                                            autoComplete="off"
                                            name="username"
                                            value={this.props.stateData.username}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.username}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column md="4" sm="4">
                                        Email <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            onChange={this.props.ParenthandleInputChange}
                                            autoComplete="off"
                                            name="email"
                                            value={this.props.stateData.email}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.email}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formPassWord">
                                    <Form.Label column md="4" sm="4">
                                        Password <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control
                                            type="Password"
                                            placeholder="Password"
                                            onChange={this.props.ParenthandleInputChange}
                                            autoComplete="off"
                                            name="password"
                                            value={this.props.stateData.password}
                                        />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.password}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formMobile">
                                    <Form.Label column md="4" sm="4">
                                        Mobile No. <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Control
                                            type="text"
                                            placeholder="Mobile"
                                            onChange={this.props.ParenthandleInputChange}
                                            autoComplete="off"
                                            name="mobile"
                                            value={this.props.stateData.mobile} />
                                        <Form.Text className="form-text text-danger">
                                            {this.props.stateData.formErrors.mobile}
                                        </Form.Text>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formUserType">
                                    <Form.Label column md="4" sm="4">
                                        User Type <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <SelectDropDown
                                            stateData={this.props.stateData.usertypevalue}
                                            handleChange={this.props.parentselecthandleInputChange}
                                            name="usertype"
                                            options={userTypes}
                                            placeholderName={'User Type'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formClass">
                                    <Form.Label column md="4" sm="4">
                                        Class <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <Form.Check type="checkbox" id="checkboxXI" custom inline>
                                            <Form.Check.Input
                                                type="checkbox"
                                                name="class11"
                                                value=""
                                                checked={this.props.stateData.checked1}
                                                onChange={this.props.ParenthandleInputChange}
                                            />
                                            <Form.Check.Label htmlFor="checkboxXI">XI</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check type="checkbox" id="checkboxXII" custom inline>
                                            <Form.Check.Input
                                                type="checkbox"
                                                name="class12"
                                                value=""
                                                checked={this.props.stateData.checked2}
                                                onChange={this.props.ParenthandleInputChange}
                                            />
                                            <Form.Check.Label htmlFor="checkboxXII">XII</Form.Check.Label>
                                        </Form.Check>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formSubjects">
                                    <Form.Label column md="4" sm="4">
                                        Subjects <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <MultiSelect
                                            overrideStrings={{
                                                "allItemsAreSelected": "All Subjects are selected.",
                                                "selectSomeItems": subjectlabelledBy
                                            }
                                            }
                                            disableSearch={subjectdisableSearch}
                                            hasSelectAll={subjectselectall}
                                            options={getSubjectArray}
                                            value={this.props.stateData.subjectvalue}
                                            onChange={(e) => this.props.phandleMultipleSelectInputChange(e, "subject")}
                                            labelledBy={"Select"}
                                        />
                                        {/* <SelectDropDown
                                            stateData={this.props.stateData.subjectValue}
                                            handleChange={this.props.parentselecthandleInputChange}
                                            name="subject"
                                            options={this.getSubjects()}
                                            placeholderName={'Subjects'}
                                            dropdownIndicator={{ DropdownIndicator }} /> */}
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col xl={6} lg={6} md={12} sm={12}>
                                <Form.Group as={Row} controlId="formChapter">
                                    <Form.Label column md="4" sm="4">
                                        Chapter <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col md="8" sm="8">
                                        <MultiSelect
                                            overrideStrings={{
                                                "allItemsAreSelected": "All Chapters are selected.",
                                                "selectSomeItems": chapterlabelledBy
                                            }
                                            }
                                            disableSearch={chapterdisableSearch}
                                            hasSelectAll={chapterselectall}
                                            options={getArray}
                                            value={this.props.stateData.chaptervalue}
                                            onChange={(e) => this.props.phandleMultipleSelectInputChange(e, "chapter")}
                                            labelledBy={"Select"}
                                        />
                                    </Col>

                                    {/* <Col md="8" sm="8">
                                        <Select maxMenuHeight={150}

                                            value={this.getChaptersDefaultValues(this.props)}
                                            name="chapter"
                                            isMulti
                                            options={this.getChapters()}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.props.phandleMultipleSelectInputChange}
                                        />
                                    </Col> */}
                                </Form.Group>
                            </Col>
                            <Col x={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }} md={{ span: 8, offset: 4 }} sm={12}>
                                <Button
                                    className="btn btn-green px-5"
                                    onClick={this.props.parenthandleFormSubmit}
                                    disabled={this.props.loading}
                                >{this.props.loading ? "Saving..." : "Save"}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BranchModal;
