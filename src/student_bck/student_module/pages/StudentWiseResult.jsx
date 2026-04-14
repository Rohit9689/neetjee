import React, { Component } from 'react'
import StudentOrganizationProfileSection from '../components/student_organization_profile/StudentOrganizationProfileSection';
class StudentWiseResult extends Component {
    render() {
        console.log("StudentOrganizationProfile8", this.props.match.params.mobile.slice(1, 10));
        return (
            
               <StudentOrganizationProfileSection
                    hislocationData={this.props.match.params} />

            
        )
    }
}

export default StudentWiseResult
