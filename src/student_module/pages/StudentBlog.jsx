import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import BlogSection from '../components/blog/BlogSection'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';
import PreloaderTwo from "../components/preloader/PreloaderTwo";
import BlogIcon from "../../images/blog-icon.svg"
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

class StudentBlog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: BlogIcon,
                Title: "Blog",
                width: 100,
                topHelpimg: true
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Blog;
        ReactGA.pageview('/student/student-blog', ["ELAPP"], title);
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
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area blog-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} topHelpimg={this.state.topHelpimg} onClick={() => this.menuToggler()} />
                    </div>
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    {(loading5 == true) && (<PreloaderTwo />)}
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        <Container>
                            {
                                !loading5 && (
                                    <BlogSection />
                                )
                            }

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
)(StudentBlog));
