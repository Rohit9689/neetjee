import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import NotesSingleShortNoteMaterialRevisionsSection from '../components/notes/notes_shortnotes_materials/NotesSingleShortNoteMaterialRevisionsSection';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

const FETCH_GLOBALS = gql` 
query($mobile: String!) {
    studentGlobals(mobile: $mobile){
        tags{
            id
            tag
            type
            count
        }
        
    }
}

`;


class NotesSingleShortNoteMaterialRevisions extends Component {
    
    menuToggler = () => {
        const toggled = Cookies.get("toggle");
         if (toggled === "wrapper") {
             this.setState({toggled:"wrapper sidebar-enable"});
             Cookies.set("toggle", "wrapper sidebar-enable");
         } else {
             this.setState({toggled:"wrapper"});
             Cookies.set("toggle", "wrapper");
         }
     };
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

        if (error3 != undefined) {
            alert("Server Error. " + error3.message);
            return null;
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading3 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()}/>
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        {
                            !loading3 && (
                                <React.Fragment>
                                    <NotesSingleShortNoteMaterialRevisionsSection
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                                </React.Fragment>
                            )
                        }

                    </div>
                </div>
            </div>
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
                    },
                }), name: "studentGlobals"
            })
    )(NotesSingleShortNoteMaterialRevisions);
