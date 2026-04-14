import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import { Container, Row, Col, Button } from 'react-bootstrap'
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
class DefaultCustomSingleRevisionMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: "wrapper sidebar-enable",
            views: "",
            type: "default"
        }
    }

    render() {
        //console.log("DefaultCustomSingleRevisionMaterial",this.props.history.location.state);
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
            localStorage.removeItem('studentglobals');
            localStorage.setItem(
                "isStudentUserValid",
                JSON.stringify(isStudentUserValid.isStudentUserValid)
            );


        }
        if (studentGlobals.studentGlobals != undefined) {
            localStorage.setItem(
                "studentglobals",
                JSON.stringify(studentGlobals.studentGlobals)
            );
        }
        return (
            <div>

                {(loading5 == true || loading3 == true) && (<PreloaderTwo />)}


                {
                    !loading5 && !loading3 && (
                        <div className="content-wrapper pt-0" style={{ minHeight: '60vh' }}>
                            <SingleCustomRevisionMaterialHeader
                                stateData={this.state}
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
        )
    }
}

export default
    withRouter(
        compose(graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: "9866667788"
                    }
                    ,
                    fetchPolicy: 'cache-and-network'
                }), name: "studentGlobals"
            }),
            graphql(FETCH_ISSTUDENTUSERVALID,
                {
                    options: props => ({
                        variables: {
                            mobile: "9866667788"
                        }
                        ,
                        fetchPolicy: 'cache-and-network'
                    }), name: "isStudentUserValid"
                }))(DefaultCustomSingleRevisionMaterial));
