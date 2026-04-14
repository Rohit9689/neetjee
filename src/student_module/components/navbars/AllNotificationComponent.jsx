import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, Image } from 'react-bootstrap'
import './_navbars.scss';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import moment from 'moment';
import BreadcrumbHeading from '../../../neetjee_guru/components/breadcrumbs/BreadcrumbHeading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withApollo } from "@apollo/client/react/hoc";
import notifylogo from "../../../images/notifylogo.png";

class AllNotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BreadcrumbData: {
                Title: 'All Notifications'
            },
            notifications: props.notifications,
            hasMore: true,
            page: 0
        }
    }
    onScrollnotifications = async (e) => {
        console.log("this.state.notifications.length", this.state.notifications.length);
        if (this.state.notifications.length < 9) {
            this.setState({ hasMore: false });
        }
        else {
            let page = parseInt(this.state.page) + 1;
            console.log("pagepage", page);
            const result = await this.props.client.query({
                query: gql` 
            query(
                $mobile: String,$page: Int 
                
                ) {
                    getStudentNotificatons(
                        mobile: $mobile,page: $page
                    )
                    {
                        id
                        title
                        description
                        timestamp
                        image
                        tip_of_the_day
                        
                    
                }
            }
        `,
                variables: {

                    mobile: Cookies.get("mobile"),
                    page: parseInt(page)

                },
            })
            console.log("notificationdata", "mobile:", Cookies.get("mobile"),
                "page:", parseInt(page));
            //console.log("newstyledata", this.state.notifications.concat(result.data.getStudentNotificatons));
            //console.log("newstyledata1234", result.data.getStudentNotificatons);

            if (result.data.getStudentNotificatons.length == 0) {
                this.setState({ hasMore: false, page: page });
                return;
            }
            else {
                setTimeout(() => {
                    this.setState({
                        page: page,
                        notifications: this.state.notifications.concat(result.data.getStudentNotificatons)
                    });
                }, 500);
            }
        }
    }

    render() {
        if (this.state.notifications.length > 9) {
            return (
                <InfiniteScroll
                    dataLength={this.state.notifications.length}
                    next={this.onScrollnotifications}
                    hasMore={this.state.hasMore}
                    loader={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                            <b>Loading...</b>
                        </p>}
                    endMessage={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <ul className="notification-block list-unstyled">
                        {this.state.notifications.map((item) => {
                            if (this.props.type == "tip") {
                                if (item.tip_of_the_day == true) {
                                    return (
                                        <li className="mb-3">
                                            <Card
                                                as={Link}
                                                style={{ cursor: "pointer" }}
                                                className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}
                                                to={{
                                                    pathname: "/student/notifications/notification",
                                                    state: {
                                                        item: item.id,
                                                        type: this.props.type
                                                    }
                                                }}
                                            >
                                                <Card.Body>
                                                    <div className="d-flex mb-2">
                                                        <div className="icon">
                                                            <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle"  />
                                                            {/* {item.image != "" ? (
                                                                <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle" style={{
                                                                    padding: " 0.25rem",
                                                                    backgroundColor: "#fff",
                                                                    border: "1px solid #dee2e6"
                                                                }} />
                                                            ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                        <g id="Layer">
                                                                            <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                            <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                            <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                        </g>
                                                                    </svg>
                                                                )} */}

                                                        </div>
                                                        <div className="notification-title ml-3">
                                                            <div className="title-content mr-5">
                                                                <Card.Title as={Link}
                                                                    //to="/notifications/notification" 
                                                                    className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                                <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                            </div>
                                                            <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                                <Link className="text-dark text-decoration-none" to="#">
                                                                    {/* <i className="fad fa-envelope-open-text" />  */}
                                                                    {item.seen_status == "0" ? (<React.Fragment>
                                                                        <i className="fad fa-envelope" />
                                                                    </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                                </Link>
                                                                {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                        {item.description}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </li>
                                    )

                                }

                            }
                            else if (this.props.type == "normal") {
                                if (item.tip_of_the_day == false) {
                                    return (
                                        <li className="mb-3">
                                            <Card
                                                as={Link}
                                                style={{ cursor: "pointer" }}
                                                className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}
                                                to={{
                                                    pathname: "/student/notifications/notification",
                                                    state: {
                                                        item: item.id,
                                                        type: this.props.type
                                                    }
                                                }}
                                            >
                                                <Card.Body>
                                                    <div className="d-flex mb-2">
                                                        <div className="icon">
                                                            {/* {item.image != "" ? (
                                                                <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle" style={{
                                                                    padding: " 0.25rem",
                                                                    backgroundColor: "#fff",
                                                                    border: "1px solid #dee2e6"
                                                                }} />
                                                            ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                        <g id="Layer">
                                                                            <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                            <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                            <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                        </g>
                                                                    </svg>
                                                                )} */}
                                                            <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle"  />
                                                        </div>
                                                        <div className="notification-title ml-3">
                                                            <div className="title-content mr-5">
                                                                <Card.Title as={Link}
                                                                    //to="/notifications/notification" 
                                                                    className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                                <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                            </div>
                                                            <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                                <Link className="text-dark text-decoration-none" to="#">
                                                                    {/* <i className="fad fa-envelope-open-text" />  */}
                                                                    {item.seen_status == "0" ? (<React.Fragment>
                                                                        <i className="fad fa-envelope" />
                                                                    </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                                </Link>
                                                                {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                        {item.description}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </li>
                                    )
                                }


                            }
                            else {
                                return (
                                    <li className="mb-3">
                                        <Card
                                            as={Link}
                                            style={{ cursor: "pointer" }}
                                            className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}
                                            to={{
                                                pathname: "/student/notifications/notification",
                                                state: {
                                                    item: item.id,
                                                    type: this.props.type
                                                }
                                            }}
                                        >
                                            <Card.Body>
                                                <div className="d-flex mb-2">
                                                    <div className="icon">
                                                        {/* {item.image != "" ? (
                                                            <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle"  />
                                                        ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                    <g id="Layer">
                                                                        <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                        <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                        <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                    </g>
                                                                </svg>
                                                            )} */}
                                                        <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle"  />
                                                    </div>
                                                    <div className="notification-title ml-3">
                                                        <div className="title-content mr-5">
                                                            <Card.Title as={Link}
                                                                //to="/notifications/notification" 
                                                                className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                            <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                        </div>
                                                        <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                            <Link className="text-dark text-decoration-none" to="#">
                                                                {/* <i className="fad fa-envelope-open-text" />  */}
                                                                {item.seen_status == "0" ? (<React.Fragment>
                                                                    <i className="fad fa-envelope" />
                                                                </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                            </Link>
                                                            {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                    {item.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                )
                            }
                        }
                        )
                        }

                    </ul>
                </InfiniteScroll>);
        }
        else {
            return (
                <ul className="notification-block list-unstyled">
                    {this.state.notifications.map((item) => {
                        if (this.props.type == "tip") {
                            if (item.tip_of_the_day == true) {
                                return (
                                    <li className="mb-3">
                                        <Card
                                            as={Link}
                                            style={{ cursor: "pointer" }}
                                            className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}

                                            to={{
                                                pathname: "/student/notifications/notification",
                                                state: {
                                                    item: item.id,
                                                    type: this.props.type
                                                }
                                            }}
                                        >
                                            <Card.Body>
                                                <div className="d-flex mb-2">
                                                    <div className="icon">
                                                        {/* {item.image != "" ? (
                                                            <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle"  />
                                                        ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                    <g id="Layer">
                                                                        <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                        <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                        <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                    </g>
                                                                </svg>
                                                            )} */}
                                                        <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle"  />
                                                    </div>
                                                    <div className="notification-title ml-3">
                                                        <div className="title-content mr-5">
                                                            <Card.Title as={Link}
                                                                //to="/notifications/notification" 
                                                                className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                            <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                        </div>
                                                        <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                            <Link className="text-dark text-decoration-none" to="#">
                                                                {/* <i className="fad fa-envelope-open-text" />  */}
                                                                {item.seen_status == "0" ? (<React.Fragment>
                                                                    <i className="fad fa-envelope" />
                                                                </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                            </Link>
                                                            {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                    {item.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                )
                            }

                        }
                        else if (this.props.type == "normal") {
                            if (item.tip_of_the_day == false) {
                                return (
                                    <li className="mb-3">
                                        <Card
                                            as={Link}
                                            style={{ cursor: "pointer" }}
                                            className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}

                                            to={{
                                                pathname: "/student/notifications/notification",
                                                state: {
                                                    item: item.id,
                                                    type: this.props.type
                                                }
                                            }}
                                        >
                                            <Card.Body>
                                                <div className="d-flex mb-2">
                                                    <div className="icon">
                                                        {/* {item.image != "" ? (
                                                            <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle"  />
                                                        ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                    <g id="Layer">
                                                                        <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                        <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                        <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                    </g>
                                                                </svg>
                                                            )} */}
                                                        <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle"  />
                                                    </div>
                                                    <div className="notification-title ml-3">
                                                        <div className="title-content mr-5">
                                                            <Card.Title as={Link}
                                                                //to="/notifications/notification" 
                                                                className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                            <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                        </div>
                                                        <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                            <Link className="text-dark text-decoration-none" to="#">
                                                                {/* <i className="fad fa-envelope-open-text" />  */}
                                                                {item.seen_status == "0" ? (<React.Fragment>
                                                                    <i className="fad fa-envelope" />
                                                                </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                            </Link>
                                                            {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                    {item.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </li>
                                )
                            }
                        }
                        else {
                            return (
                                <li className="mb-3">
                                    <Card
                                        as={Link}
                                        style={{ cursor: "pointer" }}
                                        className={item.seen_status == "0" ? ("shadow-sm unread-msge text-dark text-decoration-none") : ("shadow-sm text-dark text-decoration-none")}

                                        to={{
                                            pathname: "/student/notifications/notification",
                                            state: {
                                                item: item.id,
                                                type: this.props.type
                                            }
                                        }}
                                    >
                                        <Card.Body>
                                            <div className="d-flex mb-2">
                                                <div className="icon">
                                                    {/* {item.image != "" ? (
                                                        <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle"  />
                                                    ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                                <g id="Layer">
                                                                    <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                    <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                    <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                                </g>
                                                            </svg>
                                                        )} */}
                                                    <Image src={notifylogo} width="40" height="40" alt="img" className="rounded-circle" style={{
                                                        padding: " 0.25rem",
                                                        backgroundColor: "#fff",
                                                        border: "1px solid #dee2e6"
                                                    }} />
                                                </div>
                                                <div className="notification-title ml-3">
                                                    <div className="title-content mr-5">
                                                        <Card.Title as={Link}
                                                            //to="/notifications/notification" 
                                                            className="text-decoration-none text-dark mb-0">{item.title}</Card.Title>
                                                        <div className="date-time"><small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small></div>
                                                    </div>
                                                    <div className="icon position-absolute" style={{ top: 15, right: 20 }}>
                                                        <Link className="text-dark text-decoration-none" to="#">
                                                            {/* <i className="fad fa-envelope-open-text" />  */}
                                                            {item.seen_status == "0" ? (<React.Fragment>
                                                                <i className="fad fa-envelope" />
                                                            </React.Fragment>) : (<i className="fad fa-envelope-open-text" />)}
                                                        </Link>
                                                        {/* | <Link className="text-dark text-decoration-none" to="#"><i className="fad fa-trash" /></Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                                                {item.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </li>
                            )
                        }

                    }
                    )
                    }

                </ul>
                // <section className="notification">
                //     <Row>
                //         <Col xl={12} lg={12} md={12} sm={12}>
                //             <BreadcrumbHeading breadcrumbs={this.state.BreadcrumbData} />

                //             <ul className="notification-block list-unstyled">
                //                 {this.state.notifications.map((item) => {
                //                     return (
                //                         <li className="mb-3">
                //                             <Card as={Link} className="border-0 shadow-sm stretched-link text-decoration-none text-dark"
                //                                 to={{
                //                                     pathname: "/student/notifications/notification",
                //                                     state: {
                //                                         item: item.id
                //                                     }
                //                                 }}>
                //                                 <Card.Body>
                //                                     <div className="d-flex mb-2">
                //                                         <div className="icon">
                //                                             {item.image != "" ? (
                //                                                 <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle" style={{
                //                                                     padding: " 0.25rem",
                //                                                     backgroundColor: "#fff",
                //                                                     border: "1px solid #dee2e6"
                //                                                 }} />
                //                                             ) : (
                //                                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                //                                                         <g id="Layer">
                //                                                             <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                //                                                             <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                //                                                             <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                //                                                         </g>
                //                                                     </svg>
                //                                                     // <div className="empty-notifications rounded-circle p-2" style={{ width: "40px", height: "40px", border: '1px solid #6c757d' }}>
                //                                                     //     <i className="fal fa-bell text-dark" style={{ fontSize: '1.5rem' }}></i>
                //                                                     // </div>
                //                                                 )}

                //                                         </div>
                //                                         <div className="notification-title ml-3">
                //                                             <Card.Title className="mb-0">{item.title}</Card.Title>
                //                                             <small className="text-muted">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</small>
                //                                         </div>
                //                                     </div>
                //                                     <Card.Text style={{ height: '2.3rem', overflow: 'hidden' }}>
                //                                         {item.description}
                //                                     </Card.Text>
                //                                 </Card.Body>
                //                             </Card>
                //                         </li>
                //                     );
                //                 })}

                //             </ul>
                //             {this.state.notifications.length == 0 ? (
                //                 <p style={{ textAlign: "center" }}>
                //                     <b>No Data Available</b>
                //                 </p>
                //             ) : (
                //                     <p style={{ textAlign: "center" }}>
                //                         <b>Yay! You have seen it all</b>
                //                     </p>
                //                 )}


                //         </Col>
                //     </Row>
                // </section>
            )
        }

    }
}


export default withRouter(withApollo((AllNotificationComponent)));

