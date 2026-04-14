import React, { Component } from 'react'
import { Row, Col, Card, Container, Image } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import { Link, withRouter } from "react-router-dom";
import BreadcrumbHeading from '../../neetjee_guru/components/breadcrumbs/BreadcrumbHeading';
import moment from 'moment';
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';

import AllNotificationComponent from "../components/navbars/AllNotificationComponent"


const FETCH_STUDENTNOTIFICATIONS = gql` 
query($mobile: String,$page: Int) {
    getStudentNotificatons(
        mobile: $mobile,page: $page ){
            id
        title
        description
        timestamp
        image
        long_description
        seen_status
     }
}

`;
export class AllNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {

            hasMore: true
        }
    }

    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getStudentNotificatons = this.props.getStudentNotificatons;
        const loading1 = getStudentNotificatons.loading;
        const error1 = getStudentNotificatons.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const notifications = getStudentNotificatons.getStudentNotificatons;
        if (notifications == "") {
            return (
                <React.Fragment>
                    <div className="header-area">
                        <Navbars onClick={() => this.props.changeToggle()} />
                    </div>
                    <div className="main-wrapper">
                        {(loading1 == true) && (<PreloaderTwo />)}
                        < AsideNavbar />
                        <div className="content-wrapper text-center d-flex align-items-center justify-content-center" style={{ height: '66vh' }}>
                            <Container>
                                <section className="notification">
                                    <Row>
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <Image src={require('../../images/empty_notifications_fhvw.svg')} alt="empt-notifucation-img" width="250" />
                                            <h5 className="mt-4 text-muted">Nothing Here!!!</h5>
                                        </Col>
                                    </Row>
                                </section>
                            </Container>
                        </div>
                    </div >
                </React.Fragment >
            );

        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper">
                        {
                            !loading1 && (
                                <Container>
                                    <AllNotificationComponent
                                        notifications={notifications} />
                                </Container>
                            )}

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(compose(

    graphql(FETCH_STUDENTNOTIFICATIONS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    page: 0
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentNotificatons"
        }
    ))(AllNotifications));
