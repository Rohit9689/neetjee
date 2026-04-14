import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import CustomPractiseExamSection from '../components/exams/custom_exam/CustomPractiseExamSection';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';


class CustomPractiseExam extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        
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
                    {/* {(loading1 == true) && (<PreloaderTwo />)} */}
                    <AsideNavbar />
                    <div className="content-wrapper" style={{paddingTop: 10 , minHeight: "80vh"}}>
                        <Container>
                           
                                <CustomPractiseExamSection
                                    getSubjects={globalsubjects} studentGlobals={studentGlobals} />


                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}





export default withRouter(
    compose(
        

    )(CustomPractiseExam)
);
