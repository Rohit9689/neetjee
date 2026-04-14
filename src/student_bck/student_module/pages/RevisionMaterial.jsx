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
class RevisionMaterial extends Component {
    constructor(props) {
        super(props)
        let defaultActiveKey = "first";
        console.log("props.history.location.state.defaultActiveKey", props.history.location.state);
        if (props.history.location.state != undefined) {
            if(props.history.location.state.defaultActiveKey!=undefined){
                defaultActiveKey = props.history.location.state.defaultActiveKey;
            }
            
        }
        this.state = {
            defaultActiveKey: defaultActiveKey,
            page: 1
        }
    }
    componentDidMount() {
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
        console.log("RevisionMaterial",this.props.history.location.state);
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    
                    <AsideNavbar />

                    
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
            </React.Fragment>
        )
    }
}

export default withRouter((RevisionMaterial));
