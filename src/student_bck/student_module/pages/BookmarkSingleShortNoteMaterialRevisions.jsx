import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import BookmarkSingleShortNoteMaterialRevisionsSection from '../components/bookmarks/bookmark_shortnotes_materials/BookmarkSingleShortNoteMaterialRevisionsSection';


import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';



class BookmarkSingleShortNoteMaterialRevisions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: ""
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
            let studentGlobals = "";
            if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
                studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
            }
            else {
                this.props.history.push("/student/login");
            }
            console.log("studentGlobalsl",studentGlobals)
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        {/* <BookmarkHeaderSection
                            studentGlobals={studentGlobals.studentGlobals}
                            getSubjects={getSubjects.getSubjects}
                            phandleSelectInputChange={this.handleSelectInputChange}
                            pTaghandleSelectInputChange={this.TaghandleSelectInputChange}
                            stateData={this.state}
                        /> */}
                        <BookmarkSingleShortNoteMaterialRevisionsSection
                        studentGlobals={studentGlobals}
                            stateData={this.state}
                            getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default (BookmarkSingleShortNoteMaterialRevisions);
