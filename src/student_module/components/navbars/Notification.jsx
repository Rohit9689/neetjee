import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { NavDropdown, Image, Badge,Nav } from 'react-bootstrap'
import './_navbars.scss';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import moment from 'moment';

const FETCH_STUDENTNOTIFICATIONS = gql` 
query($mobile: String) {
    getStudentNotificatons(mobile: $mobile){
        id
        title
        description
        timestamp
        image
        seen_status
        
     }
}

`;
class Navbars extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    
    render() {
        const getStudentNotificatons = this.props.getStudentNotificatons;
        const loading1 = getStudentNotificatons.loading;
        const error1 = getStudentNotificatons.error;

        if (loading1) return null;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        const notifications = getStudentNotificatons.getStudentNotificatons;
        console.log("notificationsc",notifications);
        let seen=notifications.filter(a=>a.seen_status=="0");
        console.log("seen",seen);
        return (
            <Nav.Item>
                <Link  className="student-notification text-decoration-none nav-link" to="/student/notifications">
                <span className="position-relative">
                        <i className="fal fa-bell"/>
                {seen.length>0?( <Badge className="position-absolute rounded-circle text-white" style={{top: -14,right: -10, backgroundColor: '#f81201'}}>{seen.length}</Badge>):("")}
                       
                    </span>
                {/* <NavDropdown id="basic-nav-dropdown1" 
                className="student-notification no-arrow" 
                alignRight 
                title={
                    <span className="position-relative">
                        <i className="fal fa-bell" onClick={()=>this.linkfunction()}/>
                {seen.length>0?( <Badge className="position-absolute rounded-circle text-white" style={{top: -14,right: -10, backgroundColor: '#f81201'}}>{seen.length}</Badge>):("")}
                       
                    </span>
                }
                > */}
                    {/* <ul>
                        <li>
                            <div className="drop-title">Your Notifications</div>
                        </li>
                        <li>
                            <div className="notification-center">
                                {notifications.map((item) => (
                                    <Link to={{
                                        pathname: "/student/notifications/notification",
                                        state: {
                                            item: item.id
                                        }
                                    }}
                                        className="d-flex align-items-start">
                                        <div className="notification-icon pt-2">
                                            {item.image != "" ? (
                                                <Image src={item.image} width="40" height="40" alt="img" className="rounded-circle" style={{
                                                    padding: " 0.25rem",
                                                    backgroundColor: "#fff",
                                                    border: "1px solid #dee2e6"
                                                }} />
                                            ) : (
                                                    // <div className="empty-notifications rounded-circle p-2" style={{ width: "40px", height: "40px", border: '1px solid #6c757d' }}>
                                                    //     <i className="fal fa-bell text-dark" style={{ fontSize: '1.5rem' }}></i>
                                                    // </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                        <g id="Layer">
                                                            <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                            <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                            <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                        </g>
                                                    </svg>
                                                )}

                                            
                                        </div>
                                        <div className="notification-contnet">
                                            <h5>{item.title}</h5>
                                            <p className="mail-desc">{item.description}</p>
                                            <span className="time">{moment.unix(item.timestamp).format("DD-MM-YYYY @ LT")}</span>

                                        </div>
                                    </Link>
                                ))}


                            </div>
                        </li>
                        <li>
                            <Link
                                className="pt-2 nav-link text-center text-dark"

                                to={{
                                    pathname: "/student/notifications",
                                }}
                            > All
                                            notifications</Link>
                        </li>

                    </ul> */}
                </Link>

            </Nav.Item>
        )
    }
}


export default withRouter(compose(

    graphql(FETCH_STUDENTNOTIFICATIONS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentNotificatons"
        }
    ))(Navbars));

