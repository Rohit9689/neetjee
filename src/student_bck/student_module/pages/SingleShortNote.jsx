import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import SingleShortNoteSection from '../components/learn_practice/revision_materials/concepts/SingleShortNoteSection'
import ChepterHeaderSectionThree from '../components/learn_practice/top_header/ChepterHeaderSectionThree'
import { Container } from 'react-bootstrap';
import { withRouter } from "react-router-dom";


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';



const FETCH_GLOBALS = gql` 
query($mobile: String!) {
    studentGlobals(mobile: $mobile){
        reports{
            id
            report
        }
        tags{
            id
            tag
            type
            count
        }
        contentTypes{
            id
            customcontent
        }
    }
}

`;

class SingleShortNote extends Component {
    constructor(props){
        super(props);
        this.state={
            views:""
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
        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;
        if (error3 !== undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading3 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    {
                         !loading3 && (
                            <div className="content-wrapper pt-0">
                                <ChepterHeaderSectionThree
                                   getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                <Container fluid={true}>
                                    <SingleShortNoteSection
                                    stateData={this.state}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                    />
                                </Container>
                            </div>
                        )}

                </div>
            </React.Fragment>
        )
    }
}



export default
    compose(

        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    }
                }), name: "studentGlobals"
            })


    )(SingleShortNote);
