import React, { Component } from 'react'
import TopNavbar from '../components/resultanalysis/TopNavbar'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ResultAnalysisSection from '../components/resultanalysis/ResultAnalysisSection'
import { Container } from 'react-bootstrap';



class ResultAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exam_type: "0,1",
            class_id: "1,2",
            exam_typevalue: { value: 2, label: 'ALL' },
            class_idvalue: { value: 0, label: 'ALL' }
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
    render() {
        return (
            <div className="student main-wrapper">
                <div className="student header-area">
                    <TopNavbar onClick={() => this.props.changeToggle()} />
                </div>

                <AsideNavbar onClick={() => this.props.changeToggle()} />
                <div className="student-overlay" onClick={() => this.props.changeToggle()} />
                <div className="content-wrapper pt-0">
                    <Container fluid={true}>
                        <ResultAnalysisSection
                            stateData={this.state}
                            selecthandleInputChange={this.selecthandleInputChange} />
                    </Container>
                </div>
            </div>
        )
    }
}
export default (ResultAnalysis);
