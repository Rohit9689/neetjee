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

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        user_access_restictions
     }
}

`;

class LinkageChapterAnalysis extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            psubject:"0",
            defaulteventKey:"first",
            pchapter:[],
            headerBottomImg: {
                Img: require('../../images/previous-paper-analysis.svg'),
                Title: "Linkage Chapter Analysis",
                width:200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
              
         }
    }
    searchSubmit=(childstate)=>{
        this.setState({
            psubject:childstate.subject,
            pchapter:childstate.chapter,
            defaulteventKey:childstate.defaulteventKey
             
         });
    }
    render() {
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
                {(loading5 == true ) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper pt-0">
                        {
                                 !loading5 &&(
                                    <LinkageChapterAnalysisSection 
                                    searchSubmit={this.searchSubmit}
                                    studentGlobals={studentGlobals}
                                    stateData={this.state}
                                    globalsubjects={globalsubjects}
                                    isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                   
                                   />
                                   )
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
        
    )(LinkageChapterAnalysis));