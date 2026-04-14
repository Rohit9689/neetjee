import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Jumbotron, Image, ResponsiveEmbed, Form, Tab, Nav, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import './_videos.scss'
import RecentlyWatchedVideos from "./RecentlyWatchedVideos";
import * as Cookies from "es-cookie";
class VideoSection extends Component {
    constructor(props) {
        super(props)

        const Obj = {
            id: "0",
            category: "All"
        }
        let cData=[];
        cData = props.getVideoCategories;
        cData.unshift(Obj);
         this.state = {
            options: {
                loop: false,
                nav: true,
                dots: false,
                margin: 30,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    992: {
                        items: 3,
                    },
                    1024: {
                        items: 3,
                    },
                    1200: {
                        items: 6,
                    },
                    1360: {
                        items: 6,
                    },
                },
            },
            class: "0",
            classValue: {
                value: "0",
                label: "All Classes"
            },
            exam: "0",
            examValue: {
                value: "0",
                label: "All Exams"
            },
            subject: "0",
            subjectValue: {
                value: "0",
                label: "All Subjects"
            },
            chapter: "0",
            chapterValue: {
                value: "0",
                label: "All Chapters"
            },
            topic: "0",
            topicValue: {
                value: "0",
                label: "All Topics"
            },
            categoryId: "0",
            cData:cData
        }

    }

    clearAllFun = () => {
        this.setState({
            class: "0",
            classValue: {
                value: "0",
                label: "All Classes"
            },
            exam: "0",
            examValue: {
                value: "0",
                label: "All Exams"
            },
            subject: "0",
            subjectValue: {
                value: "0",
                label: "All Subjects"
            },
            chapter: "0",
            chapterValue: {
                value: "0",
                label: "All Chapters"
            },
            topic: "0",
            topicValue: {
                value: "0",
                label: "All Topics"
            }
        });
    }
    cancelFun = (ctype) => {
        if (ctype == "class") {
            this.setState({
                class: "0",
                classValue: {
                    value: "0",
                    label: "All Classes"
                }
            })

        }
        if (ctype == "exam") {
            this.setState({
                exam: "0",
                examValue: {
                    value: "0",
                    label: "All Exams"
                }
            })
        }
        if (ctype == "subjects") {
            this.setState({
                subject: "0",
                subjectValue: {
                    value: "0",
                    label: "All Subjects"
                }
            })
        }
        if (ctype == "chapters") {
            this.setState({
                chapter: "0",
                chapterValue: {
                    value: "0",
                    label: "All Chapters"
                }
            })
        }
        if (ctype == "topics") {
            this.setState({
                topic: "0",
                topicValue: {
                    value: "0",
                    label: "All Topics"
                }
            })
        }
    }
    selecthandleInputChange = (ename, evalue) => {
        let fglobalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            fglobalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }

        let fstudentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            fstudentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const name = ename;
        const value = evalue;
        if (name == "class") {
            if (value != "0") {
                let classData = fstudentGlobals.classes.find((a) => a.id == value);
                this.setState({
                    classValue: {
                        value: classData.id,
                        label: classData.class
                    },

                });
            } else {
                this.setState({
                    classValue: {
                        value: "0",
                        label: "All Classes"
                    }

                });
            }

        }

        if (name == "subject") {
            if (value != "0") {
                let subjectData = fglobalsubjects.find((a) => a.id == value);
                this.setState({
                    subjectValue: {
                        value: subjectData.id,
                        label: subjectData.subject
                    },
                    chapter: "0",
                    chapterValue: { value: "0", label: "All Chapters" },
                    topic: "0",
                    topicValue: { value: "0", label: "All Topics" }
                });
            } else {
                this.setState({
                    subjectValue: {
                        value: "0",
                        label: "All Subjects"
                    },
                    chapter: "0",
                    chapterValue: { value: "0", label: "All Chapters" },
                    topic: "0",
                    topicValue: { value: "0", label: "All Topics" }

                });
            }

        }

        if (name == "chapter") {
            if (value != "0") {
                const subjectData = fglobalsubjects.find((a) => a.id == this.state.subject);
                let chapterData = subjectData.studentChapters.find((a) => a.id == value);
                this.setState({
                    chapterValue: {
                        value: chapterData.id,
                        label: chapterData.chapter
                    },
                    topic: "0",
                    topicValue: { value: "0", label: "All Topics" }
                });
            } else {
                this.setState({
                    chapterValue: {
                        value: "0",
                        label: "All Chapters"
                    },
                    topic: "0",
                    topicValue: { value: "0", label: "All Topics" }

                });
            }
        }

        if (name == "topic") {
            if (value != "0") {
                const subjectData = fglobalsubjects.find((a) => a.id == this.state.subject);
                const chapterData = subjectData.studentChapters.find((a) => a.id == this.state.chapter);
                let topicData = chapterData.topics.find((a) => a.id == value);
                this.setState({
                    topicValue: {
                        value: topicData.id,
                        label: topicData.topic
                    }
                });
            } else {
                this.setState({
                    topicValue: {
                        value: "0",
                        label: "All Topics"
                    }

                });
            }
        }
        this.setState({ [name]: value });
    }
    getClasses(classData) {
        let getarray = [];
        classData.map((map) => {
            if (map != undefined) {
                const newObj = {
                    value: map.id,
                    label: map.class
                };
                getarray.push(newObj);
            }
        })
        if (getarray.length > 0 && this.state.class != "0") {
            const newObj1 = {
                value: "0",
                label: "All Classes"
            };
            getarray.unshift(newObj1);
        }
        return getarray;

    }
    getExams(examsData) {
        let getarray = [];
        examsData.map((map) => {
            if (map != undefined) {
                const newObj = {
                    value: map.id,
                    label: map.exam
                };
                getarray.push(newObj);
            }
        })
        return getarray;
    }
    getSubjects(subjectsData) {
        let getarray = [];

        subjectsData.map((map) => {
            if (map != undefined) {
                const newObj = {
                    value: map.id,
                    label: map.subject
                };
                getarray.push(newObj);
            }
        })
        if (getarray.length > 0 && this.state.subject != "0") {
            const newObj1 = {
                value: "0",
                label: "All Subjects"
            };
            getarray.unshift(newObj1);
        }

        return getarray;
    }
    getChapters(subjectsData) {
        let getarray = [];

        if (this.state.subject != "0") {
            subjectsData.map((smap) => {
                if (smap.id == this.state.subject) {
                    smap.studentChapters.map((cmap) => {
                        const newObj = {
                            value: cmap.id,
                            label: cmap.chapter
                        };
                        getarray.push(newObj);
                    })

                }
            })
        }
        if (getarray.length > 0 && this.state.chapter != "0") {
            const newObj1 = {
                value: "0",
                label: "All Chapters"
            };
            getarray.unshift(newObj1);
        }


        return getarray;
    }
    getTopics(subjectsData) {
        let getarray = [];

        if (this.state.subject != "0" && this.state.chapter != "0") {
            subjectsData.map((smap) => {
                if (smap.id == this.state.subject) {
                    smap.studentChapters.map((cmap) => {
                        if (cmap.id == this.state.chapter) {
                            cmap.topics.map((tmap) => {
                                const newObj = {
                                    value: tmap.id,
                                    label: tmap.topic
                                };
                                getarray.push(newObj);
                            })

                        }

                    })

                }
            })
        }
        if (getarray.length > 0 && this.state.topic != "0") {
            const newObj1 = {
                value: "0",
                label: "All Topics"
            };
            getarray.unshift(newObj1);
        }


        return getarray;
    }
    catvideoFun = (id) => {
        this.setState({
            categoryId: id
        });

    }
    
    render() {
        const EXAMTYPE = [{
            id: "0",
            value: "NEET"
        },
        {
            id: "1",
            value: "JEE Mains"
        },
        {
            id: "2",
            value: "JEE Advance"
        }]
        console.log("345465", this.state.cData);
        return (
            <div className="video_section">
                <Tab.Container id="left-tabs-videofilter" defaultActiveKey="0">
                    <Row>
                        <Col xl={5} lg={5} md={8} sm={12} className="mx-auto">
                            <Nav variant="pills video_filter">
                                {this.state.cData.map((smap, index) => {

                                    if (smap != undefined) {
                                        return (<Nav.Item onClick={() => this.catvideoFun(smap.id)}>
                                            <Nav.Link eventKey={index}>{smap.category}</Nav.Link>
                                        </Nav.Item>)
                                    }

                                })}
                            </Nav>
                        </Col>
                    </Row>
                    <Tab.Content>
                        {this.state.cData.map((smap, index) => {

                            if (smap != undefined) {
                                return (
                                    <Tab.Pane eventKey={index}>
                                        <Row>
                                            <Col xl={12}>
                                                {EXAMTYPE.map((emap) => {
                                                   
                                                    if (Cookies.get("examid") == "1") {
                                                        if (emap.id == "0") {
                                                            console.log("Cookies.get1", emap);
                                                            return (<RecentlyWatchedVideos stateData={this.state} etypeData={emap} />);
                                                        }

                                                    }
                                                    if (Cookies.get("examid") == "2") {
                                                        if (emap.id == "1" || emap.id == "2") {
                                                            console.log("Cookies.get2", emap);
                                                            return (<RecentlyWatchedVideos stateData={this.state} etypeData={emap} />);
                                                        }

                                                    }

                                                })}

                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                )
                            }
                        })}


                    </Tab.Content>

                </Tab.Container>
            </div >
        )

    }
}

export default withRouter(VideoSection);
