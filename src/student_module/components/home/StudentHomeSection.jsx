import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

import './_studenthome.scss'
import SubjectCards from './subject_cards/SubjectCards';
import PracticeCard from './practice_cards/PracticeCard';
import UpcomingAndCurrentExams from './aside_exams/UpcomingAndCurrentExams';
import ExploreMore from './explore_tags/ExploreMore';
import ExamsCard from './exams_card/ExamsCard'

import PreparationLifecircle from './preparation_lifecircle/PreparationLifecircle'
import UserRestrictionAlert from "./UserRestrictionAlert";
class StudentHomeSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            getSubjects: props.getSubjects,


            mainindex: 0,
            userRestionModalShow: false,
        }
    }

    startexamFun = (item, modaldata) => {
        if (modaldata == false) {
            localStorage.setItem("sessionid", "0");
            localStorage.setItem("type", "Schedule Exam");
            localStorage.setItem("stype", "schedule_exam");
            localStorage.setItem("exam_paper_id", item.id);
            localStorage.setItem("etype", "schedulehome");

            window.open("/student/subject/exam", "_blank");
        } else {
            this.setState({
                userRestionModalShow: true,
            });
        }
    };
    practceRedirect = (item, modaldata) => {
        //for StudentUserValid
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        
        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        const moduleValid = JSON.parse(isStudentUserValid.module_restrictions);
        console.log("isuserValid",isuserValid,moduleValid);
        
        if ((item.enabled == true && moduleValid.learn_tab == false) || isStudentUserValid.chapter_ids.split(",").includes(item.id.toString())) {
        // if (modaldata == false) {
        //     console.log("practceRedirect", isuserValid.lp_topics == false);
            if (isuserValid.lp_practice_exam == false) {
                let subData = this.props.getSubjects[this.props.stateData.mainindex];
                let totchapters = [];
                this.props.getSubjects.map((item) => {
                    totchapters.push(item.studentChapters);
                });
                let laschapter = totchapters.filter(
                    (a) => a.id == subData.last_attempted_chapter
                );

                localStorage.setItem("subjectid", subData.id);
                localStorage.setItem("type", "practice");
                localStorage.setItem("etype", "homedata");
                localStorage.setItem("chapters", "");
                localStorage.setItem("ocid", item.id);
                localStorage.setItem("otid", "0");
                localStorage.setItem("hchaptername", item.chapter);

                window.open("/student/subject/practice-test", "_blank"); //to open new page
            }
            else {
                this.setState({
                    userRestionModalShow: true,
                });
            }

        } else {
            this.setState({
                userRestionModalShow: true,
            });
        }
    };
    render() {


        const getChapters = this.props.getSubjects[this.props.stateData.mainindex];
        const isuserValid = JSON.parse(
            this.props.isStudentUserValid.user_access_restictions
        );
        return (
            <section className="student-home">
                <SubjectCards
                    stateData={this.props.stateData}
                    handleSelect={this.props.handleSelect}
                    getSubjects={this.props.getSubjects} />
                <Row>
                    <Col xl={4} lg={12} md={12} sm={12} className="my-3">
                        <PracticeCard 
                        practceRedirect={this.practceRedirect}
                        isuserValid={isuserValid}
                        stateData={this.props.stateData}
                        getChapters={getChapters}
                        getSubjects={this.props.getSubjects}/>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={12} className="my-3">
                        <PreparationLifecircle />
                    </Col>
                    <ExamsCard 
                    stateData={this.props.stateData}
                    isuserValid={isuserValid}
                    startexamFun={this.startexamFun}
                    studentGlobals={this.props.studentGlobals}
                    getSubjects={this.props.getSubjects}/>
                </Row>

                {/* <Row>
                    <Col xl={4} lg={4} md={12} sm={12}>
                        <PracticeCards
                            practceRedirect={this.practceRedirect}
                            isuserValid={isuserValid}
                            stateData={this.props.stateData}
                            // Data={Data}
                            getChapters={getChapters}
                            getSubjects={this.props.getSubjects} />
                    </Col>
                    <Col xl={4} lg={4} md={12} sm={12}>
                        <UpcomingAndCurrentExams
                            stateData={this.props.stateData}
                            isuserValid={isuserValid}
                            startexamFun={this.startexamFun}
                            studentGlobals={this.props.studentGlobals}
                            getSubjects={this.props.getSubjects}
                        />
                    </Col>
                    <Col xl={4} lg={4} md={12} sm={12}>
                        <ExploreMore
                            stateData={this.props.stateData}
                            getSubjects={this.props.getSubjects}
                        />
                    </Col>
                </Row> */}
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </section>
        )
    }
}

export default StudentHomeSection
