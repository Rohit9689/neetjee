import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import StudentHomeSection from '../components/home/StudentHomeSection'
import HomeNavbar from '../components/home/HomeNavbar';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';


import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
import { tokenChecking } from './GlobalFunctions';

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

class StudentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mainindex: 0,
            getSubjects: [],

            toggled: Cookies.get("toggle")

        }
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

    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Home;
        ReactGA.pageview('/student/home', ["ELAPP"], title);
        // console.log("localStorage.getItem", localStorage.getItem("homemodal"));
        // if (localStorage.getItem("homemodal") == "true") {
        //     this.setState({
        //         StartingModalShow: true
        //     })
        // }


        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        //console.log("didmount", globalsubjects);
        if (globalsubjects != undefined || globalsubjects != null) {
            const getSubjects = globalsubjects.map((gmap, index) => {
                if (index == 0) {
                    return { ...gmap, active: "active" }

                }
                else {
                    return { ...gmap, active: "" }
                }

            })
            this.setState({
                getSubjects: getSubjects
            });
        }


    }
    handleSelect = (subid) => {
        const getSubjects = this.state.getSubjects.map((gmap, index) => {
            if (index == subid) {
                return { ...gmap, active: "active" }

            }
            else {
                return { ...gmap, active: "" }
            }

        })
        this.setState({
            getSubjects: getSubjects,
            mainindex: subid
        });
    }

    render() {
        // console.log("StudentHome",Cookies.get("toggle"));
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        // tokenChecking(Cookies.get("studenttoken"));
        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
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
        }
        //console.log("localstirage", JSON.parse(localStorage.getItem("globalsubjects")));
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
        //console.log("home", this.state);
        if (this.state.getSubjects.length
            > 0) {
            return (
                <div className={Cookies.get("toggle")}>
                    <div className="student main-wrapper">
                        <div className="student header-area">
                            {
                                !loading5 && (
                                    <HomeNavbar
                                        stateData={this.state}
                                        getSubjects={this.state.getSubjects}
                                        onClick={() => this.menuToggler()}
                                        logout={this.props.logout} />
                                )
                            }
                        </div>
                        {(loading5 == true) && (<PreloaderTwo />)}
                        <AsideNavbar onClick={() => this.menuToggler()} />
                        <div className="student-overlay" onClick={() => this.menuToggler()} />
                        <div className="content-wrapper pt-0">
                            <Container>
                                {
                                    !loading5 && (
                                        <StudentHomeSection
                                            stateData={this.state}
                                            studentGlobals={studentGlobals}
                                            getSubjects={this.state.getSubjects}
                                            handleSelect={this.handleSelect}
                                            isStudentUserValid={isStudentUserValid.isStudentUserValid} />)
                                }
                            </Container>
                        </div>





                    </div>
                </div>
            )
        }
        return (<PreloaderTwo />);

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
)(StudentHome));
