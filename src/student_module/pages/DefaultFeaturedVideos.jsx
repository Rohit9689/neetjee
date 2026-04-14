import React, { Component } from 'react'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import * as Cookies from "es-cookie";
import FeaturedInnerDefaultVideos from './FeaturedInnerDefaultVideos';
import { withRouter } from "react-router-dom";
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar';


class DefaultFeaturedVideos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            examtype: "2"
        }
    }
    handleInputChange = (e) => {
        
        if (e.target.name == "examtype") {
            this.setState({
                examtype: e.target.value
            });

        }

    }
    render() {


        return (


            <React.Fragment>
                {/* <div className="student header-area videos-topnavbar">
                    <StudentOrganizationNavbar
                        handleInputChange={this.handleInputChange}
                        name="fdefaultvideo" stateData={this.state} />
                </div> */}
                <FeaturedInnerDefaultVideos
                    type="fdefaultvideo"
                    examtype={this.state.examtype}
                    mobile="9999999999"
                />
            </React.Fragment>
        )
    }
}

export default withRouter(DefaultFeaturedVideos);