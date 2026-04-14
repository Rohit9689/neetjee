import React, { Component } from 'react'

import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar'

import InnerDefaultVideos from './InnerDefaultVideos'

class DefaultVideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            examtype: "2"
        }
    }
    handleInputChange = (e) => {
        console.log("handleInputChange",e.target.name,e.target.value);
        if (e.target.name == "examtype") {
            this.setState({
                examtype: e.target.value
            });

        }

    }
    render() {

        return (
            <React.Fragment>
                <div className="student header-area videos-topnavbar">
                    <StudentOrganizationNavbar
                        handleInputChange={this.handleInputChange}
                        name="defaultvideo" stateData={this.state} />
                </div>
                <InnerDefaultVideos
                type="default" 
                examtype={this.state.examtype}
                mobile="9999999999"
                />
            </React.Fragment>
        )
    }
}


export default DefaultVideos;