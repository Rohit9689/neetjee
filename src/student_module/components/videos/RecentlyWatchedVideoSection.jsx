import React, { Component } from 'react'
import { Row, Col, Form, Image, Button, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { components } from 'react-select'
import SelectDropDown from '../../../neetjee_guru/components/selectdropdown/SelectDropDown';
import './_videos.scss'
import PdfModal from '../learn_practice/subjects/PdfModal';
import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from '../../pages/GoogleAnalytics';
class RecentlyWatchedVideoSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow1: false,
            modaltitle: "",
            pdf_file: "",
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
        }
    }
    modalShow1 = (title, pdf_file) => {
        const gtitle = GoogleAnalyticsArray[0].Video_Notes_View;
        ReactGA.pageview('/student/videos/recently-watched', ["ELAPP"], gtitle);
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

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
    render() {
        const Classes = [
            { value: 1, label: 'Classes-1' },
            { value: 2, label: 'Classes-2' },
            { value: 3, label: 'Classes-3' }
        ];
        const Mains = [
            { value: 1, label: 'Mains-1' },
            { value: 2, label: 'Mains-2' },
            { value: 3, label: 'Mains-3' }
        ];
        const Chapter = [
            { value: 'Chapter-1', label: 'Chapter-1', color: '#00B8D9', isFixed: true },
            { value: 'Chapter-2', label: 'Chapter-2', color: '#0052CC', isFixed: true },
            { value: 'Chapter-3', label: 'Chapter-3', color: '#5243AA' },
        ];
        const Subject = [
            { value: 'Subject-1', label: 'Subject-1', color: '#00B8D9', isFixed: true },
            { value: 'Subject-2', label: 'Subject-2', color: '#0052CC', isFixed: true },
            { value: 'Subject-3', label: 'Subject-3', color: '#5243AA' },
        ];
        const Topic = [
            { value: 'Topic-1', label: 'Topic-1', color: '#00B8D9', isFixed: true },
            { value: 'Topic-2', label: 'Topic-2', color: '#0052CC', isFixed: true },
            { value: 'Topic-3', label: 'Topic-3', color: '#5243AA' },
        ];
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
        let Data = this.props.videoData.videoData;
        if (this.state.class != 0 || this.state.subject != 0 || this.state.chapter != 0 || this.state.topic != 0) {
            if (this.state.class != 0) {
                Data = Data.filter((a) => a.class == this.state.class);
            }
            if (this.state.subject != 0) {
                Data = Data.filter((a) => a.subject == this.state.subject);
            }
            if (this.state.chapter != 0) {
                Data = Data.filter((a) => a.chapter == this.state.chapter);
            }
            if (this.state.topic != 0) {
                Data = Data.filter((a) => a.topic == this.state.topic);
            }

        }
        return (
            <div className="recentlywatched-videos">
                <Row>
                    <Col xs={12}>
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="font-weight-bold mb-1">{this.props.videoData.type} </h5>
                            <Button className="btn btn-white text-capitalize shadow-sm btn btn-primary mb-3" onClick={this.props.history.goBack}>
                                <i className="mr-2 fal fa-long-arrow-left" /> Back
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12}>
                        {Data.length > 0 ? (
                            <Row>
                                {
                                    Data.map((videoDatamap, index) => {

                                        return (
                                            <Col xl={3} lg={4} md={6} sm={6} xs={6} key={videoDatamap.id} className="my-1">
                                                {/* <Card className="single_video">
                                                    <Link
                                                        to={{
                                                            pathname: "/student/subject/start-video-watching",
                                                            state: {
                                                                index: index,
                                                                videosList: Data,
                                                                type: "iv"
                                                            }
                                                        }}
                                                        className="text-decoration-none text-dark">
                                                        {videoDatamap.thumbnail != "" ? (<Card.Img src={videoDatamap.thumbnail} title={videoDatamap.title} fluid rounded className="shadow" />) : (
                                                            <Card.Img src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid rounded className="shadow" />
                                                        )}
                                                    </Link>
                                                    <Card.Body className="content p-2">
                                                        <h6 className="title mb-1">{videoDatamap.title}</h6>
                                                       

                                                        {videoDatamap.subjectName != "" ? (<p className="subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '44%' }}>Subject :</strong> <span>{videoDatamap.subjectName}</span></p>) : ("")}
                                                        {videoDatamap.ChapterName != "" ? (<p style={{ fontSize: 12 }} className="chapter text-uppercase d-flex"><strong style={{ width: '44%' }}>Chapter :</strong> <span>{videoDatamap.ChapterName}</span></p>) : ("")}
                                                        {videoDatamap.topicName != "" ? (<p style={{ fontSize: 12 }} className="topic text-uppercase d-flex"><strong style={{ width: '44%' }}>Topic :</strong> <span>{videoDatamap.topicName}</span></p>) : ("")}
                                                        <div className="d-flex justify-content-between align-items-center video_footer">
                                                            <div className="likes text-dark"><i className="fas fa-eye text-dark" />: {videoDatamap.views}</div>
                                                            {videoDatamap.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoDatamap.title, videoDatamap.pdf_file)} variant="link" style={{ backgroundColor: "#202B63" }} className="text-white text-decoration-none">View Notes</Button>) : ("")}

                                                        </div>
                                                    </Card.Body>

                                                </Card> */}
                                                <Card className="single-slide-card shadow-sm border-0">
                                                    <Card.Header className="bg-white border-0 mb-0 p-1">
                                                        <Link to={{
                                                            pathname: "/student/subject/start-video-watching",
                                                            state: {
                                                                index: index,
                                                                videosList: Data,
                                                                type: "iv",
                                                                mobile: this.props.mobile,
                                                                urltype: this.props.type,
                                                                mname: this.props.mname
                                                            }
                                                        }}>
                                                            {videoDatamap.thumbnail != "" ? (<Card.Img variant="top slick-slide-image shadow" src={videoDatamap.thumbnail} alt={videoDatamap.title} />) : (
                                                                <Card.Img variant="top slick-slide-image shadow" src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} alt="img" />
                                                            )}

                                                        </Link>
                                                    </Card.Header>
                                                    <Card.Body className="p-2 pt-0">
                                                        <h2 className="slick-slide-title">{videoDatamap.title}</h2>
                                                        {videoDatamap.subjectName != "" ?
                                                            <Row className="g-0">
                                                                <Col xs={4}>Subject:</Col>
                                                                <Col xs={8}>{videoDatamap.subjectName}</Col>
                                                            </Row>
                                                            : ("")}
                                                        {videoDatamap.ChapterName != "" ?
                                                            <Row className="g-0">
                                                                <Col xs={4}>Chapter:</Col>
                                                                <Col xs={8}>{videoDatamap.ChapterName}</Col>
                                                            </Row>
                                                            : ("")}
                                                        {videoDatamap.topicName != "" ?
                                                            <Row className="g-0">
                                                                <Col xs={4}>Topic:</Col>
                                                                <Col xs={8}>{videoDatamap.topicName}</Col>
                                                            </Row>
                                                            : ("")}
                                                    </Card.Body>
                                                    <Card.Footer className="bg-white border-0 d-flex align-items-center justify-content-between p-2">
                                                        <div className="views">
                                                            {/* <i className="fas fa-eye text-dark" /> : {videoDatamap.views} */}
                                                        </div>
                                                        {videoDatamap.pdf_file != "" ? <Button variant="link" onClick={() => this.modalShow1(videoDatamap.title, videoDatamap.pdf_file)}>View Notes</Button> : ("")}
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        ) : ("No Data Available")}

                    </Col>
                </Row>

                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </div>
        )
    }
}

export default withRouter(RecentlyWatchedVideoSection)
