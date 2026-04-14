import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import NotesSingleMaterialRevisionsSection from '../components/notes/notes_shortnotes_materials/NotesSingleMaterialRevisionsSection';
import * as Cookies from "es-cookie";


class NotesSingleMaterialRevisions extends Component {
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
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar />
                    <div className="content-wrapper">
                        {/* <BookmarkHeaderSection /> */}
                        <NotesSingleMaterialRevisionsSection
                         stateData={this.state}
                            getData={this.props.history.location.state != undefined ? this.props.history.location.state : ""} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default NotesSingleMaterialRevisions
