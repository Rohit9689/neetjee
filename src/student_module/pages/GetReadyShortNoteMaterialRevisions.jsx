import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import GetReadyShortNoteMaterialRevisionSection from '../components/get_ready_for_exam/GetReadyShortNoteMaterialRevisionSection'
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import parse, { domToReact } from 'html-react-parser';
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

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
        contentTypes{
            id
            customcontent
        }
        
    }
}

`;

class GetReadyShortNoteMaterialRevisions extends Component {
    constructor(props) {
        super(props)
        let sampleArray = [];
        let sampleArray2 = [];

        const syllabus = JSON.parse(JSON.stringify(props.history.location.state.syllabus));
        const qtypes = props.history.location.state.studentGlobals.contentTypes.filter(item => (item.id != 1 && item.id != 5 && item.id != 9));
        let chapterId = "";
        let chaptername = "";
        for (let i = 0; i < syllabus.length; i++) {
            let someData = syllabus[i];
            if (someData.chapters.length != 0) {
                chapterId = someData.chapters[0].id;
                chaptername = someData.chapters[0].chapter;
                break;
            }
        }
        for (let i = 0; i < syllabus.length; i++) {
            let someData = syllabus[i];

            const newarr1 = {
                ...someData,
                classActive: "",
            }
            sampleArray.push(newarr1);
            someData.chapters.map((item) => {
                item.qtypes = qtypes
                item.checked = false
            });
        }

        for (let i = 0; i < syllabus.length; i++) {
            let someData = syllabus[i];
            const newarr2 = {
                ...someData,
                classActive: "",
            }
            sampleArray2.push(newarr2);
            someData.chapters.map((item) => {
                item.checked = false
                item.active = ""
            });
        }
        let defaultActiveKey = "first";
        console.log("props.history.location.state.defaultActiveKey", props.history.location.state.defaultActiveKey);
        if (props.history.location.state.defaultActiveKey != undefined) {
            defaultActiveKey = props.history.location.state.defaultActiveKey;
        }

        if (props.history.location.state.chapterId != undefined) {
            chapterId = props.history.location.state.chapterId;
        }

        this.state = {
            toggled: "wrapper sidebar-enable",
            studentGlobals: props.history.location.state.studentGlobals,
            mfilterData: sampleArray2,
            syllabus: syllabus,
            filterData: sampleArray,
            subjectname: syllabus[0].subject_name,
            subjectid: syllabus[0].subject_id,
            chapterId: chapterId,
            chaptername: chaptername,
            qtypeId: 0,
            defaultActiveKey: defaultActiveKey
        }
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

    componentDidMount() {
        const title = GoogleAnalyticsArray[0].Exam_syllabus;
        ReactGA.pageview('/student/get-ready-for-exam/get-ready-shortnotes-and-materials', ["ELAPP"], title);

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
        //window.removeEventListener("mousedown", () => { });
        window.removeEventListener("selectstart", () => { });

    }

    msubjectFunction = (id, index) => {
        let arr = this.state.mfilterData;
        let foundData = this.state.mfilterData.find((a) => a.subject_id == id);
        let idindex = this.state.mfilterData.indexOf(foundData);
        let foundData2 = this.state.mfilterData.find((a) => a.classActive == "active");
        let idindex2 = this.state.mfilterData.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive = "";
        }
        if (arr[idindex] != undefined) {
            arr[idindex].classActive = "active";
        }

        this.setState({
            mfilterData: arr,
            defaultActiveKey: "second"
        });
    }
    subjectFunction = (id, index) => {
        let arr = this.state.filterData;
        let foundData = this.state.filterData.find((a) => a.subject_id == id);
        let idindex = this.state.filterData.indexOf(foundData);
        let foundData2 = this.state.filterData.find((a) => a.classActive == "active");
        let idindex2 = this.state.filterData.indexOf(foundData2);

        if (arr[idindex2] != undefined) {
            arr[idindex2].classActive = "";
        }
        if (arr[idindex] != undefined) {
            arr[idindex].classActive = "active";
        }

        this.setState({ filterData: arr, defaultActiveKey: "first" });
    }
    chapterFunction = (e, subid, qtyid, subname, chname) => {
        let arr = this.state.filterData.map(item => {
            if (item.subject_id == subid) {
                const qtype = item.chapters.map(qitem => {
                    if (qitem.id == qtyid) {
                        if (qitem.checked == false) {
                            this.setState({ chapterId: qtyid });
                            return { ...qitem, checked: true }
                        } else {
                            this.setState({ chapterId: qtyid });
                            return { ...qitem, checked: true }
                        }
                    }
                    return { ...qitem, checked: false };
                })
                return { ...item, chapters: qtype };
            }
            return item;
        }

        )
        this.setState({
            filterData: arr,
            //chapterId: qtyid,
            subjectid: subid,
            subjectname: subname,
            chaptername: chname,
            defaultActiveKey: "first"
        });

    }
    mchapterFunction = (e, subid, qtyid, subname, chname) => {

        let arr = this.state.mfilterData.map(item => {
            if (item.subject_id == subid) {
                const qtype = item.chapters.map(qitem => {
                    if (qitem.id == qtyid) {
                        if (qitem.active == "") {
                            this.setState({ chapterId: qtyid });
                            return { ...qitem, active: "active" }
                        } else {
                            this.setState({ chapterId: qtyid });
                            return { ...qitem, active: "" }
                        }
                    }
                    return { ...qitem, active: "" };
                })
                return { ...item, chapters: qtype };
            }
            return item;
        }

        )
        this.setState({
            mfilterData: arr,
            subjectid: subid,
            subjectname: subname,
            chaptername: chname,
            defaultActiveKey: "second"
        });

    }
    mqtypeFunction = (e, subid, chpid, qtyid) => {
        console.log("mqtypeFunction", subid, chpid, qtyid);
        let arr = this.state.mfilterData.map(item => {
            if (item.subject_id == subid) {
                const qtype = item.chapters.map(qitem => {
                    if (qitem.id == chpid) {
                        const qitype = qitem.qtypes.map(iitem => {
                            if (iitem.id == qtyid) {
                                if (iitem.checked == false) {
                                    this.setState({ qtypeId: qtyid });
                                    return { ...iitem, checked: true }
                                } else {
                                    this.setState({ qtypeId: qtyid });
                                    return { ...iitem, checked: true }
                                }
                            }
                            return { ...iitem, checked: false };
                        })
                        return { ...qitem, qtypes: qitype };


                    }
                    return { ...qitem, checked: false };
                })
                return { ...item, chapters: qtype };
            }
            return item;
        }

        )
        this.setState({ mfilterData: arr, defaultActiveKey: "second" });
    }
    render() {
        console.log("currentState", this.state);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        const studentGlobals = this.props.studentGlobals;
        const loading1 = studentGlobals.loading;
        const error1 = studentGlobals.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        // if (loading1) return <PreloaderTwo />;
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true) && (<PreloaderTwo />)}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper">
                        <Container>
                            {
                                !loading1 && (
                                    <GetReadyShortNoteMaterialRevisionSection
                                        subjectsData={globalsubjects}
                                        studentGlobals={studentGlobals.studentGlobals}
                                        stateData={this.state}
                                        psubjectFunction={this.subjectFunction}
                                        pchapterFunction={this.chapterFunction}
                                        pmsubjectFunction={this.msubjectFunction}
                                        pmchapterFunction={this.mchapterFunction}
                                        pmqtypeFunction={this.mqtypeFunction}
                                    />
                                )
                            }

                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}


export default
    compose(graphql(FETCH_GLOBALS,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile")
                },
                fetchPolicy: "cache-and-network"
            }), name: "studentGlobals"
        })
    )(GetReadyShortNoteMaterialRevisions);
