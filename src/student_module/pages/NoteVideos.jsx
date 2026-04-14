import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import NotesVideoSection from '../components/notes/notes_videos/NotesVideoSection';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

const FETCH_SUBJECTS = gql`
  query($mobile: String,
        $exam_id: Int,
        $class_id: Int) {
        getSubjects(mobile: $mobile,
        exam_id: $exam_id,
        class_id: $class_id){
            id
            subject
            studentChapters{
                id
                chapter
                topics{
                    id
                    topic
                    practice_percentage
                }
                class
                weightage
                total_questions
                attempted_questions
                error_questions
            }
            practice_percentage
        }
    }
    
`;

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

class NoteVideos extends Component {
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
        this.state = {
            subjectId: subjectid,
            chapterId: 0,
            tags: tagid
        }

    }
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
        const getSubjects = this.props.getSubjects;
        const loading2 = getSubjects.loading;
        const error2 = getSubjects.error;

        const studentGlobals = this.props.studentGlobals;
        const loading3 = studentGlobals.loading;
        const error3 = studentGlobals.error;

        if (error2 != undefined || error3 != undefined) {
            alert("Server Error. " + error2.message + error3.message);
            return null;
        }
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()}/>
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        {/* <BookmarkHeaderSection />
                        <NotesVideoSection /> */}
                        {
                            !loading2 && (
                                <React.Fragment>
                                    <BookmarkHeaderSection
                                        type="notes"
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getSubjects={getSubjects.getSubjects}
                                        phandleSelectInputChange={this.handleSelectInputChange}
                                        pTaghandleSelectInputChange={this.TaghandleSelectInputChange}
                                        stateData={this.state}
                                    />
                                    <NotesVideoSection
                                        getData={this.props.history.location.state}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        stateData={this.state}
                                    />
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
        graphql(FETCH_SUBJECTS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    },
                }), name: "getSubjects"
            }),
        graphql(FETCH_GLOBALS,
            {
                options: props => ({
                    variables: {
                        mobile: Cookies.get("mobile")
                    },
                }), name: "studentGlobals"
            })
    )(NoteVideos);
