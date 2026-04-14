import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'

import LinkageChapterAnalysisSection from '../components/linkage_chapter_analysis/LinkageChapterAnalysisSection'


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
        user_access_restictions
        module_restrictions
        chapter_ids
     }
}

`;

class DefaultLinkageChapterAnalysis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggled: "wrapper sidebar-enable",
            psubject: "0",
            defaulteventKey: "first",
            pchapter: [],
            headerBottomImg: {
                Img: require('../../images/previous-paper-analysis.svg'),
                Title: "Linkage Chapter Analysis",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            },
            examtype: "2",
            type: "default"

        }
    }
    handleInputChange = (e) => {
        if (e.target.name == "examtype") {
            this.setState({
                examtype: e.target.value
            });
            // Cookies.set("examid", e.target.value)
        }

    }

    searchSubmit = (childstate) => {
        const title = GoogleAnalyticsArray[0].Linkage_Analysis_Detail_Page;
        ReactGA.pageview('/student/linkage-chapter-analysis', ["ELAPP"], title);
        this.setState({
            psubject: childstate.subject,
            pchapter: childstate.chapter,
            defaulteventKey: childstate.defaulteventKey

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
            Cookies.set("examid", this.state.examtype);
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
                <div className="student header-area videos-topnavbar">
                    <StudentOrganizationNavbar
                        handleInputChange={this.handleInputChange}
                        name="defaultvideo" stateData={this.state} />
                </div>
                {(loading1 == true || loading2 == true || loading5 == true) && (<PreloaderTwo />)}

                <div className="content-wrapper pt-0">
                    {
                        !loading1 &&
                        !loading2 &&
                        !loading5 && (
                            <LinkageChapterAnalysisSection
                                type="default"
                                searchSubmit={this.searchSubmit}
                                studentGlobals={studentGlobals.studentGlobals}
                                stateData={this.state}
                                globalsubjects={getSubjects.getSubjects}
                                isStudentUserValid={isStudentUserValid.isStudentUserValid}

                            />
                        )
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
    )(DefaultLinkageChapterAnalysis)
);