import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { components } from 'react-select'
import Select from 'react-select';
import { Row, Col, Card, Form, Modal, Button, Image } from 'react-bootstrap';
import SelectDropDown from '../../selectdropdown/SelectDropDown';
import { MultiSelect } from "react-multi-select-component";
import TextEditor from '../../text_editor/TextEditor';
// userTypes
const userTypes = [

    { value: 1, label: 'Operator' },
    { value: 2, label: 'Lecturer' }
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
    getClasses() {
        let returnArray = [];

        const newObj = {
            value: "0",
            label: "Select All"
        }
        returnArray.push(newObj);
        this.props.globals.classes.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.class
                }
                returnArray.push(newObj);
            }
        });
        return returnArray;
    }
    // getBranches() {
    //     let returnArray = [];
    //     this.props.globals.globalBranches.map((item) => {
    //         if (item != undefined) {
    //             const newObj = {
    //                 value: item.id,
    //                 label: item.branch_name
    //             }
    //             returnArray.push(newObj);
    //         }
    //     });
    //     if (returnArray.length > 0) {
    //         this.setState({ branchselectall: true });
    //     }
    //     else {
    //         this.setState({ branchselectall: false });
    //     }
    //     return returnArray;
    // }
    // getSections() {
    //     let newArray = [];
    //     let sections = [];
    //     if (this.props.stateData.branch.length > 0 || this.props.stateData.category.length != "") {
    //         sections = this.props.globals.globalSections;
    //         if (this.props.stateData.branch.length > 0) {
    //             let find = sections.find((item) => this.props.stateData.branch.includes(item.branch_id.toString()));
    //             console.log("findfindfind", find);
    //             //if (find != undefined) {
    //             sections = sections.filter((item) => this.props.stateData.branch.includes(item.branch_id.toString()));
    //             //}
    //             console.log("findfindfindsections", sections);
    //         }
    //         if (this.props.stateData.category.length > 0) {
    //             sections = sections.filter((item) => item.category_id == this.props.stateData.category);
    //         }
    //         sections.map((secmap) => {
    //             if (secmap != undefined) {
    //                 const newObj = {
    //                     value: secmap.id,
    //                     label: secmap.section_name
    //                 }
    //                 newArray.push(newObj);

    //             }
    //         })


    //     }
    //     if (newArray.length > 0) {
    //         this.setState({ sectionselectall: true });
    //     }
    //     else {
    //         this.setState({ sectionselectall: false });
    //     }
    //     return newArray;
    // }
    getCategories() {
        let returnArray = [];
        this.props.globals.globalCategories.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.category_name
                }
                returnArray.push(newObj);
            }
        });
        return returnArray;
    }



    render() {
        // start sections Data for multiple select
        let newArray = [];
        let sections = [];
        if (this.props.stateData.branch.length > 0 || this.props.stateData.category.length > 0) {
            sections = this.props.globals.globalSections;
            if (this.props.stateData.branch.length > 0) {
                let find = sections.find((item) => this.props.stateData.branch.includes(item.branch_id.toString()));
                console.log("findfindfind", find);
                //if (find != undefined) {
                sections = sections.filter((item) => this.props.stateData.branch.includes(item.branch_id.toString()));
                //}
                console.log("findfindfindsections", sections);
            }
            // if (this.props.stateData.category.length > 0) {
            //     sections = sections.filter((item) => item.category_id == this.props.stateData.category);
            // }

            if (this.props.stateData.category.length > 0) {
                // let find = sections.find((item) => this.props.stateData.category.includes(item.category_id.toString()));
                // console.log("findfindfind", find);

                sections = sections.filter((item) => this.props.stateData.category.includes(item.category_id.toString()));

                console.log("findfindfindsections", sections);
            }
            sections.map((secmap) => {
                if (secmap != undefined) {
                    const newObj = {
                        value: secmap.id,
                        label: secmap.section_name
                    }
                    newArray.push(newObj);

                }
            })


        }
        let sectionselectall = true;
        let secdisableSearch = false;
        let seclabelledBy = "Select";
        if (newArray.length > 0) {
            sectionselectall = true;
            secdisableSearch = false;
        }
        else {
            sectionselectall = false;
            secdisableSearch = true;
            seclabelledBy = "No Options";
        }
        // end sections Data for multiple 

        // start branches Data for multiple select
        let returnArray = [];
        this.props.globals.globalBranches.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.branch_name
                }
                returnArray.push(newObj);
            }
        });
        let branchselectall = true;
        let branchlabelledBy = "Select";
        let branchdisableSearch = false;
        if (returnArray.length > 0) {
            branchselectall = true;
            branchdisableSearch = false;
        }
        else {
            branchdisableSearch = true;
            branchselectall = false;
            branchlabelledBy = "No Options"
        }

        // end branches Data for multiple select

        // start category Data for multiple select
        let categoryreturnArray = [];
        this.props.globals.globalCategories.map((item) => {
            if (item != undefined) {
                const newObj = {
                    value: item.id,
                    label: item.category_name
                }
                categoryreturnArray.push(newObj);
            }
        });
        let categoryselectall = true;
        let categorylabelledBy = "Select";
        let categorydisableSearch = false;
        if (categoryreturnArray.length > 0) {
            categoryselectall = true;
            categorydisableSearch = false;
        }
        else {
            categorydisableSearch = true;
            categoryselectall = false;
            categorylabelledBy = "No Options"
        }

        // end category Data for multiple select

        return (
            <Modal {...this.props}
                show={this.props.stateData.modalShow}
                onHide={(e) => this.props.onHide1(e)}
                //show={this.state.modalShow} 
                //onHide={() => this.setState({ modalShow: false })}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Send Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {this.props.stateData.currentStep == 5 ? (
                        <Form.Text className="form-text text-danger">
                            Notification Saved successfully
                        </Form.Text>
                    ) : (
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError}
                            </Form.Text>
                        )}
                    <Form className="user-notify-form">

                        <Row>
                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formClass">


                                <Form.Label >
                                    Class <span className="text-danger">*</span>
                                </Form.Label>
                                <SelectDropDown
                                    stateData={this.props.stateData.classnamevalue}
                                    handleChange={this.props.parentselecthandleInputChange}
                                    name="classname"
                                    options={this.getClasses()}
                                    placeholderName={'Class'}
                                    dropdownIndicator={{ DropdownIndicator }} />

                            </Form.Group>
                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formBranch">


                                <Form.Label >
                                    Branch <span className="text-danger">*</span>
                                </Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Branches are selected.",
                                        "selectSomeItems": branchlabelledBy
                                    }
                                    }
                                    disableSearch={branchdisableSearch}
                                    hasSelectAll={branchselectall}
                                    options={returnArray}
                                    value={this.props.stateData.branchvalue}
                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "branch")}
                                    labelledBy={"Select"}
                                />

                            </Form.Group>
                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formCategory">


                                <Form.Label >
                                    Category <span className="text-danger">*</span>
                                </Form.Label>
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Categories are selected.",
                                        "selectSomeItems": categorylabelledBy
                                    }
                                    }
                                    disableSearch={categorydisableSearch}
                                    hasSelectAll={categoryselectall}
                                    options={categoryreturnArray}
                                    value={this.props.stateData.categoryvalue}
                                    onChange={(e) => this.props.handleMultipleSelectInputChange(e, "category")}
                                    labelledBy={"Select"}
                                />

                            </Form.Group>
                            {this.props.stateData.branch.length > 0 || this.props.stateData.category.length != "" ? (
                                <Form.Group as={Col}
                                    lg={6}
                                    md={12}
                                    sm={12} controlId="formSection">


                                    <Form.Label >
                                        Section <span className="text-danger">*</span>
                                    </Form.Label>
                                    <MultiSelect
                                        overrideStrings={{
                                            "allItemsAreSelected": "All Sections are selected.",
                                            "selectSomeItems": seclabelledBy
                                        }
                                        }
                                        disableSearch={secdisableSearch}
                                        hasSelectAll={sectionselectall}
                                        options={newArray}
                                        value={this.props.stateData.sectionvalue}
                                        onChange={(e) => this.props.handleMultipleSelectInputChange(e, "section")}
                                        labelledBy={"Select"}
                                    />

                                </Form.Group>
                            ) : ("")}

                            <Form.Group as={Col}
                                lg={12}
                                md={12}
                                sm={12} controlId="formTitle">


                                <Form.Label >
                                    Title <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    onChange={this.props.ParenthandleInputChange}
                                    autoComplete="off"
                                    name="title"
                                    value={this.props.stateData.title}
                                />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.title}
                                </Form.Text>

                            </Form.Group>
                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formMessage">


                                <Form.Label >
                                    Message <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control as="textarea"
                                    rows="2"

                                    type="text"
                                    placeholder="Enter Message"
                                    onChange={this.props.ParenthandleInputChange}
                                    autoComplete="off"
                                    name="message"
                                    value={this.props.stateData.message}
                                />

                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.message}
                                </Form.Text>

                            </Form.Group>

                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formImage">


                                <Form.Label >
                                    Image <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    onChange={this.props.ParenthandleInputChange}
                                    class="form-control-file"
                                    id="exampleFormControlFile1"
                                />

                                <Form.Label className="text-uppercase">
                                    {this.props.stateData.image_filename}
                                </Form.Label>

                            </Form.Group>

                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="formPreview">


                                <Form.Label >
                                    Preview Image <span className="text-danger">*</span>
                                </Form.Label>
                                {this.props.stateData.image != "" ? (
                                    <Image
                                        src={`http://neetjeeguru.com/files/${this.props.stateData.image}`}

                                        width="60" height="60" alt="preview-img" />
                                ) : ("")}

                            </Form.Group>

                           <Form.Group as={Col}
                                lg={12}
                                md={12}
                                sm={12} controlId="formLong">


                                <Form.Label >
                                    Long Description <span className="text-danger">*</span>
                                </Form.Label>
                                <TextEditor handleEditorChange={this.props.handleEditorChange} />
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.formErrors.ldescription}
                                </Form.Text>

                            </Form.Group>

                            <Form.Group as={Col}
                                lg={4}
                                md={12}
                                sm={12} controlId="formLong">


                                <Button
                                    className="btn btn-green px-5"
                                    onClick={this.props.parenthandleFormSubmit}
                                >Send Notification</Button>

                            </Form.Group>

                        </Row>

                     </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default BranchModal;
