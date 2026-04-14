import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import './_navbars.scss';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import MobileAsideNavbar from "./MobileAsideNavbar";
import WebAsideNavbar from "./WebAsideNavbar";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

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



class AsideNavbar extends Component {
    render() {
        // console.log("isBrowserisMobile", isBrowser,
        //     isMobile);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        let isStudentUserValid1 = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid1 = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        let isuserValid = JSON.parse(
            isStudentUserValid1.user_access_restictions
        );

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;
        if (loading5) {
            if (isBrowser) {
                return (
                    <div id="sidebar" className="sidebar-menu d-none d-xl-block d-lg-block">
                        <WebAsideNavbar onClick={this.props.onClick} isuserValid={isuserValid} />
                    </div>
                )
            }
            if (isMobile) {
                return (
                    <div id="sidebar" className="sidebar-menu d-block d-xl-none d-lg-none">
                        <MobileAsideNavbar onClick={this.props.onClick} isuserValid={isuserValid} />
                    </div>
                )
            }

        }
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
        }


        isuserValid = JSON.parse(
            isStudentUserValid.isStudentUserValid.user_access_restictions
        );

        if (isBrowser) {
            return (
                <div id="sidebar" className="sidebar-menu d-none d-xl-block d-lg-block">
                    <WebAsideNavbar onClick={this.props.onClick} isuserValid={isuserValid} />
                </div>
            )
        }
        if (isMobile) {
            return (
                <div id="sidebar" className="sidebar-menu d-block d-xl-none d-lg-none">
                    <MobileAsideNavbar onClick={this.props.onClick} isuserValid={isuserValid} />
                </div>
            )
        }

    }
}



export default withRouter(
    compose(
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
    )(AsideNavbar)
);