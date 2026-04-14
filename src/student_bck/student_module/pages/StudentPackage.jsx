import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import StudentPackageSection from '../components/student_package/StudentPackageSection'
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

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
class StudentPackage extends Component {

    render() {
        //console.log("this.props.history.location.state.",this.props.history.location.state.type);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
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

        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper bg-white">
                    <AsideNavbar />
                    {(loading5 == true) && (<PreloaderTwo />)}
                    <div className="content-wrapper pt-0">
                        {
                            !loading5 && (
                                    <StudentPackageSection 
                                    // type={this.props.history.location.state.type}
                                    isStudentUserValid={isStudentUserValid.isStudentUserValid} />
                            )}

                    </div>
                </div>
            </React.Fragment>
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
                fetchPolicy: "cache-and-network"
            }), name: "isStudentUserValid"
        })
)(StudentPackage));