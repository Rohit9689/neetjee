import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne';
import Preloader from '../components/preloader/Preloader';
import StudentOrganizationProfileSection from '../components/home/student_organization_profile/StudentOrganizationProfileSection';
import Footer from '../components/footer/Footer';
import * as Cookies from "es-cookie";
class StudentOrganizationProfile extends Component {
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
        console.log("StudentOrganizationProfile8", this.props.history.location.state);
        return (
            <div className={Cookies.get("toggle")}>
                <div className="left-side-menu">
                    <SideNavbar onClick={() => this.menuToggler()} />
                </div>
                <div className="content-page">
                    {/* <Preloader /> */}
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    <div className="main-content">
                        <StudentOrganizationProfileSection
                            hislocationData={this.props.history.location.state} />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default StudentOrganizationProfile
