import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import RevisionMaterialSection from '../components/learn_practice/revision_materials/RevisionMaterialSection'
import ChepterHeaderSectionTwo from '../components/learn_practice/top_header/ChepterHeaderSectionTwo';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

const FETCH_GLOBALS = gql` 
query($mobile: String) {
    studentGlobals(mobile: $mobile){
        reports{
            id
            report
        }
        tags{
            id
            tag
            type
        }
        
    }
}

`;

class RevisionMaterial extends Component {

    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;

        //if (loading1 || loading2) return null;


        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        console.log("RevisionMaterial", this.props.history.location.state);
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper pt-0">
                        <ChepterHeaderSectionTwo
                            getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                        />
                        <Container fluid={true}>
                            {
                                !loading2 && (
                                    <RevisionMaterialSection
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                    />)
                            }
                        </Container>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(compose(
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
            }), name: "studentGlobals"
        }))(RevisionMaterial));
