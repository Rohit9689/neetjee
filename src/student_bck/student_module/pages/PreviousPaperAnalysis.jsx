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

class PreviousPaperAnalysis extends Component {
    constructor(props) {
        super(props)
        let pexamtype = "";
        if (Cookies.get("examid") == 1) {
            pexamtype = "0";
        }
        else if (Cookies.get("examid") == 2 || Cookies.get("examid") == 5) {
            pexamtype = "1";
        }
        this.state = {
            pexamtype: pexamtype,
            psubject: "0",
            defaulteventKey: "first",
            pyeartype: [],
            headerBottomImg: {
                Img: require('../../images/previous-paper-analysis.svg'),
                Title: "Previous Paper Analysis",
                width:200,
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
        console.log("pexamtype", pexamtype);
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
        console.log("parent", this.state);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

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
        //for globals
        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        //for globalsubjects
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        return (
            <div className="student main-wrapper">
                <div className="student header-area previous-paper-analysis-topnavbar">
                    <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.props.changeToggle()} />
                </div>

                {(loading5 == true) && (<PreloaderTwo />)}
                <AsideNavbar />
                <div className="content-wrapper pt-0">
                    {
                        !loading5 && (
                            <PreviousPaperAnalysisSection
                                searchSubmit={this.searchSubmit}
                                studentGlobals={studentGlobals}
                                stateData={this.state}
                                globalsubjects={globalsubjects}
                                isStudentUserValid={isStudentUserValid.isStudentUserValid}

                            />)
                    }
                </div>
            </div>
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
        })

)(PreviousPaperAnalysis));