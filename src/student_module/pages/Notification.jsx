import React, { Component } from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import moment from 'moment';
import * as Cookies from "es-cookie";
import parse, { domToReact } from "html-react-parser";
import { Link, withRouter } from "react-router-dom";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'
import FullViewNotification from "../components/navbars/FullViewNotification"
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


const FETCH_STUDENTNOTIFICATIONS = gql` 
query($mobile: String, $id: Int) {
    getStudentNotificatons(mobile: $mobile, id: $id){
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

class Notification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/notification.svg'),
                Title: "Notifications",
                width: 100,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].NotificationsView;
        ReactGA.pageview('/student/notifications/notification', ["ELAPP"], title);
    }
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
        if (toggled === "wrapper") {
            this.setState({ toggled: "wrapper sidebar-enable" });
            Cookies.set("toggle", "wrapper sidebar-enable");
        } else {
            this.setState({ toggled: "wrapper" });
            Cookies.set("toggle", "wrapper");
        }
    };
    render() {
        console.log("params", "mobile:", Cookies.get("mobile"),
            "id:", parseInt(this.props.history.location.state.item));
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const getStudentNotificatons = this.props.getStudentNotificatons;
        const loading1 = getStudentNotificatons.loading;
        const error1 = getStudentNotificatons.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area notification-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-2">
                        <Container>
                            {
                                !loading1 && (
                                    <FullViewNotification
                                        id={this.props.history.location.state.item}
                                        type={this.props.history.location.state.type}
                                        getStudentNotificatons={getStudentNotificatons.getStudentNotificatons} />
                                )}

                        </Container>
                    </div>

                </div>
            </div>

        )
    }
}



export default withRouter(compose(

    graphql(FETCH_STUDENTNOTIFICATIONS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    id: parseInt(props.history.location.state.item)
                },
                fetchPolicy: "no-cache"
            }), name: "getStudentNotificatons"
        }
    ))(Notification));
