import React, { Component } from 'react'
import { components } from 'react-select'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Row, Col, Jumbotron, Image, ResponsiveEmbed, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { newVideos, similarRecentdVideo, recentlyWatchedVideo, liveclassVideo } from './VideoData';

import './_videos.scss'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import LatetsVideos from "./LatetsVideos";
import RecentlyWatchedVideos from "./RecentlyWatchedVideos";
import CategoryVideos from "./CategoryVideos";
class VideoSection extends Component {
    constructor(props) {
        super(props)

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
        if (getarray.length > 0 && this.state.class!="0") {
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
        if (getarray.length > 0 && this.state.subject!="0") {
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
        if (getarray.length > 0 && this.state.chapter!="0") {
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
        if (getarray.length > 0 && this.state.topic!="0") {
            const newObj1 = {
                value: "0",
                label: "All Topics"
            };
            getarray.unshift(newObj1);
        }


        return getarray;
    }
    render() {
        console.log("currentstate", this.state);
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                    </components.DropdownIndicator>
                )
            );
        };


        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }

        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        //console.log("globalsubjects", globalsubjects, studentGlobals);
        return (
            <div className="video_section">
                <Row>
                    <Col xl={12}><h5>New videos</h5></Col>
                    <Col xl={12}>
                        <LatetsVideos />


                        {/* <Row className="my-5">
                            <Col xl={10} lg={9} md={9} sm={12} xs={12}>
                                <Form.Row className="d-flex align-items-center">
                                    <Col xl={2} lg={3} md={6} sm={6} className="mb-2">
                                        <SelectDropDown
                                            name="class"
                                            stateData={this.state.classValue}
                                            handleChange={this.selecthandleInputChange}
                                            options={this.getClasses(studentGlobals.classes)}
                                            placeholderName={'Classes'}
                                            dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                    {/* <Col xl={2} lg={3} md={6} sm={6} className="mb-2">
                                        <SelectDropDown
                                            name="exam"
                                            stateData={this.state.examValue}
                                            handleChange={this.selecthandleInputChange}
                                            options={this.getExams(studentGlobals.exams)}
                                            placeholderName={'Mains'}
                                            dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                    <Col xl={2} lg={3} md={6} sm={6} className="mb-2">
                                        <SelectDropDown
                                            name="subject"
                                            stateData={this.state.subjectValue}
                                            handleChange={this.selecthandleInputChange}
                                            options={this.getSubjects(globalsubjects)}

                                            dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                    <Col xl={3} lg={3} md={6} sm={6} className="mb-2">
                                        <SelectDropDown
                                            name="chapter"
                                            stateData={this.state.chapterValue}
                                            handleChange={this.selecthandleInputChange}
                                            options={this.getChapters(globalsubjects)}
                                            dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                    <Col xl={3} lg={3} md={6} sm={6} className="mb-2">
                                        <SelectDropDown
                                            name="topic"
                                            stateData={this.state.topicValue}
                                            handleChange={this.selecthandleInputChange}
                                            options={this.getTopics(globalsubjects)}
                                            dropdownIndicator={{ DropdownIndicator }} />
                                    </Col>
                                </Form.Row>
                            </Col>
                            <Col xl={2} lg={3} md={3} sm={12} xs={12}>
                                <Button onClick={() => { this.clearAllFun() }} variant="outline-primary text-uppercase px-4">Clear All</Button>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <ul className="list-inline mt-3 filter-list">
                                    {this.state.class != "0" ? (
                                        <li className="list-inline-item" >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="mr-3">{this.state.classValue.label}</span> <i onClick={() => this.cancelFun("class")} className="fal fa-times"></i>
                                            </div>
                                        </li>
                                    ) : ("")}
                                    {this.state.exam != "0" ? (
                                        <li className="list-inline-item" >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="mr-3">{this.state.examValue.label}</span> <i onClick={() => this.cancelFun("exam")} className="fal fa-times"></i>
                                            </div>
                                        </li>
                                    ) : ("")}

                                    {this.state.subject != "0" ? (
                                        <li className="list-inline-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="mr-3">{this.state.subjectValue.label}</span> <i onClick={() => this.cancelFun("subjects")} className="fal fa-times"></i>
                                            </div>
                                        </li>
                                    ) : ("")}

                                    {this.state.chapter != "0" ? (
                                        <li className="list-inline-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="mr-3">{this.state.chapterValue.label}</span> <i onClick={() => this.cancelFun("chapters")} className="fal fa-times"></i>
                                            </div>
                                        </li>
                                    ) : ("")}

                                    {this.state.topic != "0" ? (
                                        <li className="list-inline-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="mr-3">{this.state.topicValue.label}</span> <i onClick={() => this.cancelFun("topics")} className="fal fa-times"></i>
                                            </div>
                                        </li>
                                    ) : ("")}

                                </ul>
                            </Col>
                        </Row> */}
                        <RecentlyWatchedVideos stateData={this.state} />
                        <CategoryVideos stateData={this.state} />
                    </Col>
                </Row>

            </div >
        )
    }
}

export default VideoSection
