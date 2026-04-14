import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import FeaturedVideoSection from '../components/featuredvideos/FeaturedVideoSection'
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from 'react-router-dom';
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar'
import Footer from '../components/login_register/Footer'

const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        user_access_restictions
        module_restrictions
        chapter_ids
     }
}

`;

class FeaturedInnerDefaultVideos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
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
    render() {
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
        return (
            <div>
                {this.props.type == "video" ? (
                    <AsideNavbar onClick={() => this.menuToggler()} />
                ) : ("")}
                {(loading5 == true) && (<PreloaderTwo />)}
                <div className="student-overlay" onClick={() => this.menuToggler()} />
                <div className="content-wrapper">
                    <Container fluid>
                        {
                            !loading5 && (
                                <FeaturedVideoSection
                                    type={this.props.type}
                                    examtype={this.props.examtype}
                                    mobile={this.props.mobile}
                                />
                            )
                        }


                    </Container>

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
                    mobile: props.mobile
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "isStudentUserValid"
        })
)(FeaturedInnerDefaultVideos));