import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import NotesShortnoteMaterialsSection from '../components/notes/notes_shortnotes_materials/NotesShortnoteMaterialsSection';
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
        contentTypes{
            id
            customcontent
        }
    }
}

`;

class NotesShortnotesMaterials extends Component {
    constructor(props) {
        super(props)
        let tagid = "";
        if (props.history.location.state.tagid != "") {
            tagid = props.history.location.state.tagid;
        }

        let subjectid = 0;
        if (props.history.location.state.subjectid != "") {
            subjectid = props.history.location.state.subjectid;
        }
        let defaultActiveKey = "first"
       
        if(props.history.location.state.defaultActiveKey!=undefined){
            defaultActiveKey=props.history.location.state.defaultActiveKey;
        }

        this.state = {
            subjectId: subjectid,
            chapterId: 0,
            tags: tagid,
            defaultActiveKey: defaultActiveKey
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
    handleSelectInputChange = (name, value) => {
        console.log("handleSelectInputChange", "name", name, "value", value);
        this.setState({ [name]: value });
    }
    TaghandleSelectInputChange = e => {
        //console.log("TaghandleSelectInputChange", e);
        let tagsValues = Array();
        if (e != null) {
            for (let i = 0; i < e.length; i++) {
                const tagval = e[i];
                tagsValues.push(tagval.value);
            }
            this.setState({
                tags: tagsValues.toString()
            });
        }
        //console.log("tagsValues", tagsValues);

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
        console.log("currentState", this.state);
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        return (
            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading3 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    <div className="content-wrapper pt-0">
                        {/* <BookmarkHeaderSection />
                    <NotesShortnoteMaterialsSection /> */}
                        {
                            !loading3 && (
                                <React.Fragment>
                                    <BookmarkHeaderSection
                                        type="notes"
                                        ctype="short"
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getSubjects={globalsubjects}
                                        phandleSelectInputChange={this.handleSelectInputChange}
                                        pTaghandleSelectInputChange={this.TaghandleSelectInputChange}
                                        stateData={this.state}
                                    />
                                    <NotesShortnoteMaterialsSection
                                        getData={this.props.history.location.state}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        stateData={this.state}
                                    />
                                </React.Fragment>
                            )
                        }
                    </div>
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
                    },
                    fetchPolicy: "cache-and-network"
                }), name: "studentGlobals"
            })
    )(NotesShortnotesMaterials);
