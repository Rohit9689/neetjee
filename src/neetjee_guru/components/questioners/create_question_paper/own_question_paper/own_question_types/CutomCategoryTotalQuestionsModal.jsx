import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button, Badge, ListGroup } from 'react-bootstrap'

import TableSearchwithStudentResult from "../../../manage_questin_papers/TableSearchwithStudentResult"
import parse, { domToReact } from 'html-react-parser';
import SelectDropDown from '../../../../selectdropdown/SelectDropDown'
import { components } from 'react-select';
import { withRouter } from "react-router-dom";
import CutomCategoryTotalQuestionsModalBody from "./CutomCategoryTotalQuestionsModalBody";
import SingleOption1 from '../../../../../../student_module/components/learn_practice/start_error_exam/start_error_page/SingleOption1'
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};

class CutomCategoryTotalQuestionsModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mfsubject: "0",
            mfsubjectValue: { value: "0", label: "All Subjects" },
            mfchapter: "0",
            mfchapterValue: { value: "0", label: "All Chapters" }
        }
    }

    getsubjects() {

        let array = [];
        this.props.qcountarr.map((qmap) => {
            array.push(qmap.subject.toString());
        });
        const uniqueArr = [... new Set(array.map(data1 => data1))]
        let getArray = [];
        for (let i = 0; i <= this.props.globals.length; i++) {
            let idata = this.props.globals[i];
            if (idata != undefined) {
                if (uniqueArr.includes(idata.id.toString())) {
                    const newObj = {
                        value: idata.id,
                        label: idata.subject
                    }
                    getArray.push(newObj);

                }
            }


        }
        return getArray;

    }
    getChapters = () => {
        let getArray = [];
        for (let i = 0; i <= this.props.globals.length; i++) {
            let idata = this.props.globals[i];
            if (idata != undefined) {
                if (idata.id == this.state.mfsubject) {
                    let singlesubarr = [];
                    this.props.qcountarr.map((qmap) => {
                        if (qmap.subject == this.state.mfsubject) {
                            singlesubarr.push({ ...qmap })
                        }
                    });
                    let chData = idata.chapters;
                    chData.map((chmapData) => {
                        let charray = [];
                        singlesubarr.map((smap) => {
                            if (smap.chapter.includes(chmapData.id.toString())) {
                                charray.push(chmapData.id.toString());
                            }

                        })
                        const uniqueArr = [... new Set(charray.map(data1 => data1))]
                        uniqueArr.map((umap) => {
                            if(umap==chmapData.id){
                                const newObj = {
                                    value: chmapData.id,
                                    label: chmapData.chapter
                                }
                                getArray.push(newObj);
                            }
                            

                        });
                    })
                }
            }

        }
        
        return getArray;
    }
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        if (name == "mfsubject") {
            if (value != "0") {
                const singlesubject = this.props.globals.find((a) => a.id == value);
                this.setState({
                    mfsubjectValue: {
                        value: singlesubject.id,
                        label: singlesubject.subject
                    },
                    mfchapter: "0",
                    mfchapterValue: { value: "0", label: "All Chapters" }
                });
            } else {
                this.setState({
                    mfsubjectValue: {
                        value: "0",
                        label: "All Subjects"
                    },
                    mfchapter: "0",
                    mfchapterValue: { value: "0", label: "All Chapters" }
                });
            }

        }
        else if (name == "mfchapter") {
            if (value != "0") {
                const singlesubject = this.props.globals.find((a) => a.id == this.state.mfsubject);

                let singlechapter = "";
                if (singlesubject != undefined) {
                    singlechapter = singlesubject.chapters.find((a) => a.id == value);
                }
                else {
                    let newArray = [];
                    this.props.globals.map((item) => {
                        newArray.push(...item.chapters);
                    });
                    singlechapter = newArray.find((a) => a.id == value);
                }
                this.setState({
                    mfchapterValue: {
                        value: singlechapter.id,
                        label: singlechapter.chapter
                    }
                });
            } else {
                this.setState({
                    mfchapterValue: {
                        value: "0",
                        label: "All Chapters"
                    }
                });
            }

        }
        this.setState({ [name]: value });
    }
    render() {
        let qcountarr=this.props.qcountarr;
        if(this.state.mfsubject!="0" || this.state.mfchapter!="0"){
            if(this.state.mfsubject!="0")
            {
                qcountarr=qcountarr.filter((a)=>a.subject==this.state.mfsubject);
            }
            if(this.state.mfchapter!="0"){
                qcountarr=qcountarr.filter((a)=>a.chapter.includes(this.state.mfchapter));
            }
        }
       return (
            <Modal {...this.props}
                size="xl" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Total Questions View</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 error_exam_block"
                //style={{ height: 522, overflowY: 'auto' }}
                >
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12} className="totalquestionsview">
                            <div className="bg-white  d-md-flex justify-content-between align-items-center mb-2">
                                    {/* <Card.Title className="mb-0">{tablename}</Card.Title> */}
                                    <div className="split d-flex">
                                        <div className="first mr-2" style={{ width: 200 }}>
                                            <SelectDropDown
                                                stateData={this.state.mfsubjectValue}
                                                handleChange={this.selecthandleInputChange}
                                                name="mfsubject"
                                                options={this.getsubjects()}
                                                placeholderName={'Subject'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </div>
                                        <div className="first mr-2" style={{ width: 200 }}>
                                            <SelectDropDown
                                                stateData={this.state.mfchapterValue}
                                                handleChange={this.selecthandleInputChange}
                                                name="mfchapter"
                                                options={this.getChapters()}
                                                placeholderName={'Chapter'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <CutomCategoryTotalQuestionsModalBody qcountarr={qcountarr} />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal >
        )
    }
}

export default withRouter(
    (CutomCategoryTotalQuestionsModal)
);
