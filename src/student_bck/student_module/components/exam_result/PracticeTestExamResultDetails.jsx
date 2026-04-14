import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { components } from 'react-select'
import { Container, Row, Col, Button, Card, Navbar, Nav, NavDropdown, Image, Table } from 'react-bootstrap'
import '../exams/_resultmodel.scss'
import '../navbars/_navbars.scss'
import ChangePwdModaldModal from '../Profile/ChangePwdModal'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import parse, { domToReact } from 'html-react-parser';
import QuestionTypeTable from "./QuestionTypeTable";
import ChapterTable from "./ChapterTable";
import SubjectWiseTable from "./SubjectWiseTable";
import ExamResultDetails from "./ExamResultDetails";
// Subject
const subjects = [
    { value: 1, label: 'Subject-1' },
    { value: 2, label: 'Subject-2' },
    { value: 3, label: 'Subject-3' }
];

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <i className="fal fa-angle-down" />
            </components.DropdownIndicator>
        )
    );
};
const FETCH_SESSION_DATA = gql`
  query(
          $mobile: String!, $exam_session_id: ID) {
            getStudentExamSessions(mobile: $mobile, exam_session_id: $exam_session_id){
              id
              correct_marks
              negative_marks
              total_marks
              speed
             subject_report{
                id
                subject
                correct
                wrong
                not_answered
                pMarks
                nMarks
                accuracy
                total_time
                in_time
                less_time
                over_time
                speed

                observations{
                    theoryObservation
                    qtypeObservation
                    complexityObservation
                }
               }
               chapter_report{
                subject
                subject_name
                chapter_name
                correct
                wrong
                not_answered
                total
                accuracy
              }
              correct_vs_complexity{
                complexity
                in_time
                less_time
                over_time
                in_total_time
                less_total_time
                over_total_time
              }
              wrong_vs_complexity{
                complexity
                in_time
                less_time
                over_time
                in_total_time
                less_total_time
                over_total_time
              }
              error_report{
                error
                error_name
                count
                error_subject_count{
                    id
                    subject
                    count
                }
              }
              qtype_report{
                question_type
                question_type_name
                accuracy
                correct
                wrong
                not_answered
                total_time
                qtype_correct_report{
                    id
                    subject
                    count 
                }
                qtype_wrong_report{
                    id
                    subject
                    count 
                }
                qtype_skipped_report{
                    id
                    subject
                    count 
                }
                
              }
              theory_report{
                question_theory_name
                correct
                wrong
                not_answered
                accuracy
                total_time
              }
            }
      }
`;
class PracticeTestExamResultDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchSubject: 0,
            searchSubjectvalue: { value: "0", label: "ALL Subjects" }
        }
    }
    handleSelectInputChange = (name, value) => {
        console.log("handleSelectInputChange", name, value);
        if (name == "searchSubject") {
            let subjectData = this.props.getStudentExamSessions.getStudentExamSessions[0].subject_report.find((a) => a.id == value);
            if (value != 0) {
                this.setState({
                    searchSubjectvalue: { value: subjectData.id, label: subjectData.subject }
                });
            }
            else {
                this.setState({
                    searchSubjectvalue: { value: "0", label: "ALL Subjects" }
                });
            }

        }

        this.setState({
            [name]: value
        });
    }
    subjectFunction(data) {
        let newArray = [];
        if (this.state.searchSubject != "0") {
            const newObj1 = {
                label: "ALL Subjects",
                value: "0"
            }
            newArray.push(newObj1);
        }
        data.map((item) => {
            if (item != undefined) {
                const newObj = {
                    label: item.subject,
                    value: item.id
                }
                newArray.push(newObj);


            }

        })
        return newArray;

    }
    parseFun(str) {
        if (str != undefined || str != "") {
            try {
                return parse(str);
            } catch (ex) {
                return false;
            }
        }
        else {
            return null;
        }

    }
    minutesTimer(time) {
        var hr = ~~(time / 3600);
        var min = ~~((time % 3600) / 60);
        var sec = time % 60;
        var sec_min = "";
        if (hr > 0) {
            sec_min += "" + hr + ":" + (min < 10 ? "0" : "");
        }
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return parseInt(sec_min);
    }
    subjectThemefun(sid) {
        if (sid == "1") {
            return "text-success";
        }
        else if (sid == "2") {
            return "theme-red";
        }
        else if (sid == "3") {
            return "text-primary";
        }
        else if (sid == "4") {
            return "text-dark";
        }
        else if (sid == "5") {
            return "text-warning";
        }

    }
    subjectIconfun(sid) {
        if (sid == "1") {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="28.61" height="78.018" viewBox="0 0 28.61 78.018"><path fill="#3AC555" d="M32.022,128.356v3.889c-1.066,0-2.088-.016-3.107,0-.972.019-2.243-.2-2.227,1.268.016,1.363,1.224,1.148,2.148,1.158.987.009,1.975,0,3.107,0v4.306c-1.792,0-3.605.013-5.419,0-.937-.009-1.968.009-1.927,1.24.038,1.208,1.091,1.2,2.009,1.192,1.763-.006,3.53,0,5.384,0v4.249c-1.268,0-2.5.009-3.741,0-.9-.006-1.719.3-1.524,1.278.095.476.94,1.044,1.508,1.129a26.253,26.253,0,0,0,3.719.054v4.239c-1.855,0-3.669.006-5.482,0-.959-.006-1.937.114-1.88,1.325.05,1.117,1.022,1.129,1.9,1.123,1.817-.013,3.637,0,5.432,0,.53,5.949-5.179,11.394-11.406,11.075A10.989,10.989,0,0,1,9.957,154.919c-.057-8.321,0-16.645-.047-24.967-.006-1.085.416-1.577,1.391-1.58C18.149,128.347,25,128.356,32.022,128.356Z" transform="translate(-6.784 -87.867)" /><path fill="#3AC555" d="M13.078,30.392V24.272c-.833-.148-1.643-.268-2.445-.432A13.358,13.358,0,0,1,.069,10.418C.1,9.172.65,8.75,1.807,8.775a14.1,14.1,0,0,1,10.356,4.517c.237.249.464.508.776.852a42.683,42.683,0,0,1,.691-4.3A13.336,13.336,0,0,1,26.355,0c1.918-.009,2.161.246,2.1,2.2A13.192,13.192,0,0,1,16.961,15.112c-.464.066-.921.158-1.442.249v14.8c.558.032,1.107.085,1.653.088,2.514.019,5.031-.069,7.539.057a4.018,4.018,0,0,1,3.9,4.123,3.968,3.968,0,0,1-4.047,3.952q-10.286.085-20.579,0A3.891,3.891,0,0,1,0,34.388,3.967,3.967,0,0,1,4.151,30.4C7.072,30.363,9.993,30.392,13.078,30.392Z" transform="translate(0 0.001)" /></svg>);
        }
        else if (sid == "2") {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="50.165" height="60.877" viewBox="0 0 50.165 60.877"><path fill="#F05D70" d="M25.089,60.858c-5.929,0-11.857-.025-17.786.011-2.77.018-5.128-.708-6.531-3.287s-.761-4.912.8-7.236q7.57-11.231,14.992-22.564a5.088,5.088,0,0,0,.8-2.582q.1-9.86,0-19.723c-.007-.691-.606-1.36-.85-2.068-.237-.68-.666-1.5-.467-2.065A2.291,2.291,0,0,1,17.7.065q7.395-.149,14.79,0a2.247,2.247,0,0,1,1.619,1.3c.195.574-.227,1.385-.464,2.065-.244.7-.843,1.356-.85,2.036q-.1,9.86,0,19.723a5.036,5.036,0,0,0,.793,2.582q7.533,11.47,15.194,22.854c1.47,2.185,1.884,4.424.7,6.789-1.229,2.461-3.411,3.435-6.077,3.439Q34.244,60.865,25.089,60.858ZM19.447,2.314c-.089,1.367-.234,2.631-.237,3.9-.025,6.4.032,12.8-.053,19.189a6.08,6.08,0,0,1-.942,3.074q-7.565,11.549-15.282,23c-1.126,1.679-1.661,3.365-.641,5.256S5.058,59.08,7.055,59.08q18.046-.021,36.093,0c2,0,3.765-.471,4.742-2.387.956-1.87.457-3.574-.68-5.266q-7.708-11.454-15.286-23a5.657,5.657,0,0,1-.864-2.908c-.071-7.714-.043-15.435-.043-23.283.22-.042.7-.135,1.176-.223-.011-.064-.018-.127-.028-.191H17.935c-.007.064-.018.127-.025.191Z" transform="translate(0 0.009)" /><path fill="#F05D70" d="M34.383,116.339c-.209-1.916.921-2.954,2.5-3.549,2.019-.758,3.5.216,4.71,1.76,1.25-.641,2.49-1.279,3.839-1.969,2.6,3.945,5.238,7.685,7.593,11.592a3.945,3.945,0,0,1-3.443,5.929q-17.526.08-35.048-.007a3.961,3.961,0,0,1-3.361-6c2.614-4.232,5.468-8.319,8.316-12.608a68.28,68.28,0,0,0,6.343,2.646c2.819.875,5.73,1.438,8.6,2.139-.34,1.8.627,2.911,2.075,3.641a3.789,3.789,0,0,0,5.2-4.625C39.157,115.662,36.77,116,34.383,116.339Zm-6.623,7.827a2.529,2.529,0,0,0,2.522-2.578,2.584,2.584,0,0,0-2.536-2.592,2.585,2.585,0,1,0,.014,5.171Z" transform="translate(-6.843 -72.001)" /><path fill="#F05D70" d="M65.614,81.77c.808,2.823.021,4.756-2.121,5.387a3.578,3.578,0,0,1-4.53-2.539c-.6-2.125.73-3.857,3.63-4.671-.057-1.413.436-2.7,1.959-2.8a3.136,3.136,0,0,1,2.408,1.247C67.874,79.879,66.9,81.009,65.614,81.77Z" transform="translate(-37.99 -49.818)" /><path fill="#F05D70" d="M69.837,46.722c-.691.457-1.456,1.349-2.058,1.254a2.436,2.436,0,0,1-1.64-1.742c0-.591,1.038-1.573,1.7-1.65.609-.071,1.335.836,2.008,1.314C69.848,46.173,69.841,46.449,69.837,46.722Z" transform="translate(-42.716 -28.788)" /><path fill="#F05D70" d="M68.659,27.36c.623.776,1.332,1.307,1.25,1.64-.127.51-.8.885-1.243,1.317-.393-.414-1.052-.8-1.1-1.25C67.515,28.649,68.114,28.157,68.659,27.36Z" transform="translate(-43.634 -17.667)" /></svg>);
        }
        else if (sid == "3") {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="59.154" height="59.205" viewBox="0 0 59.154 59.205"><path fill="#0060CE" d="M32.549,14.2c.184-.755.355-1.5.545-2.235a25.763,25.763,0,0,1,3.457-8.493,11.372,11.372,0,0,1,2.5-2.584,4.277,4.277,0,0,1,5.281.037,26.4,26.4,0,0,1,2.125,1.893A5,5,0,0,1,51.28,2.7a5.21,5.21,0,0,1,2.591,2.87,5.364,5.364,0,0,1-3.489,7c.12.517.243,1.043.384,1.645.329-.087.618-.16.9-.241A30.015,30.015,0,0,1,61.2,12.489a12.944,12.944,0,0,1,3.792.712,4.712,4.712,0,0,1,2.993,5.963,16.212,16.212,0,0,1-3.991,6.666c-1.174,1.306-2.448,2.523-3.738,3.842.4.368.832.758,1.253,1.163a26.323,26.323,0,0,1,5.8,7.378,7.018,7.018,0,0,1,.851,3.811,5.031,5.031,0,0,1-4.094,4.349c-.085.02-.172.033-.28.053-.061.409-.1.82-.187,1.224A5.187,5.187,0,0,1,53.319,46.53c.019-.7-.185-.969-.832-1.077-.554-.093-1.093-.279-1.684-.435-.329,1.281-.61,2.518-.967,3.733a22.261,22.261,0,0,1-3.715,7.944,5.563,5.563,0,0,1-4.7,2.5,5.752,5.752,0,0,1-4.19-2.458,18.776,18.776,0,0,1-3.2-6.31c-.507-1.586-.89-3.211-1.33-4.819-.045-.167-.087-.333-.15-.574l-4.479,1.144a3.271,3.271,0,0,1-.877,2.483,3.209,3.209,0,0,1-5.459-1.326c-.127-.471-.337-.606-.822-.711a14.525,14.525,0,0,1-3.373-1.011,4.578,4.578,0,0,1-2.191-5.533,16.152,16.152,0,0,1,3.988-6.667c1.175-1.306,2.448-2.523,3.742-3.846-.41-.38-.861-.783-1.3-1.205a25.947,25.947,0,0,1-5.775-7.392,6.947,6.947,0,0,1-.8-3.946,4.549,4.549,0,0,1,2.886-3.727,12.068,12.068,0,0,1,5.823-.767,38.152,38.152,0,0,1,8.256,1.613A3.048,3.048,0,0,0,32.549,14.2Zm17.44,15.422h-.005c0-1.5.017-2.992-.019-4.485a.917.917,0,0,0-.409-.648q-3.7-2.084-7.443-4.1a1.1,1.1,0,0,0-.9,0q-3.743,2.01-7.44,4.1a.972.972,0,0,0-.413.708q-.042,4.42,0,8.838a.9.9,0,0,0,.361.673q3.759,2.116,7.558,4.163a.957.957,0,0,0,.777,0q3.8-2.048,7.558-4.164a.842.842,0,0,0,.361-.609C50,32.611,49.989,31.116,49.989,29.619ZM34.6,44.432c.323,1.256.61,2.562,1,3.837a20.5,20.5,0,0,0,3.456,7.268c.056.067.111.136.169.2,1.565,1.758,3.392,1.809,4.866-.03a19.014,19.014,0,0,0,2.2-3.574,32.123,32.123,0,0,0,2.4-7.724c-2.313-.97-4.573-1.921-6.839-2.858a.642.642,0,0,0-.431.042C39.19,42.517,36.964,43.447,34.6,44.432ZM24.74,28.185c1.766-1.283,3.415-2.573,5.161-3.711a2.84,2.84,0,0,0,1.584-2.507c.064-1.856.4-3.7.627-5.626-.759-.209-1.535-.435-2.315-.636a24.693,24.693,0,0,0-8.336-.991,9.68,9.68,0,0,0-2.779.713,2.068,2.068,0,0,0-1.33,2.281,7.417,7.417,0,0,0,.532,2.15C19.428,23.239,22.059,25.736,24.74,28.185Zm33.872-.042a30.329,30.329,0,0,0,6.008-6.748,12.3,12.3,0,0,0,1.27-2.872,2.513,2.513,0,0,0-1.733-3.35,6.271,6.271,0,0,0-2.239-.458,49.664,49.664,0,0,0-5.767.425c-1.678.245-3.316.762-4.907,1.144.255,2.379.491,4.626.749,6.87a.851.851,0,0,0,.322.523C54.386,25.16,56.468,26.628,58.612,28.143ZM24.6,31.015c-1.512,1.638-3.109,3.272-4.593,5a11.328,11.328,0,0,0-2.566,4.627,2.557,2.557,0,0,0,1.8,3.427,13.815,13.815,0,0,0,2.509.475.835.835,0,0,0,.6-.257,3.174,3.174,0,0,1,4.493-.413.767.767,0,0,0,.505.2c1.6-.361,3.187-.753,4.726-1.123-.251-2.378-.483-4.623-.74-6.867a.854.854,0,0,0-.325-.524C28.947,34.082,26.865,32.616,24.6,31.015ZM48.7,14.863c-.13-.557-.292-1.1-.377-1.663a.726.726,0,0,0-.642-.679A5.252,5.252,0,0,1,44.3,5.176c.46-.974.471-.983-.28-1.758a6.249,6.249,0,0,0-.962-.8,2.17,2.17,0,0,0-2.65-.056,8.2,8.2,0,0,0-1.819,1.778,25.028,25.028,0,0,0-3.523,8.6c-.168.65-.294,1.309-.431,1.926a47.414,47.414,0,0,1,4.9,1.99,4.157,4.157,0,0,0,4.332-.012A49.3,49.3,0,0,1,48.7,14.863ZM51.221,42.9c.852.236,1.711.492,2.581.7a.674.674,0,0,0,.531-.23c2.583-3.108,6.655-2.821,8.762.615a.686.686,0,0,0,.549.279,2.72,2.72,0,0,0,2.327-2.878,6.906,6.906,0,0,0-.638-2.257c-1.585-3.246-4.129-5.7-6.778-8.1-.209.155-.382.284-.557.413-1.52,1.122-2.993,2.321-4.581,3.34a2.839,2.839,0,0,0-1.571,2.517C51.774,39.147,51.447,40.991,51.221,42.9Zm7.313,6.8a3.221,3.221,0,0,0,3.075-3.228A3.185,3.185,0,0,0,58.5,43.351a3.223,3.223,0,0,0-3.079,3.228A3.189,3.189,0,0,0,58.534,49.692ZM52.1,7.439a3.1,3.1,0,1,0-6.19-.144,3.1,3.1,0,0,0,6.19.144Zm.142,25.614L56.929,29.6,52.24,26.17Zm-21.146.02v-6.9l-4.683,3.461ZM34.2,17c-.222,1.736-.426,3.329-.644,5.044l5.593-3.084C37.484,18.3,35.906,17.674,34.2,17ZM49.783,37.193l-5.6,3.091,4.948,1.938C49.358,40.491,49.562,38.906,49.783,37.193Zm-5.6-18.238,5.59,3.076c-.228-1.737-.437-3.337-.656-5.025C47.431,17.67,45.866,18.288,44.182,18.955ZM34.2,42.229l4.933-1.958L33.551,37.2C33.772,38.916,33.978,40.511,34.2,42.229Zm-9.353,5.344a1.176,1.176,0,0,0,1.094-1.18,1.117,1.117,0,0,0-2.233.044A1.182,1.182,0,0,0,24.846,47.573Z" transform="translate(-13.145 0.009)" /><path fill="#0060CE" d="M84.06,24.759a4.225,4.225,0,1,1,4.2-4.313A4.194,4.194,0,0,1,84.06,24.759Zm0-2.109a2.113,2.113,0,1,0-2.136-2.075A2.166,2.166,0,0,0,84.059,22.65Z" transform="translate(-69.249 -14.15)" /><path fill="#0060CE" d="M6.332,203.165a3.136,3.136,0,0,1-3.252,3.148,3.168,3.168,0,0,1,.172-6.334A3.131,3.131,0,0,1,6.332,203.165Zm-2.112-.017a1.114,1.114,0,0,0-1.053-1.056,1.054,1.054,0,1,0,0,2.108A1.106,1.106,0,0,0,4.22,203.148Z" transform="translate(0 -173.519)" /><path fill="#0060CE" d="M402.381,206.322a3.166,3.166,0,1,1,3.171-3.228A3.131,3.131,0,0,1,402.381,206.322Zm1.06-3.134a1.117,1.117,0,0,0-1.023-1.086,1.1,1.1,0,0,0-1.085,1.021,1.118,1.118,0,0,0,1.023,1.086A1.1,1.1,0,0,0,403.441,203.188Z" transform="translate(-346.398 -173.528)" /><path fill="#0060CE" d="M186.209,189.341a5.28,5.28,0,1,1-5.221-5.322A5.244,5.244,0,0,1,186.209,189.341Zm-2.109-.034a3.17,3.17,0,1,0-3.228,3.162A3.229,3.229,0,0,0,184.1,189.307Z" transform="translate(-152.409 -159.671)" /></svg>);
        }
        else if (sid == "4") {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#707070" d="m21.25 24h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-18.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v18.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-22.5c-.689 0-1.25.561-1.25 1.25v18.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-18.5c0-.689-.561-1.25-1.25-1.25z" /><path fill="#707070" d="m12 24c-.414 0-.75-.336-.75-.75v-22.5c0-.414.336-.75.75-.75s.75.336.75.75v22.5c0 .414-.336.75-.75.75z" /><path fill="#707070" d="m23.25 12.75h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z" /><path fill="#707070" d="m6 9c-.414 0-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75s.75.336.75.75v3.5c0 .414-.336.75-.75.75z" /><path fill="#707070" d="m7.75 7.25h-3.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.5c.414 0 .75.336.75.75s-.336.75-.75.75z" /><path fill="#707070" d="m4.75 20c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.061l2.5-2.5c.293-.293.768-.293 1.061 0s.293.768 0 1.061l-2.5 2.5c-.147.147-.339.22-.531.22z" /><path fill="#707070" d="m7.25 20c-.192 0-.384-.073-.53-.22l-2.5-2.5c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l2.5 2.5c.293.293.293.768 0 1.061-.147.147-.339.22-.531.22z" /><path fill="#707070" d="m20.25 7h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z" /><path fill="#707070" d="m20.25 20h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z" /><path fill="#707070" d="m20.25 17h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z" /></svg>);
        }
        else if (sid == "5") {
            return (<svg xmlns="http://www.w3.org/2000/svg" width="62.309" height="56.395" viewBox="0 0 62.309 56.395"><g transform="translate(0 0)"><path fill="#C37800" d="M72.45,128.347h8.006c.161,0,.323,0,.483,0,.99.025,1.632.577,1.634,1.4,0,.862-.656,1.408-1.7,1.387q-5.49-.108-10.981-.224-7.251-.154-14.5-.317a8.27,8.27,0,0,1-1.171-.076,1.367,1.367,0,0,1-.707-2.347q1.823-2.12,3.707-4.191c1.285-1.413,2.65-2.756,3.89-4.206a12.711,12.711,0,0,0,3.31-7.006,40.854,40.854,0,0,0-.1-4.192,5.26,5.26,0,0,1,.215-1.8c1.336-3.671,2.726-7.323,4.1-10.982.032-.084.044-.176.114-.462-.251.288-.392.437-.516.6q-1.8,2.317-3.6,4.638c-.587.754-1.163.964-1.834.685s-.915-.846-.826-1.779c.284-2.978.635-5.953.8-8.938a8.853,8.853,0,0,0-3.418-7.5q-2.639-2.228-5.3-4.434a3.78,3.78,0,0,0-5.262-.014c-1.844,1.527-3.7,3.041-5.507,4.611a9.187,9.187,0,0,0-3.2,8.34c.274,2.655.521,5.313.76,7.971.089.991-.183,1.5-.858,1.762s-1.243.026-1.869-.781c-1.3-1.671-2.592-3.343-3.987-4.971a4.633,4.633,0,0,0,.126.462c1.377,3.681,2.777,7.354,4.116,11.05a3.5,3.5,0,0,1,.1,1.74c-.869,4.822.977,8.673,4.174,12.091,2.232,2.387,4.408,4.826,6.609,7.242a1.424,1.424,0,0,1-1.132,2.467q-9.324.2-18.646.4-3.763.081-7.527.169c-.976.021-1.562-.393-1.672-1.174a1.389,1.389,0,0,1,1.517-1.613q4.074-.087,8.15-.163a.7.7,0,0,0,.49-.141c-1.245-.278-2.488-.561-3.732-.836-1.055-.234-2.113-.457-3.167-.691a1.424,1.424,0,0,1-1.281-1.712c.169-.806.9-1.213,1.9-1,2.608.555,5.211,1.134,7.816,1.7,1.207.263,2.416.523,3.8.822-.2-.264-.282-.406-.393-.525q-4.622-4.994-9.249-9.981a5.469,5.469,0,0,1-.94-6.616c.269-.534.541-1.066.811-1.6a6.115,6.115,0,0,1,7.951-3.017l.606.245c-.118-.36-.2-.635-.3-.9C32.4,98.965,30.525,94,28.683,89.017a.9.9,0,0,0-.982-.72c-1.289.012-2.579-.033-3.868-.057-1.006-.019-1.6-.55-1.593-1.415s.6-1.359,1.634-1.362c.613,0,1.225,0,2.006,0-.406-.426-.71-.752-1.022-1.072-.353-.363-.728-.706-1.066-1.083a1.372,1.372,0,0,1,.012-2.03,1.388,1.388,0,0,1,1.981.1c.68.674,1.319,1.387,1.977,2.084L28,83.342c0-.656-.01-1.314,0-1.97.018-1.015.551-1.635,1.383-1.632s1.384.648,1.389,1.635c.007,1.52-.007,3.04.017,4.559a1.475,1.475,0,0,0,.231.825c2.085,2.723,4.192,5.43,6.3,8.139a3.713,3.713,0,0,0,.3.273c-.09-1.035-.14-1.928-.251-2.814a11.985,11.985,0,0,1,3.67-10.867c2.038-1.894,4.209-3.653,6.4-5.366a6.447,6.447,0,0,1,8.064.084c2.086,1.665,4.167,3.349,6.136,5.15A11.711,11.711,0,0,1,65.5,91.679c-.112,1.119-.2,2.241-.3,3.361l.2.172a2.645,2.645,0,0,1,.233-.469c2.013-2.6,4.041-5.2,6.039-7.813a1.815,1.815,0,0,0,.341-1c.039-1.427.018-2.855.022-4.283a4.631,4.631,0,0,1,.025-.62,1.387,1.387,0,0,1,2.77.073c.039.746.008,1.5.008,2.245.079.046.158.09.235.136.666-.717,1.314-1.452,2-2.144a1.391,1.391,0,0,1,1.714-.221A1.265,1.265,0,0,1,79.4,82.6a2.072,2.072,0,0,1-.527.858c-.611.642-1.261,1.247-2.045,2.011.871,0,1.5,0,2.135,0,1.013.006,1.625.53,1.623,1.383s-.627,1.375-1.627,1.394c-1.336.026-2.672.029-4.005.1a.935.935,0,0,0-.7.45c-1.978,5.2-3.925,10.409-5.875,15.619a1.676,1.676,0,0,0-.064.242,22.721,22.721,0,0,1,3-.482,5.684,5.684,0,0,1,5.312,3.105c.361.613.659,1.264.979,1.9a5.429,5.429,0,0,1-.9,6.62c-2.9,3.152-5.821,6.284-8.731,9.426A4.145,4.145,0,0,0,67.2,126.3c1.362-.292,2.726-.58,4.088-.878q3.6-.787,7.208-1.58c1.077-.235,1.815.087,2.034.882a1.389,1.389,0,0,1-1.16,1.786c-2.108.471-4.222.923-6.332,1.386-.2.043-.389.105-.584.158C72.45,128.147,72.45,128.246,72.45,128.347Zm-14.8-.677.071.26c1.139,0,2.281.026,3.419-.018a1.406,1.406,0,0,0,.872-.377c.966-.986,1.89-2.016,2.828-3.029q4.882-5.27,9.761-10.541a2.615,2.615,0,0,0,.505-3.559c-.288-.576-.577-1.15-.88-1.719a3.191,3.191,0,0,0-4.274-1.5c-.779.338-1.519.766-2.294,1.114a.715.715,0,0,0-.483.9,12.89,12.89,0,0,1-.158,4.867,20,20,0,0,1-5.7,9.6C60.039,124.95,58.865,126.333,57.646,127.67Zm-12.562.256.091-.258c-1.239-1.355-2.432-2.755-3.727-4.055a20.064,20.064,0,0,1-5.583-9.28,13.154,13.154,0,0,1-.269-4.8c.046-.393.291-.875-.282-1.149-.892-.425-1.755-.916-2.666-1.294a3.189,3.189,0,0,0-3.936,1.377c-.4.7-.746,1.426-1.108,2.144a2.591,2.591,0,0,0,.45,3.174q6.408,6.911,12.819,13.82a.841.841,0,0,0,.5.3C42.611,127.938,43.847,127.927,45.084,127.927Z" transform="translate(-20.263 -74.748)" /><path fill="#C37800" d="M257.335,136.1a17.9,17.9,0,0,1,.565-2.607c1.073-2.879.29-5.36-1.482-7.668-.085-.109-.193-.2-.276-.309-.27-.353-.342-.735.028-1.041a.649.649,0,0,1,1.022.163,25.071,25.071,0,0,1,1.98,3.289,7.329,7.329,0,0,1,.1,5.715,7.3,7.3,0,0,0-.242,4.268c.413,1.861.757,3.738,1.124,5.608.093.475.127.971-.5,1.1-.572.115-.749-.281-.843-.761-.43-2.21-.879-4.416-1.3-6.627a8.781,8.781,0,0,1-.075-1.1Z" transform="translate(-223.292 -117.436)" /><path fill="#C37800" d="M202.56,144.161c.3-1.566.569-2.942.839-4.317.155-.789.306-1.58.478-2.365a6.3,6.3,0,0,0-.277-3.6c-1.236-3.354-.291-6.266,1.791-8.951.07-.091.149-.174.228-.259a.686.686,0,0,1,1.033-.138c.379.316.285.676.015,1.034a16.384,16.384,0,0,0-1.121,1.567,7,7,0,0,0-.64,6.343,7.256,7.256,0,0,1,.342,4.074q-.631,3.213-1.258,6.426c-.083.422-.295.792-.773.684C202.953,144.6,202.74,144.305,202.56,144.161Z" transform="translate(-177.323 -117.49)" /><path fill="#C37800" d="M208.153,338.712c-.154.161-.348.533-.568.548a.956.956,0,0,1-.777-.446,13.36,13.36,0,0,1-.52-1.924c-.631-2.636-1.253-5.275-1.89-7.909-.114-.47-.145-.909.407-1.072s.793.193.908.677q1.171,4.892,2.348,9.783C208.078,338.435,208.1,338.5,208.153,338.712Z" transform="translate(-178.849 -292.828)" /><path fill="#C37800" d="M270.42,328.781c-.181.748-.328,1.35-.474,1.952q-.974,4.053-1.945,8.107c-.108.453-.288.9-.845.8-.572-.109-.64-.551-.511-1.076.64-2.61,1.263-5.223,1.892-7.837a15.826,15.826,0,0,1,.519-2,.974.974,0,0,1,.767-.465C270.039,328.263,270.249,328.618,270.42,328.781Z" transform="translate(-232.49 -293.164)" /><path fill="#C37800" d="M294.527,164.532c-.226,1.008-.465,2.149-.745,3.277-.113.458-.393.824-.945.634s-.516-.627-.359-1.08a8.571,8.571,0,0,0,.385-4.807c-.052-.234.258-.55.4-.826.291.156.766.256.836.482A17.907,17.907,0,0,1,294.527,164.532Z" transform="translate(-254.706 -149.688)" /><path fill="#C37800" d="M181.79,164.271c.147-.885.231-1.52.363-2.146.09-.424.36-.721.833-.623s.594.476.491.905a8.171,8.171,0,0,0,.349,4.663,1.928,1.928,0,0,1,.073.264c.079.395.039.752-.4.9a.652.652,0,0,1-.9-.509C182.29,166.509,182.025,165.282,181.79,164.271Z" transform="translate(-159.428 -149.476)" /></g></svg>);
        }

    }
    render() {
        const getStudentExamSessions = this.props.getStudentExamSessions;
        const loading1 = getStudentExamSessions.loading;
        const error1 = getStudentExamSessions.error;
        if (loading1) {
            return (
                <Col xl={12} lg={12} md={12}>
                    <Card as={Card.Body} className=" accurancy-table my-3 shadow border-0 mb-4 justify-content-center flex-row">
                        <div class="spinner-border text-primary text-center"></div>
                    </Card>
                </Col>
            )
        }
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        let sampleArray = [];
        const Data = getStudentExamSessions.getStudentExamSessions[0].subject_report.map((a) => {
            sampleArray.push(parseInt(a.accuracy));
        });
        const lowcount = Math.min(...sampleArray);
        const lowAccuracy = getStudentExamSessions.getStudentExamSessions[0].subject_report.find((a) => a.accuracy == lowcount);
        let chapter_report = [];
        console.log("this.state.searchSubject", this.state.searchSubject);
        if (this.state.searchSubject != "0") {
            chapter_report = getStudentExamSessions.getStudentExamSessions[0].chapter_report.filter((a) => a.subject == this.state.searchSubject);
        }
        else {
            chapter_report = getStudentExamSessions.getStudentExamSessions[0].chapter_report
        }
        console.log("chapter_report", chapter_report);
        // question type analysis table
        let qtype_report_array = getStudentExamSessions.getStudentExamSessions[0].qtype_report.map((item) => {
            let avg = "0";
            if (item.total_time != 0) {
                let avgcount = Math.round(parseInt(item.total_time) / (parseInt(item.correct) + parseInt(item.wrong)));
                if (avgcount != "Infinity") {
                    avg = avgcount;
                } else {
                    avg = "0";
                }
            }
            let total_time = this.minutesTimer(item.total_time)
            return { ...item, avg: avg, total_time: total_time }

        })
        // end question type analysis table
        //for exam details
        const examdetails = getStudentExamSessions.getStudentExamSessions[0].subject_report.map((item) => {
            let avg = "0";
            if (item.total_time != 0) {
                let avgcount = Math.round(parseInt(item.total_time) / (parseInt(item.correct) + parseInt(item.wrong)));
                if (avgcount != "Infinity") {
                    avg = avgcount;
                } else {
                    avg = "0";
                }
            }
            return {
                id: item.id,
                subject: item.subject,
                Total_Questions: parseInt(item.correct) + parseInt(item.wrong) + parseInt(item.not_answered),
                Answered: parseInt(item.correct) + parseInt(item.wrong),
                Not_Answered: item.not_answered,
                Correct: item.correct,
                Wrong: item.wrong,
                Correct_Marks: parseInt(item.correct) * parseInt(item.pMarks),
                Wrong_Marks: parseInt(item.wrong) * parseInt(item.nMarks),
                Accuracy: item.accuracy,
                Total_Time: this.minutesTimer(item.total_time),
                Average: avg
            }

        });
        console.log("getStudentExamSessions.getStudentExamSessions[0]", getStudentExamSessions.getStudentExamSessions[0]);
        return (
            <React.Fragment>
                <ExamResultDetails ExamResultDetailsData={examdetails} />


                <SubjectWiseTable SubjectWiseTableData={getStudentExamSessions.getStudentExamSessions[0].subject_report} />
                <QuestionTypeTable
                    QuestionTypeTableData={qtype_report_array}
                />
                <Col xl={12} lg={12} md={12}>
                    <Card className="examquestion-table my-3 shadow overflow-hidden">
                        <Table className="mb-0 borderless" responsive>
                            <thead>
                                <tr>
                                    <th className="text-left" rowSpan="2" colSpan="1">Exam Questions<br /> Type</th>
                                    <th className="text-center text-success" rowSpan="1" colSpan={getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_correct_report.length.toString()}><i className="fas fa-check-circle" /> Correct</th>
                                    <th className="text-center text-danger" rowSpan="1" colSpan={getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_correct_report.length.toString()}><i className="fas fa-times-circle" /> wrong</th>
                                    <th className="text-center theme-purple" rowSpan="1" colSpan={getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_correct_report.length.toString()}><i className="fas fa-align-slash" /> Not Ans</th>
                                </tr>
                                <tr>
                                    {/* <th>Grand</th> */}
                                    {getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_correct_report.map((subjectmap) => {

                                        return (<th>{subjectmap.subject}</th>)

                                    })}
                                    {/* <th>Grand</th> */}
                                    {getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_wrong_report.map((subjectmap) => {

                                        return (<th>{subjectmap.subject}</th>)

                                    })}

                                    {/* <th>Grand</th> */}

                                    {getStudentExamSessions.getStudentExamSessions[0].qtype_report[0].qtype_skipped_report.map((subjectmap) => {

                                        return (<th>{subjectmap.subject}</th>)

                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {getStudentExamSessions.getStudentExamSessions[0].qtype_report.map((qmap) => {
                                    return (
                                        <tr>
                                            <td>{qmap.question_type_name}</td>
                                            {qmap.qtype_correct_report.map((qtype) => {
                                                return (<td>{qtype.count}</td>)

                                            })}
                                            {qmap.qtype_wrong_report.map((qtype) => {
                                                return (<td>{qtype.count}</td>)

                                            })}
                                            {qmap.qtype_skipped_report.map((qtype) => {
                                                return (<td>{qtype.count}</td>)

                                            })}
                                        </tr>
                                    )

                                })}
                            </tbody>

                        </Table>
                    </Card>
                </Col>


                {getStudentExamSessions.getStudentExamSessions[0].error_report.length > 0 ? (<Col xl={12} lg={12} md={12}>
                    <Card className="flex-row errorreport-table my-3 shadow">
                        <Card.Header className="border-0 mb-0 px-4 rounded">
                            <Card.Title className="text-uppercase">Error Report</Card.Title>
                        </Card.Header>
                        <Card.Body className="p-0 overflow-hidden" style={{ height: 200, overflowY: "scroll" }}>
                            <Table className="mb-0 borderless" responsive>
                                <thead>
                                    <tr>
                                        <th></th>
                                        {/* <th>Grand</th> */}

                                        {getStudentExamSessions.getStudentExamSessions[0].error_report[0].error_subject_count.map((smap) => {
                                            return (
                                                <th>
                                                    <div className="d-flex">
                                                        <div className="icon">
                                                            {this.subjectIconfun(smap.id)}
                                                        </div>
                                                        <span className="ml-2">{smap.subject}</span>
                                                    </div>
                                                </th>
                                            )
                                        })}


                                    </tr>
                                </thead>
                                <tbody>
                                    {getStudentExamSessions.getStudentExamSessions[0].error_report.map((smap) => {
                                        return (
                                            <tr>
                                                <th>{smap.error_name} </th>
                                                {smap.error_subject_count.map((map) => {
                                                    return (<th>{map.count} </th>)

                                                })}
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>) : ("")}


                <Col xl={12} lg={12} md={12}>
                    <Card className="flex-row observation-card my-3 shadow">
                        <Card.Header className="border-0 mb-0 px-4 rounded">
                            <Card.Title className="text-uppercase">Observation</Card.Title>
                        </Card.Header>
                        <Card.Body className="p-3">
                            <div className="observation-list" style={{ height: 150, overflowY: "scroll" }}>
                                <ul className="m-0 p-0 list-unstyled">
                                    {lowAccuracy.subject != "" ? (<li>You need to work to improve your overall performance in <strong>{lowAccuracy.subject}</strong></li>) : ("")}
                                    {getStudentExamSessions.getStudentExamSessions[0].subject_report.map((item) => {
                                        return (
                                            <React.Fragment>
                                                {item.observations.theoryObservation != "" ? (<li>{this.parseFun(item.observations.theoryObservation)}</li>) : ("")}
                                                {item.observations.qtypeObservation != "" ? (<li>{this.parseFun(item.observations.qtypeObservation)}</li>) : ("")}
                                                {item.observations.complexityObservation != "" ? (<li>{this.parseFun(item.observations.complexityObservation)}</li>) : ("")}
                                            </React.Fragment>
                                        );

                                    })}
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12} lg={12} md={12} className="my-3">
                    <Card className="act-table shadow">
                        <Card.Header className="bg-white mb-0">
                            <Card.Title className="mb-0">Answered vs Complexity vs Time</Card.Title>
                        </Card.Header>
                        <Card.Body className="p-2">
                            <Row>
                                <Col xl={6} lg={6} md={12} className="my-1">
                                    <Card className="flex-row correct-table border-0">
                                        <Table className="mb-0 borderless w-50">
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2">
                                                        <h6 className="my-2">Correct Answered</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getStudentExamSessions.getStudentExamSessions[0].correct_vs_complexity.map((cmap) => {
                                                    return (<tr>
                                                        <td>{cmap.complexity} </td>
                                                    </tr>)
                                                })}


                                            </tbody>
                                        </Table>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-success">In Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].correct_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.in_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.in_total_time) / parseInt(cmap.in_time)) ? (Math.round(parseInt(cmap.in_total_time) / parseInt(cmap.in_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-danger">Less Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].correct_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.less_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.less_total_time) / parseInt(cmap.less_time)) ? Math.round((parseInt(cmap.less_total_time) / parseInt(cmap.less_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-warning">Over Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].correct_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.over_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.over_total_time) / parseInt(cmap.over_time)) ? (Math.round(parseInt(cmap.over_total_time) / parseInt(cmap.over_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Card>
                                </Col>
                                <Col xl={6} lg={6} md={12} className="my-1">
                                    <Card className="flex-row wrong-table border-0">
                                        <Table className="mb-0 borderless w-50">
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2">
                                                        <h6 className="my-2">Wrong Answered</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getStudentExamSessions.getStudentExamSessions[0].wrong_vs_complexity.map((cmap) => {
                                                    return (<tr>
                                                        <td>{cmap.complexity} </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </Table>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-success">In Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].wrong_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.in_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.in_total_time) / parseInt(cmap.in_time)) ? (Math.round(parseInt(cmap.in_total_time) / parseInt(cmap.in_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-danger">Less Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].wrong_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.less_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.less_total_time) / parseInt(cmap.less_time)) ? (Math.round(parseInt(cmap.less_total_time) / parseInt(cmap.less_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                        <Card className="p-1 border-0 w-25">
                                            <Table className="mb-0 borderless">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">
                                                            <h6 className="text-warning">Over Time</h6>
                                                            <p className="text-muted">Ques | Sec per Q</p>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getStudentExamSessions.getStudentExamSessions[0].wrong_vs_complexity.map((cmap) => {
                                                        return (
                                                            <tr>
                                                                <td className="text-success">{cmap.over_time} </td>
                                                                <td>{!isNaN(parseInt(cmap.over_total_time) / parseInt(cmap.over_time)) ? (Math.round(parseInt(cmap.over_total_time) / parseInt(cmap.over_time))) : ('0')} </td>
                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12} lg={12} md={12} className="my-3">
                    <Card className="h-100 questiontheory-table shadow">
                        <Card.Header className="bg-white mb-0">
                            <Card.Title className="mb-0">Question Theory</Card.Title>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table className="mb-0 borderless" responsive>
                                <thead>
                                    <tr>
                                        <th>Question <br />Theory</th>
                                        <th><i className="fas fa-fw fa-badge-percent theme-info" /><div>Accuracy (%)</div></th>
                                        <th><i className="fas fa-fw fa-check-circle text-success" /><div>Correct</div></th>
                                        <th><i className="fas fa-times-circle text-danger" /><div>Wrong</div></th>
                                        <th><i className="fas fa-fw fa-align-slash theme-purple" /><div>Not Ans</div></th>
                                        <th>Total<br />Time (Min)</th>
                                        <th>AVG Time<br />(Sec/Q)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getStudentExamSessions.getStudentExamSessions[0].theory_report.map((map) => {
                                        let avg = "0";
                                        if (map.total_time != 0) {
                                            let avgcount = Math.round(parseInt(map.total_time) / (parseInt(map.correct) + parseInt(map.wrong)));
                                            if (avgcount != "Infinity") {
                                                avg = avgcount;
                                            } else {
                                                avg = "0";
                                            }
                                        }
                                        return (
                                            <tr>
                                                <td>{map.question_theory_name} </td>
                                                <td className="theme-info">{map.accuracy}</td>
                                                <td className="text-success">{map.correct}</td>
                                                <td className="text-danger">{map.wrong}</td>
                                                <td className="theme-purple">{map.not_answered}</td>
                                                <td>{this.minutesTimer(map.total_time)}</td>
                                                <td>{avg}</td>
                                            </tr>
                                        )
                                    })}

                                    {/* <tr>
                                        <td>Application </td>
                                        <td className="theme-info">40</td>
                                        <td className="text-success">4</td>
                                        <td className="text-danger">5</td>
                                        <td className="theme-purple">1</td>
                                        <td>18</td>
                                        <td>15</td>
                                    </tr> */}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={12} lg={12} md={12} className="my-3">
                    <Card className="chapterwise-table shadow">
                        <Card.Header className="bg-white mb-0 d-md-flex align-items-center">
                            <Card.Title className="mb-0 d-flex">Chapter Wise Analysis </Card.Title>
                            <div className="subjects-selection-filter ml-2">
                                <SelectDropDown
                                    stateData={this.state.searchSubjectvalue}
                                    handleChange={this.handleSelectInputChange}
                                    name="searchSubject"
                                    options={this.subjectFunction(getStudentExamSessions.getStudentExamSessions[0].subject_report)}
                                    placeholderName={'Subject'}
                                    dropdownIndicator={{ DropdownIndicator }}
                                />
                            </div>
                        </Card.Header>
                        <ChapterTable ChapterTableData={chapter_report} />

                    </Card>
                </Col>
            </React.Fragment>
        )
    }
}

export default
    compose(graphql(FETCH_SESSION_DATA,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    exam_session_id: parseInt(props.exam_session_id),

                }
                ,
                fetchPolicy: "no-cache"
            }), name: "getStudentExamSessions"
        }))(PracticeTestExamResultDetails);
