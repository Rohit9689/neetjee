import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import AdaptiveExamSection from '../components/exams/adaptive_exam/AdaptiveExamSection'
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';



const FETCH_SUBJECTS = gql` 
query($mobile: String) {
    getSubjects(mobile: $mobile){
        id
        subject
        studentChapters{
            id
            chapter
            topics{
                id
                topic
                practice_percentage
            }
            class
            
        }
    }
}
`;

const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        classes{
            id
            class
        }
        questionTypes{
            id
            questiontype
        }
        complexity{
            id
            complexity
        }
        questionTheory{
            id
            question_theory
        }
    }
}

`;

class AdaptiveExam extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getSubjects = this.props.getSubjects;
        const loading1 = getSubjects.loading;
        const error1 = getSubjects.error;

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;

        //if (loading1 || loading2) return null;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">

                        <Container>
                            {
                                !loading1 && !loading2 && (<AdaptiveExamSection getSubjects={getSubjects.getSubjects} studentGlobals={studentGlobals.studentGlobals} />)
                            }

                        </Container>


                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(compose(

    graphql(FETCH_SUBJECTS
        ,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")

                },
            }), name: "getSubjects"
        }),
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
            }), name: "studentGlobals"
        }))(AdaptiveExam));
