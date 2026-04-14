import React, { Component } from 'react'
import ComplexityAnalysisNavbar from '../components/analysis/complexity_analysis/ComplexityAnalysisNavbar'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ComplexityAnalysisSection from '../components/analysis/complexity_analysis/ComplexityAnalysisSection'
import { Container } from 'react-bootstrap'
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

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

class ComplexityAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable",
            exam_type: "0,1",
            class_id: "1,2",
            exam_typevalue: { value: 2, label: 'ALL' },
            class_idvalue: { value: 0, label: 'ALL' },
        }

    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Complexity_Analysis;
        ReactGA.pageview('/student/complexity-analysis', ["ELAPP"], title);
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
    selecthandleInputChange = (ename, evalue) => {
        console.log("selecthandleInputChange", ename, evalue);
        const name = ename;
        const value = evalue;
        if (name == "exam_type") {
            if (value == "0") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Practise' },
                    exam_type: value
                });
            }
            else if (value == "1") {
                this.setState({
                    exam_typevalue: { value: value, label: 'Exam' },
                    exam_type: value
                });
            }
            else if (value == "2") {
                this.setState({
                    exam_typevalue: { value: value, label: 'ALL' },
                    exam_type: "0,1"
                });
            }

        }
        if (name == "class_id") {
            if (value == "0") {
                this.setState({
                    class_idvalue: { value: value, label: 'ALL' },
                    class_id: "1,2"
                });
            }
            else if (value == "1") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XI' },
                    class_id: value
                });
            }
            else if (value == "2") {
                this.setState({
                    class_idvalue: { value: value, label: 'Class-XII' },
                    class_id: value
                });
            }
        }
    }
    defaultActiveKeyFun = (e) => {
        console.log("defaultActiveKeyFun");
        this.props.history.push("/student/result-analysis");

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
            localStorage.removeItem('isStudentUserValid');
            localStorage.setItem(
                "isStudentUserValid",
                JSON.stringify(isStudentUserValid.isStudentUserValid)
            );
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area">
                        <ComplexityAnalysisNavbar onClick={() => this.menuToggler()} />
                    </div>
                    {(loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        <Container fluid={true}>
                            <ComplexityAnalysisSection
                                mobile={Cookies.get("mobile")}
                                defaultActiveKeyFun={this.defaultActiveKeyFun}
                                stateData={this.state}
                                selecthandleInputChange={this.selecthandleInputChange}
                                isStudentUserValid={isStudentUserValid.isStudentUserValid} />
                        </Container>
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
)(ComplexityAnalysis));
