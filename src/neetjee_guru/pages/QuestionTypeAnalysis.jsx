import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/SideNavbar'
import { Container } from 'react-bootstrap'
//import QuestionTypeNavbar from '../components/analysis/question_type/QuestionTypeNavbar'
import QuestionTypeAnalysisSection from '../components/analysis/question_type/QuestionTypeAnalysisSection'
import * as Cookies from "es-cookie";

class QuestionTypeAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exam_type: "0,1",
            class_id: "1,2",
            exam_typevalue: { value: 2, label: 'ALL' },
            class_idvalue: { value: 0, label: 'ALL' },
        }

    }
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (name == "exam_type") {
            if (value == "0") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Practise' },
                    exam_type: value
                });
            }
            else if (value == "1") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Exam' },
                    exam_type: value
                });
            }
            else if (value == "2") {
                this.setState({
                    exam_typevalue: { value: value, label: 'ALL' },
                    exam_type: "0,1"
                });
            }

        }
        if (name == "class_id") {
            if (value == "0") {
                this.setState({
                    class_idvalue: { value: value, label: 'ALL' },
                    class_id: "1,2"
                });
            }
            else if (value == "1") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XI' },
                    class_id: value
                });
            }
            else if (value == "2") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XII' },
                    class_id: value
                });
            }
        }
    }
    defaultActiveKeyFun = (e) => {
        console.log("defaultActiveKeyFun");
        this.props.history.push("/student/result-analysis");

    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        return (
            <div className="student main-wrapper">
                {/* <div className="student header-area">
                    <QuestionTypeNavbar onClick={() => this.props.changeToggle()} />
                </div> */}
                <AsideNavbar />
                <div className="content-wrapper pt-0">
                    <Container fluid={true}>
                        <QuestionTypeAnalysisSection
                            mobile={Cookies.get("mobile")}
                            defaultActiveKeyFun={this.defaultActiveKeyFun}
                            stateData={this.state}
                            selecthandleInputChange={this.selecthandleInputChange} />
                    </Container>
                </div>
            </div>
        )
    }
}

export default QuestionTypeAnalysis
