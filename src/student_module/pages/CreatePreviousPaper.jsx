import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import ExamSection from '../components/exams/ExamSection'
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

import MockTestSeriesSection from '../components/jeemains2021/MockTestSeriesSection'

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        
        user_access_restictions
        module_restrictions
        chapter_ids
        previous_sets
     }
}

`;
class CreatePreviousPaper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggled: "wrapper sidebar-enable",
            headerBottomImg: {
                Img: require('../../images/exam.svg'),
                Title: "JEE Mains 2021",
                width: 280,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }

    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Jee_Mains_2021_Home_Page;
        ReactGA.pageview('/student/createpreviouspaperexam', ["ELAPP"], title);
    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
        if (toggled === "wrapper") {
            this.setState({ toggled: "wrapper sidebar-enable" });
            Cookies.set("toggle", "wrapper sidebar-enable");
        } else {
            this.setState({ toggled: "wrapper" });
            Cookies.set("toggle", "wrapper");
        }
    };
    render() {
        const isStudentUserValid = this.props.isStudentUserValid;
        const loading1 = isStudentUserValid.loading;
        const error1 = isStudentUserValid.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
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
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area mock-tests-eries-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        {
                            !loading1 && (
                                <MockTestSeriesSection
                                />)
                        }


                    </div>

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
)(CreatePreviousPaper));
