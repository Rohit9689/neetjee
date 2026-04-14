import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import CustomRevisionMaterialHeader from '../components/all_custom_revision_materials/CustomRevisionMaterialHeader'
import CustomRevisionMaterialSection from '../components/all_custom_revision_materials/CustomRevisionMaterialSection'
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import PreloaderTwo from '../components/preloader/PreloaderTwo';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

class CustomRevisionMaterials extends Component {
    constructor(props) {
        super(props);
        let cTypeDropData = [];
        let contentTypeArr = [];
        let chaptersearchArr = [];
        let chaptersearch = 0;
        let multichecked = false;
        let contentType = props.history.location.state.content_type;
        let multiStateData = props.history.location.state.multiStateData;

        if (props.history.location.state.multiStateData.multichecked == true) {
            multichecked = true;
            //start multi chapters
            props.history.location.state.multiStateData.multiDropdowns.map((item) => {
                if (item.multichapter.length > 0) {
                    item.multichapter.map((item2) => {
                        chaptersearchArr.push(item2);
                    });
                }
            });
            chaptersearch = chaptersearchArr.toString();
            //end multi chapters
            //start content type
            props.history.location.state.multiStateData.chapterMaterialCounts.map((item) => {
                if (item.checked == true) {
                    const newObj = {
                        id: item.id,
                        customcontent: item.customcontent
                    }
                    cTypeDropData.push(newObj);
                    contentTypeArr.push(item.id);
                }
            });
            contentType = contentTypeArr.toString();
            //end content type


        }

        this.state = {
            toggled: "wrapper sidebar-enable",
            multiStateData: multiStateData,
            multichecked: multichecked,
            cTypeDropData: cTypeDropData,
            contentType: contentType,
            page: 1,
            subjectsearch: 0,
            chaptersearch: chaptersearch,
            topicsearch: 0,
            classsearch: 0,
            contentsearch: 0,
            contentsearchValue: {
                value: "0",
                label: "All Contents"
            },
            subjectsearchValue: {
                value: "0",
                label: "All Subjects"
            },
            chaptersearchValue: {
                value: "0",
                label: "All Chapters"
            },
            topicsearchValue: {
                value: "0",
                label: "All Topics"
            },
            classsearchValue: {
                value: "0",
                label: "All Classes"
            },
            type: "normal"

        }
    }
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Revision_Material_Content_View;
        ReactGA.pageview('/student/revision-material-groups/custom-revision-materials', ["ELAPP"], title);
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
    selecthandleInputChange = (ename, evalue) => {
        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }

        let getStudentMaterialCount = "";
        if (JSON.parse(localStorage.getItem("getStudentMaterialCount")) != "") {
            getStudentMaterialCount = JSON.parse(localStorage.getItem("getStudentMaterialCount"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const name = ename;
        const value = evalue;
        if (name == "subjectsearch") {
            if (value != "0") {
                let subjectsearchData = getStudentMaterialCount.subjects_counts.find((a) => a.id == value);
                //start multi chapters
                let chaptersearchArr = [];
                let chaptersearch = 0;
                this.props.history.location.state.multiStateData.multiDropdowns.map((item) => {
                    if (item.id == value) {
                        if (item.multichapter.length > 0) {
                            item.multichapter.map((item2) => {
                                chaptersearchArr.push(item2);
                            });
                        }
                    }

                });
                chaptersearch = chaptersearchArr.toString();
                //end multi chapters
                this.setState({
                    subjectsearchValue: {
                        value: subjectsearchData.id,
                        label: subjectsearchData.subject
                    },
                    subjectsearch: value,
                    page: 1,
                    chaptersearch: chaptersearch,
                    topicsearch: 0,
                    classsearch: 0,
                    chaptersearchValue: {
                        value: "0",
                        label: "All Chapters"
                    },
                    topicsearchValue: {
                        value: "0",
                        label: "All Topics"
                    },
                    classsearchValue: {
                        value: "0",
                        label: "All Classes"
                    }
                });
            } else {
                //start multi chapters
                let chaptersearchArr = [];
                let chaptersearch = 0;
                this.props.history.location.state.multiStateData.multiDropdowns.map((item) => {
                    if (item.multichapter.length > 0) {
                        item.multichapter.map((item2) => {
                            chaptersearchArr.push(item2);
                        });
                    }
                });
                chaptersearch = chaptersearchArr.toString();
                //end multi chapters
                this.setState({
                    subjectsearchValue: {
                        value: "0",
                        label: "All Subjects"
                    },
                    subjectsearch: value,
                    page: 1,
                    chaptersearch: chaptersearch,
                    topicsearch: 0,
                    classsearch: 0,
                    chaptersearchValue: {
                        value: "0",
                        label: "All Chapters"
                    },
                    topicsearchValue: {
                        value: "0",
                        label: "All Topics"
                    },
                    classsearchValue: {
                        value: "0",
                        label: "All Classes"
                    }
                });
            }

        }
        if (name == "chaptersearch") {
            if (value != "0") {
                let chapterData = "";
                let chapterData1 = [];
                if (this.state.subjectsearch == 0) {
                    getStudentMaterialCount.subjects_counts.map((item) => {
                        item.material_chapters.map((item2) => {
                            chapterData1.push({ ...item2 });
                        });

                    });
                    chapterData = chapterData1.find((a) => a.id == value);


                }
                else {
                    let subjectsearchData = getStudentMaterialCount.subjects_counts.find((a) => a.id == this.state.subjectsearch);
                    chapterData = subjectsearchData.material_chapters.find((a) => a.id == value);
                }
                this.setState({
                    chaptersearchValue: {
                        value: chapterData.id,
                        label: chapterData.chapter
                    },
                    page: 1,
                    chaptersearch: value
                });
            } else {
                //start multi chapters
                let chaptersearchArr = [];
                let chaptersearch = 0;
                this.props.history.location.state.multiStateData.multiDropdowns.map((item) => {
                    if (item.id == this.state.subjectsearch) {
                        if (item.multichapter.length > 0) {
                            item.multichapter.map((item2) => {
                                chaptersearchArr.push(item2);
                            });
                        }
                    }
                    else {
                        if (item.multichapter.length > 0) {
                            item.multichapter.map((item2) => {
                                chaptersearchArr.push(item2);
                            });
                        }
                    }

                });
                chaptersearch = chaptersearchArr.toString();
                //end multi chapters
                this.setState({
                    chaptersearchValue: {
                        value: "0",
                        label: "All Chapters"
                    },
                    page: 1,
                    chaptersearch: chaptersearch
                });
            }

        }
        if (name == "topicsearch") {
            if (value != "0") {
                let subjectsearchData = getStudentMaterialCount.subjects_counts.find((a) => a.id == this.state.subjectsearch);
                let chapterData = subjectsearchData.material_chapters.find((a) => a.id == this.state.chaptersearch);
                let topicsearchData = chapterData.topics.find((a) => a.id == value);
                this.setState({
                    topicsearchValue: {
                        value: topicsearchData.id,
                        label: topicsearchData.topic
                    },
                    page: 1,
                    topicsearch: value
                });
            } else {
                this.setState({
                    topicsearchValue: {
                        value: "0",
                        label: "All Topics"
                    },
                    topicsearch: value,
                    page: 1
                });
            }

        }
        if (name == "classsearch") {
            if (value != "0") {

                let classsearchData = studentGlobals.classes.find((a) => a.id == value);
                console.log("studentGlobals.classes1234", studentGlobals.classes, classsearchData);
                this.setState({
                    classsearchValue: {
                        value: classsearchData.id,
                        label: classsearchData.class
                    },
                    page: 1,
                    classsearch: value
                });
            } else {
                this.setState({
                    classsearchValue: {
                        value: "0",
                        label: "All Classes"
                    },
                    page: 1,
                    classsearch: value
                });
            }

        }
        if (name == "contentsearch") {
            if (value != "0") {

                let contentsearchData = this.state.cTypeDropData.find((a) => a.id == value);
                this.setState({
                    contentsearchValue: {
                        value: contentsearchData.id,
                        label: contentsearchData.customcontent
                    },
                    page: 1,
                    contentType: value,
                    contentsearch: value

                });
            } else {
                let DArray = [];
                this.state.cTypeDropData.map((item) => {
                    DArray.push(item.id);
                });
                this.setState({
                    contentsearchValue: {
                        value: "0",
                        label: "All Contents"
                    },
                    page: 1,
                    contentType: DArray.toString(),
                    contentsearch: value
                });
            }

        }
        //this.setState({ [name]: value });
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

        let getStudentMaterialCount = "";
        if (JSON.parse(localStorage.getItem("getStudentMaterialCount")) != "") {
            getStudentMaterialCount = JSON.parse(localStorage.getItem("getStudentMaterialCount"));
        }
        else {
            this.props.history.push("/student/login");
        }

        console.log("CustomRevisionMaterials", this.state);
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0" style={{ minHeight: '60vh' }}>
                        <CustomRevisionMaterialHeader
                            historyData={this.props.history.location.state}
                            stateData={this.state}
                            getStudentMaterialCount={getStudentMaterialCount}
                            studentGlobals={studentGlobals}
                            selecthandleInputChange={this.selecthandleInputChange} />
                        <Container>
                            <CustomRevisionMaterialSection
                                stateData={this.state}
                                getStudentMaterialCount={getStudentMaterialCount}
                                studentGlobals={studentGlobals}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CustomRevisionMaterials);
