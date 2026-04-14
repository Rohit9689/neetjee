import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import SemiGrandExamSection from '../components/get_ready_for_exam/semi_grand/SemiGrandExamSection'

import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
class GetReadySemiGrandExam extends Component {
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
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
                    {/* {(loading2 == true) && (<PreloaderTwo />)} */}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        <Container>
                            <SemiGrandExamSection studentGlobals={studentGlobals} />
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter((GetReadySemiGrandExam));
