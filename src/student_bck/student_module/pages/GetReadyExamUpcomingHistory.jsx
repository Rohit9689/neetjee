import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import GetReadyExamUpcomingHistorySection from '../components/get_ready_for_exam/history/GetReadyExamUpcomingHistorySection';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        app_version
        user_access_restictions
     }
}

`;
const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        contentTypes{
            id
            customcontent
        }
        
    }
}

`;
const FETCH_GETREADYEXAM = gql` 
query($mobile: String!,$page:Int) {
    getReadyForExamList(mobile: $mobile, page: $page){
        id
        sub_type
        exam_type
        class_id
        syllabus{
            subject_id
            subject_name
            chapters{
                id
                chapter
            }
        }
        exam_name
        exam_date
        save_exam_type
        is_completed
        timestamp
   }
}

`;

class GetReadyExamUpcomingHistory extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        const getReadyForExamList = this.props.getReadyForExamList;
        const loading2 = getReadyForExamList.loading;
        const error2 = getReadyForExamList.error;
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }

        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
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
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading3 == true || loading5 == true || loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            {
                                !loading3 && !loading5 && !loading2 &&(
                                    <GetReadyExamUpcomingHistorySection
                                        isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getReadyForExamList={getReadyForExamList.getReadyForExamList}
                                    />)
                            }
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



export default withRouter(compose(
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy:"cache-and-network"
            }), name: "studentGlobals"
        }),
    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'cache-and-network'
            }), name: "isStudentUserValid"
        }),
        graphql(FETCH_GETREADYEXAM,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile"),
                        page: 0
                    },
                    fetchPolicy: 'cache-and-network'
                }), name: "getReadyForExamList"
            })
)(GetReadyExamUpcomingHistory));
