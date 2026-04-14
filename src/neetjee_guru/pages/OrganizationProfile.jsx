import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader'
import OrganizationProfileSection from '../components/settings/organization/OrganizationProfileSection'
import Footer from '../components/footer/Footer';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
class OrganizationProfile extends Component {
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
        if (Cookies.get("token") == undefined) this.props.history.push("/login");
        const getOrganisationProfile = this.props.getOrganisationProfile;
        const loading3 = getOrganisationProfile.loading;
        const error3 = getOrganisationProfile.error;
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        if (loading3) return <PreloaderTwo />;
        return (
            <div className={Cookies.get("toggle")}>
                <div className="left-side-menu">
                    <SideNavbar onClick={() => this.menuToggler()} />
                </div>
                <div className="content-page">
                    <Preloader />
                    <NavbarOne onClick={() => this.menuToggler()} />
                    <div className="overlay" onClick={() => this.menuToggler()} />
                    <div className="main-content">
                        <OrganizationProfileSection
                            getOrganisationProfile={getOrganisationProfile.getOrganisationProfile} />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default compose(
    graphql(gql` 
    query($institution_id: Int!) {
        getOrganisationProfile(institution_id: $institution_id){
            id
            organisation_name
            chairman
            contact_no
            complete_address
            region_id
            logo
            hod
            hod_mobile
            principal
            principal_mobile
            vice_principal
            vice_principal_mobile
            timestamp
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                },

            }), name: "getOrganisationProfile"
        }
    ))(OrganizationProfile);
