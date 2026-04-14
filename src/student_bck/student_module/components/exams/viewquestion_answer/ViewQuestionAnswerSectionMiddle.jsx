import React, { Component } from 'react'
import ExamHistoryAsideBar from '../../navbars/ExamHistoryAsideBar';
import ViewQuestionAnswerSection from './ViewQuestionAnswerSection';
import { Container } from 'react-bootstrap';
import '../_preexam.scss';
import ExamHistoryNavbar from '../../navbars/ExamHistoryNavbar';

import { withRouter } from "react-router-dom";
class ViewQuestionAnswerSectionMiddle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            questions: props.getStudentExamSessions,
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
        let questions=this.props.getStudentExamSessions;
        console.log("etStudentExamSessions", this.props.getStudentExamSessions);
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
            questions=this.props.getStudentExamSessions;

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
        console.log("PracticeExamSectionMiddle", this.state.questions);
        return (
            <React.Fragment>
                <div className="header-area-section">

                    <ExamHistoryNavbar
                        onClick={() => this.props.changeToggle()}
                        locdata={this.props.locdata}
                        type="cexam"
                        getStudentExamSessions={this.props.getStudentExamSessions}
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
                            <ViewQuestionAnswerSection
                                stateData={this.state}
                                getStudentExamSessions={this.props.getStudentExamSessions}
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
export default withRouter(ViewQuestionAnswerSectionMiddle);




