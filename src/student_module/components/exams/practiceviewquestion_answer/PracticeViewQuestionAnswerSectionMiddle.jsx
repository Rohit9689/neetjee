import React, { Component } from 'react'
import ExamHistoryAsideBar from '../../navbars/ExamHistoryAsideBar';
import PracticeViewQuestionAnswerSection from './PracticeViewQuestionAnswerSection';
import { Container } from 'react-bootstrap';
import '../_preexam.scss';
import ExamHistoryNavbar from '../../navbars/ExamHistoryNavbar';

import { withRouter } from "react-router-dom";
class PracticeViewQuestionAnswerSectionMiddle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            questions: props.getStudentSessions,
            wrong:"",
            skip:"",
            correct:"",
            all:"active"
        }
    }
    nextQuestionfunction = () => {
        this.setState({
            index: parseInt(this.state.index + 1)
        });

    }
    PreQuestionfunction = () => {
        this.setState({
            index: parseInt(this.state.index - 1)
        });

    }
    psideQFun = (getindex) => {
        this.setState({
            index: parseInt(getindex)
        });
    }
    separationCounts=(type)=>{
        let questions=this.props.getStudentSessions;
        console.log("etStudentExamSessions", this.props.getStudentSessions);
       // 0skipp.1wrong,2correct
        if(type=="wrong"){
           questions=questions.filter((a)=>a.status==1);
        }
         if(type=="skip"){
            questions=questions.filter((a)=>a.status==0);

        }
         if(type=="correct"){
            questions=questions.filter((a)=>a.status==2);

        }
         if(type=="all"){
            questions=this.props.getStudentSessions;

        }
        
        if(type=="wrong"){
            if(this.state.wrong!="active"){
                this.setState({
                    index:0,
                    wrong:"active",
                    skip:"",
                    correct:"",
                    all:"",
                    questions:questions
                });
            }
            else{
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"",
                    correct:"",
                    all:"",
                    questions:questions
                });
            }
            
        }
        if(type=="skip"){
            if(this.state.skip!="active"){
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"active",
                    correct:"",
                    all:"",
                    questions:questions
                });
            }
            else{
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"",
                    correct:"",
                    all:"",
                    questions:questions
                });
            }
        }
        if(type=="correct"){
            if(this.state.correct!="active"){
                this.setState({
                    wrong:"",
                    index:0,
                    skip:"",
                    correct:"active",
                    all:"",
                    questions:questions
                });
            }
            else{
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"",
                    correct:"",
                    all:"",
                    questions:questions
                });
            }
        }
        if(type=="all"){
            if(this.state.all!="active"){
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"",
                    correct:"",
                    all:"active",
                    questions:questions
                });
            }
            else{
                this.setState({
                    index:0,
                    wrong:"",
                    skip:"",
                    correct:"",
                    all:"active",
                    questions:questions
                });
            }
        }
       

    }
    render() {
        console.log("PracticeViewQuestionAnswerSection", this.props.getStudentSessions);
        let type="pexam";
        if(this.props.locdata.ntype=="customp"){
            type="customp"
        }
        return (
            <React.Fragment>
                <div className="header-area-section">

                    <ExamHistoryNavbar
                        onClick={() => this.props.changeToggle()}
                        locdata={this.props.locdata}
                        type={type}

                        getStudentExamSessions={this.props.getStudentSessions}
                        stateData={this.state}
                    />
                </div>

                <div className="main-wrapper-section">

                    <ExamHistoryAsideBar
                        psideQFun={this.psideQFun}
                        stateData={this.state}
                        getData={this.props.getData}
                        separationCounts={this.separationCounts}

                    />
                    <div className="content-wrapper p-0">
                        <Container>
                            <PracticeViewQuestionAnswerSection
                                stateData={this.state}
                                getStudentExamSessions={this.props.getStudentSessions}
                                PnextQuestionfunction={this.nextQuestionfunction}
                                PreQuestionfunction={this.PreQuestionfunction}
                            />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(PracticeViewQuestionAnswerSectionMiddle);




