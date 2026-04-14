import React, { Component } from 'react'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import BookmarkHeaderSection from '../components/bookmarks/bookmark_videos/BookmarkHeaderSection'
import NotesPracticeQuestionsSection from '../components/notes/practice_questions/NotesPracticeQuestionsSection';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import { withRouter } from "react-router-dom";

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

class NotesPracticeQuestions extends Component {
    constructor(props) {
        super(props)
        let tagid = "";
        console.log("NotesPracticeQuestions",props.history.location.state);
        if (props.history.location.state.tagid != undefined) {
            tagid = props.history.location.state.tagid;
        }

        let subjectid = 0;
        if (props.history.location.state.subjectid != undefined) {
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
    }
    render() {
        console.log("BookmarkPracticeQuestions", this.props.history.location.state);
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
                        <NotesPracticeQuestionsSection /> */}
                        {
                            !loading2 && (
                                <React.Fragment>
                                    <BookmarkHeaderSection
                                        type="notes"
                                        ctype="practise"
                                        studentGlobals={studentGlobals.studentGlobals}
                                        getSubjects={getSubjects.getSubjects}
                                        phandleSelectInputChange={this.handleSelectInputChange}
                                        pTaghandleSelectInputChange={this.TaghandleSelectInputChange}
                                        stateData={this.state}
                                    />
                                    <NotesPracticeQuestionsSection
                                        getData={this.props.history.location.state}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        stateData={this.state}
                                        contentType="99"
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
withRouter(compose(
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
    )(NotesPracticeQuestions));
