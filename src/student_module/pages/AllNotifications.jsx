import React, { Component } from 'react'
import { Row, Col, Card, Tab, Nav, Container } from 'react-bootstrap';
import AsideNavbar from '../components/navbars/AsideNavbar';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import NavbarOne from '../components/navbars/Navbars';
// import BreadcrumbHeading from '../components/breadcrumbs/BreadcrumbHeading';
import Footer from '../components/footer/Footer';
import noti from "../../images/notification.svg"
import { Link, withRouter } from 'react-router-dom';
import AllNotificationComponent from '../components/navbars/AllNotificationComponent';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const FETCH_STUDENTNOTIFICATIONS = gql` 
query($mobile: String,$page: Int) {
    getStudentNotificatons(
        mobile: $mobile,page: $page ){
            id
        title
        description
        timestamp
        image
        seen_status
        tip_of_the_day
     }
}

`;

class AllNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            BreadcrumbData: {
                Title: 'All Notifications'
            },
            headerBottomImg: {
                Img: noti,
                Title: "Notifications",
                width: 100,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }

    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Notifications;
        ReactGA.pageview('/student/notifications', ["ELAPP"], title);
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
        console.log("AllNotifications", getStudentNotificatons.getStudentNotificatons);
        return (
            <div className={Cookies.get("toggle")}>


                <div className="student main-wrapper">
                    <div className="student header-area notification-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-1">
                        <Container>
                            {
                                !loading1 && (
                                    <section className="notification">
                                        <Row>
                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                {/* <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} /> */}
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                    <Nav variant="pills" className="notification-nav flex-row my-3 border-bottom border-theme pb-3">
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="first" className="d-flex align-items-center"><i className="fas fa-bells mr-2" /><span> All Notifications</span></Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="second" className="d-flex align-items-center"><i className="fas fa-bell mr-2" /> <span>Notifications</span></Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="third" className="d-flex align-items-center">
                                                                <i className="fas fa-comment-alt mr-2"><i className="fas fa-lightbulb" /></i> <span>Tip of the Day</span>
                                                            </Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="first">

                                                            <AllNotificationComponent notifications={notifications} type="all" />


                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="second">
                                                            <AllNotificationComponent notifications={notifications} type="normal" />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="third">
                                                            <AllNotificationComponent notifications={notifications} type="tip" />
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Tab.Container>

                                            </Col>
                                        </Row>
                                    </section>
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
                    page: 1
                },
                fetchPolicy: "no-cache"
            }), name: "getStudentNotificatons"
        }
    ))(AllNotifications));
