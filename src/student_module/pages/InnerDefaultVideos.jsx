import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import VideoSection from '../components/videos/VideoSection'
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from 'react-router-dom';
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar'
import Footer from '../components/login_register/Footer'

class InnerDefaultVideos extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            toggled: "wrapper sidebar-enable"
        }

    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
     };
    render() {
        const getVideoCategories = this.props.getVideoCategories;
        const loading1 = getVideoCategories.loading;
        const error1 = getVideoCategories.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        return (
            <div >
                {(loading1 == true) && (<PreloaderTwo />)}
                {this.props.type == "video" ? (
                    <AsideNavbar onClick={() => this.menuToggler()} />
                ) : ("")}
                <div className="student-overlay" onClick={() => this.menuToggler()} />
                <div className="content-wrapper">
                    <Container fluid>
                        {
                            !loading1 && (
                                <VideoSection
                                    type={this.props.type}
                                    examtype={this.props.examtype}
                                    mobile={this.props.mobile}
                                    getVideoCategories={getVideoCategories.getVideoCategories} />)
                        }
                    </Container>
                    {/* {this.props.type != "video" ? (
                        <div className="mt-4">
                            <Footer />
                        </div>
                    ) : ("")} */}

                </div>
            </div>
        )
    }
}


export default withRouter(compose(

    graphql(gql`
    query($params: VideosInput) {
      getVideoCategories(
        params: $params
      ) {
          id
          category
          
        }
    }
  `, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: props.mobile,
                    exam: parseInt(props.examtype),
                    class1: 0,
                    subject: 0,
                    chapter: "",
                    topic: "",
                    institute_id: 0,
                    page: 0,
                    latest: 0,
                    recently_watched: 0
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getVideoCategories",
    }))(InnerDefaultVideos));