import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars';
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import Package from '../components/register_steps/Package';

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
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
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
                <div className="main-wrapper">
                    {(loading5 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        {
                            !loading5 && (
                                <section className="student-package">
                                    <Container>

                                        <Package isStudentUserValid={isStudentUserValid.isStudentUserValid} />


                                    </Container>
                                </section>
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
