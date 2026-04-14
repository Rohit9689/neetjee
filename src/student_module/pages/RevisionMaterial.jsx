import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import InnerRevisionMaterial from '../components/learn_practice/revision_materials/InnerRevisionMaterial'
import ChepterHeaderSectionTwo from '../components/learn_practice/top_header/ChepterHeaderSectionTwo';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


class RevisionMaterial extends Component {
    constructor(props) {
        super(props)
        let defaultActiveKey = "first";
        console.log("props.history.location.state.defaultActiveKey", props.history.location.state);
        if (props.history.location.state != undefined) {
            if (props.history.location.state.defaultActiveKey != undefined) {
                defaultActiveKey = props.history.location.state.defaultActiveKey;
            }

        }
        this.state = {
            defaultActiveKey: defaultActiveKey,
            page: 1
        }
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
    componentDidMount() {
        const title = GoogleAnalyticsArray[0].Learn_Practice_Start_Learning;
        ReactGA.pageview('/student/subject/start-learning', ["ELAPP"], title);

        window.addEventListener('contextmenu',
            event => event.preventDefault());


        // window.addEventListener("mousedown", e => {
        //     e.preventDefault();
        //     e.returnValue = "false";

        // });
        window.addEventListener("selectstart", e => {
            e.preventDefault();
            e.returnValue = "false";

        });
    }

    componentWillUnmount() {

        window.removeEventListener('contextmenu', () => { });
        // window.removeEventListener("mousedown", () => { });
        window.removeEventListener("selectstart", () => { });

    }
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">

                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />


                    <div className="content-wrapper pt-0">
                        <ChepterHeaderSectionTwo
                            getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                        />
                        <Container fluid={true}>

                            <InnerRevisionMaterial

                                stateData={this.state}

                                getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                            />

                        </Container>


                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter((RevisionMaterial));
