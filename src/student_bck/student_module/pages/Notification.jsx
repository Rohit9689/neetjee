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

const FETCH_STUDENTNOTIFICATIONS = gql` 
query($mobile: String) {
    getStudentNotificatons(mobile: $mobile){
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

export class Notification extends Component {
   
    
    render() {
        console.log("view", this.props.history.location.state);
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
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper pt-4">
                        <Container>
                        {
                                !loading1 && (
                                   
                                    <FullViewNotification
                                    id={this.props.history.location.state.item}
                                    getStudentNotificatons={getStudentNotificatons.getStudentNotificatons}/>
                                 )} 
                            
                        </Container>
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
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentNotificatons"
        }
    ))(Notification));
