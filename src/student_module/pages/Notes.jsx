import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import NotesSection from '../components/notes/NotesSection';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import Note from "../../images/notes.svg"
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo'
import { withRouter } from "react-router-dom";
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';


const FETCH_ISSTUDENTUSERVALID = gql` 
query($mobile: String) {
    isStudentUserValid(mobile: $mobile){
        estatus
        current_plan_id
        expiry_date
        app_version
        user_access_restictions
     }
}

`;

const FETCH_NOTESCOUNT = gql` 
query($mobile: String!) {
    getStudentNotesCount(mobile: $mobile){
        video_count
        short_notes_count
        practice_questions_count
        exam_questions_count
        notes_subjects_count{
            id
            subject_name
            count
            shortnotes_count
            practice_count
            exam_count
}
        
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
    }
}

`;
const FETCH_GETSTUDENTTAGS = gql` 
query($mobile: String, $type: String, $subject_id: Int) {
    getStudentTags(mobile: $mobile , type: $type , subject_id: $subject_id){
            id
            tag
            type
            count
            shortnotes_count
            practice_count
            exam_count
            subject_tag_count{
                id
                subject
                shortnotes_count
                practice_count
                exam_count
            }
        
    }
}

`;
class Notes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: Note,
                Title: "Notes",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Notes;
        ReactGA.pageview('/student/notes', ["ELAPP"], title);
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
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const getStudentTags = this.props.getStudentTags;
        const loading6 = getStudentTags.loading;
        const error6 = getStudentTags.error;

        const getStudentNotesCount = this.props.getStudentNotesCount;
        const loading1 = getStudentNotesCount.loading;
        const error1 = getStudentNotesCount.error;

        const studentGlobals = this.props.studentGlobals;
        const loading2 = studentGlobals.loading;
        const error2 = studentGlobals.error;

        const isStudentUserValid = this.props.isStudentUserValid;
        const loading5 = isStudentUserValid.loading;
        const error5 = isStudentUserValid.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }

        if (error5 !== undefined) {
            alert("Server Error. " + error5.message);
            return null;
        }

        if (error6 !== undefined) {
            alert("Server Error. " + error6.message);
            return null;
        }
        console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
        if (isStudentUserValid.isStudentUserValid != undefined) {
            if (isStudentUserValid.isStudentUserValid.estatus == 0) {
                Cookies.remove("token");
                Cookies.remove("username");
                Cookies.remove("refreshtoken");
                Cookies.remove("email");
                Cookies.remove("id");
                Cookies.remove("institutionid");
                Cookies.remove("userlevel");
                Cookies.remove("name");
                this.props.history.push("/student/login");
            }
        }
        localStorage.removeItem('getStudentNotesCount');
        localStorage.setItem(
            "getStudentNotesCount",
            JSON.stringify(getStudentNotesCount.getStudentNotesCount)
        );

        localStorage.removeItem('ngetStudentTags');
        localStorage.setItem(
            "ngetStudentTags",
            JSON.stringify(getStudentTags.getStudentTags)
        );
        return (
            <div className={Cookies.get("toggle")}>
                <div className="student main-wrapper">
                    <div className="student header-area notes-topnavbar">
                        <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.menuToggler()} />
                    </div>
                    {(loading1 == true || loading2 == true || loading5 == true || loading6 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">

                        <Container>
                            {
                                !loading1 && !loading2 && !loading5 && !loading6 && (
                                    <NotesSection
                                        isStudentUserValid={isStudentUserValid.isStudentUserValid}
                                        getStudentNotesCount={getStudentNotesCount.getStudentNotesCount} studentGlobals={studentGlobals.studentGlobals} />)
                            }
                        </Container>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(compose(
    graphql(FETCH_ISSTUDENTUSERVALID,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                }
                ,
                fetchPolicy: 'network-only'
            }), name: "isStudentUserValid"
        }),
    graphql(FETCH_NOTESCOUNT,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")

                },
            }), name: "getStudentNotesCount"
        }),
    graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
            }), name: "studentGlobals"
        }),
    graphql(FETCH_GETSTUDENTTAGS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    type: "notes",
                    subject_id: 0
                },
                fetchPolicy: "no-cache"
            }), name: "getStudentTags"
        }))(Notes));
