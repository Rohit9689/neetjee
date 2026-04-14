import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ProfileSection from '../components/Profile/ProfileSection';
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
const FETCH_USER_PROFILE = gql` 
query($mobile: String) {
    getStudentProfile(mobile: $mobile){
        name
        email
        mobile
        valid
        class_id
        branch_id
        college_name
        institution_id
        institute_name
        profile_pic
        exam_id
        mobile_verified
        target_year
        feedback
        estatus
        branch_name
        videos
        user_exams
        {
            exam_type
            hall_ticket_no
        }
     }
}

`;

const FETCH_STUDENTGLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        exams{
            id
            exam
        }
     }
}

`;

class Profile extends Component {

    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const getStudentProfile = this.props.getStudentProfile;
        const loading1 = getStudentProfile.loading;
        const error1 = getStudentProfile.error;

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
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
                    {(loading1 == true || loading2 == true || loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container fluid>
                            {
                                !loading1 && !loading2 && !loading5 && (
                                    <ProfileSection
                                        getStudentProfile={getStudentProfile.getStudentProfile}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        isStudentUserValid={isStudentUserValid.isStudentUserValid}
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
    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "isStudentUserValid"
        }),
    graphql(FETCH_USER_PROFILE,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
            }), name: "getStudentProfile"
        }),
    graphql(FETCH_STUDENTGLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
            }), name: "studentGlobals"
        }))(Profile));
