import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import PreviousPaperAnalysisSection from '../components/previous_paper_analysis/PreviousPaperAnalysisSection'


import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar';
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar'
import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const FETCH_GET_SUBJECTS = gql`
  query($mobile: String) {
    getSubjects(mobile: $mobile) {
      id
      subject
      practice_percentage
      studentChapters {
        id
        chapter
        topics {
          id
          topic
         }
        class
        
        practice_wrong_answered
        enabled
        total_questions
      }
      
      
    }
  }
`;

const FETCH_STUDENTGLOBALS = gql`
  query($mobile: String) {
    studentGlobals(mobile: $mobile) {
      exams {
        id
        exam
        exam_subjects{
          subject_id
        }
      }
      classes {
        id
        class
      }
      questionTypes {
        id
        questiontype
      }
      complexity {
        id
        complexity
      }
      questionTheory {
        id
        question_theory
      }
      previousSets {
        id
        year
        qset
        exam
        pexamtype
        enabled
        attempted
        mains_2021
        exam_date
        examgroup
      }
      previousYears {
        year
      }
      appModules{
        id
        title
      }
      exam_time
      tags{
        id
        tag
        type
      }
    }
  }
`;

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        user_access_restictions
        isTrialUser
        module_restrictions
        
        previous_sets
     }
}

`;

class DefaultPreviousPaperAnalysis extends Component {
    constructor(props) {
        super(props)
        // let pexamtype = "";
        // if (Cookies.get("examid") == 1) {
        //     pexamtype = "0";
        // }
        // else if (Cookies.get("examid") == 2 || Cookies.get("examid") == 5) {
        //     pexamtype = "1";
        // }
        this.state = {
            type: "default",
            pexamtype: "1",
            psubject: "0",
            defaulteventKey: "first",
            pyeartype: [],
            headerBottomImg: {
                Img: require('../../images/previous-paper-analysis.svg'),
                Title: "Previous Paper Analysis",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            },

            subject: "0",
            subjectValue: {
                value: "0",
                label: "Select All"
            },
            yeartype: [],
            yeartypevalue: [],
            examtype: "0",
            subexamtype: "1",
            subexamtypeValue: {
                value: "1",
                label: "MAINS"
            }


        }
    }
    searchSubmit = (childstate) => {

        const title = GoogleAnalyticsArray[0].Previous_Paper_Analysis_Detail_Page;
        ReactGA.pageview('/student/previous-paper-analysis', ["ELAPP"], title);

        let pexamtype = "";
        if (Cookies.get("examid") == 1) {
            console.log("w2");
            pexamtype = "0";
        }
        else if (Cookies.get("examid") == 2) {
            console.log("w3", childstate.subexamtype);
            pexamtype = childstate.subexamtype;
        }
        else if (Cookies.get("examid") == 5) {
            console.log("w4");
            if (childstate.examtype == "0") {
                pexamtype = "0";
            }
            else {
                pexamtype = childstate.subexamtype;
            }

        }
        this.setState({
            pexamtype: pexamtype,
            psubject: childstate.subject,
            pyeartype: childstate.yeartype,
            defaulteventKey: childstate.defaulteventKey,

            subject: childstate.subject,
            subjectValue: childstate.subjectValue,
            yeartype: childstate.yeartype,
            yeartypevalue: childstate.yeartypevalue,
            examtype: childstate.examtype,
            subexamtype: childstate.subexamtype,
            subexamtypeValue: childstate.subexamtypeValue

        });
    }
    render() {
        const getSubjects = this.props.getSubjects;
        const loading1 = getSubjects.loading;
        const error1 = getSubjects.error;

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        //console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
        if (isStudentUserValid.isStudentUserValid != undefined) {
            if (isStudentUserValid.isStudentUserValid.estatus == 0) {
                Cookies.remove("token");
                Cookies.remove("username");
                Cookies.remove("refreshtoken");
                Cookies.remove("email");
                Cookies.remove("id");
                Cookies.remove("institutionid");
                Cookies.remove("userlevel");
                Cookies.remove("name");
                this.props.history.push("/student/login");
            }
            localStorage.removeItem('isStudentUserValid');
            localStorage.setItem(
                "isStudentUserValid",
                JSON.stringify(isStudentUserValid.isStudentUserValid)
            );
            Cookies.remove("examid");
            Cookies.set("examid", "5");
            localStorage.removeItem('studentglobals');
            localStorage.removeItem('globalsubjects');
            Cookies.remove("mobile");
            Cookies.set("mobile", "9866667788");
            localStorage.setItem(
                "studentglobals",
                JSON.stringify(studentGlobals.studentGlobals)
            );
            localStorage.setItem(
                "globalsubjects",
                JSON.stringify(getSubjects.getSubjects)
            );
        }



        return (

            <React.Fragment>
                {/* <div className="student header-area previous-paper-analysis-topnavbar">
                    <StudentOrganizationNavbar
                        handleInputChange={this.handleInputChange}
                        name="Previous Paper Analysis" stateData={this.state} />
                </div> */}

                {(loading1 == true || loading2 == true || loading5 == true) && (<PreloaderTwo />)}

                <div className="content-wrapper pt-0">
                    {
                        !loading1 &&
                        !loading2 &&
                        !loading5 && (
                            <PreviousPaperAnalysisSection
                                type="default"
                                searchSubmit={this.searchSubmit}
                                studentGlobals={studentGlobals.studentGlobals}
                                stateData={this.state}
                                globalsubjects={getSubjects.getSubjects}
                                isStudentUserValid={isStudentUserValid.isStudentUserValid}

                            />)
                    }
                </div>
            </React.Fragment>

        )
    }
}



export default withRouter(
    compose(
        graphql(FETCH_GET_SUBJECTS, {
            options: (props) => ({
                variables: {
                    mobile: "9866667788",
                }
                ,
                fetchPolicy: "no-cache"
            }),
            name: "getSubjects",
        }),
        graphql(FETCH_STUDENTGLOBALS, {
            options: (props) => ({
                variables: {
                    mobile: "9866667788",
                }
                ,
                fetchPolicy: "no-cache"
            }),
            name: "studentGlobals",
        }),
        graphql(FETCH_ISSTUDENTUSERVALID,
            {
                options: props => ({
                    variables: {
                        mobile: "9866667788"
                    }
                    ,
                    fetchPolicy: "cache-and-network"
                }), name: "isStudentUserValid"
            })
    )(DefaultPreviousPaperAnalysis)
);