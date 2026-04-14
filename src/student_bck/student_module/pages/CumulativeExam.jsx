import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import CumulativeExamSection from '../components/get_ready_for_exam/cumulative_exam/CumulativeExamSection'

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
        isTrialUser
     }
}

`;
class CumulativeExam extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
            const isStudentUserValid = this.props.isStudentUserValid;
            const loading3 = isStudentUserValid.loading;
            const error3 = isStudentUserValid.error;
    
            if (error3 !== undefined) {
                alert("Server Error. " + error3.message);
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
    
            let globalsubjects = "";
            if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
                globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
            }
            else {
                this.props.history.push("/student/login");
            }
    
            let studentGlobals = "";
            if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
                studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
            }
            else {
                this.props.history.push("/student/login");
            }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                {(loading3 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                        {
                                !loading3 && (
                                    <CumulativeExamSection isStudentUserValid={isStudentUserValid.isStudentUserValid} getSubjects={globalsubjects} studentGlobals={studentGlobals} />)
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
                fetchPolicy: "cache-and-network"
            }), name: "isStudentUserValid"
        })
)(CumulativeExam));
