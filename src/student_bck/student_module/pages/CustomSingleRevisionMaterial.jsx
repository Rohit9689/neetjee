import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import { Container } from 'react-bootstrap'
import SingleCustomRevisionMaterialHeader from '../components/all_custom_revision_materials/SingleCustomRevisionMaterialHeader'
import SingleCustomRevisionMaterialSection from '../components/all_custom_revision_materials/SingleCustomRevisionMaterialSection';

import { withRouter } from "react-router-dom";


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
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

const FETCH_GLOBALS = gql` 
query($mobile: String!) {
    studentGlobals(mobile: $mobile){
        reports{
            id
            report
        }
        tags{
            id
            tag
            type
            count
        }
        
    }
}

`;
class CustomSingleRevisionMaterial extends Component {
    constructor(props){
        super(props);
        this.state={
            views:""
        }
    }

    render() {
        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;



        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }


        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }
        //console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
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
                <div className="main-wrapper">
                    {(loading5 == true || loading3 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    {
                        !loading5 && !loading3 && (
                            <div className="content-wrapper pt-0" style={{ minHeight: '60vh' }}>
                                <SingleCustomRevisionMaterialHeader
                                    getStudentRevisionMaterial={this.props.history.location.state} />
                                <Container>
                                    <SingleCustomRevisionMaterialSection
                                    stateData={this.state}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getStudentRevisionMaterial={this.props.history.location.state}
                                    />
                                </Container>
                            </div>
                        )}

                </div>
            </React.Fragment>
        )
    }
}

export default
    compose(

        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                    ,
                    fetchPolicy: 'cache-and-network'
                }), name: "studentGlobals"
            }),
        graphql(FETCH_ISSTUDENTUSERVALID,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                    ,
                    fetchPolicy: 'cache-and-network'
                }), name: "isStudentUserValid"
            })


    )(CustomSingleRevisionMaterial);
