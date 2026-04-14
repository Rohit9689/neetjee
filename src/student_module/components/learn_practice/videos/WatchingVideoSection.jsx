import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
import { recentdVideo, similarRecentdVideo, recommendedVideos } from './VideoData'
import '../_subjects.scss'
import BuyChapterVideoModal from '../subjects/BuyChapterVideoModal';
import InstituteVideosSection from './InstituteVideosSection';
import * as Cookies from "es-cookie";
import { withApollo } from "@apollo/client/react/hoc";
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql } from "@apollo/client";
import { components } from 'react-select'
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown"
import { MultiSelect } from "react-multi-select-component";
import PdfModal from '../subjects/PdfModal';
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-6q0nyr-Svg"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
            </components.DropdownIndicator>
        )
    );
};
class WatchingVideoSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            getVideos: props.getVideos,
            page: props.page,
            loader: 0,
            hasMore: true,
            records: "",
            searchclass: "0",
            searchclassValue: "All Classes",
            chaptertypevalue: [],
            chaptertype: [],
            modalShow1: false,
            modaltitle: "",
            pdf_file: ""

        }
    }
    modalShow1 = (title, pdf_file) => {
        this.setState({ modalShow1: true, modaltitle: title, pdf_file: pdf_file })

    }
    handleMultipleSelectInputChange = (e, name) => {
        console.log("handleMultipleSelectInputChange", e, name);
        if (name == "chaptertype") {
            let chaptertype = Array();
            let chaptertypevalue = Array();
            if (e != null) {
                if (e.length > 0) {
                    for (let i = 0; i < e.length; i++) {
                        const chaptertypeval = e[i];
                        const newObj = {
                            label: chaptertypeval.label,
                            value: chaptertypeval.value
                        }
                        chaptertypevalue.push(newObj);
                        chaptertype.push(chaptertypeval.value);
                    }
                    this.setState({
                        chaptertypevalue: chaptertypevalue,
                        chaptertype: chaptertype
                    });
                }
                else {
                    this.setState({
                        chaptertypevalue: [],
                        chaptertype: []
                    });

                }

            }

        }

    };
    selecthandleInputChange = (ename, evalue) => {
        const name = ename;
        const value = evalue;
        let studentGlobals = "";
        if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
            studentGlobals = JSON.parse(localStorage.getItem("studentglobals"));
        }
        else {
            this.props.history.push("/student/login");
        }
        if (name == "searchclass") {
            if (value != "0") {
                let classData = studentGlobals.classes.find((a) => a.id == value);
                this.setState({
                    searchclassValue: {
                        value: classData.id,
                        label: classData.class
                    }
                });
            }
            else {
                this.setState({
                    searchclassValue: {
                        value: "0",
                        label: "All Classes"
                    }
                });
            }
        }
        this.setState({ [name]: value });
    }
    onScrollgetVideos = async (e) => {
        console.log("this.state.getVideos.length", this.state.getVideos.length);
        if (this.state.getVideos.length < 9) {
            this.setState({ hasMore: false });
        }
        else {
            let page = parseInt(this.state.page) + 1;
            const result = await this.props.client.query({
                query: gql`
                query($params: VideosInput) {
                  getVideos(
                    params: $params
                  ) {
                    videoDetails{
                      totalVideos
                      videosList{
                            id
                            paid_video
                            title
                            subject
                            class
                            chapter
                            description
                            video_url
                            vimeo_url
                            subjectName
                            ChapterName
                            topicName
                            likes
                            dislikes
                            views
                            is_purchased
                            thumbnail
                            video_id
                            created_timestamp
                            pdf_file
                      }
                    }
                    }
                }
              `,
                variables: {
                    params: {
                        mobile: Cookies.get("mobile"),
                        exam: parseInt(Cookies.get("examid")),
                        class1: 0,
                        subject: parseInt(this.props.ComponentParams.subject),
                        chapter: this.props.ComponentParams.chapter,
                        institute_id: 0,
                        page: parseInt(page)
                    }
                },
            })
            console.log("params:", {
                mobile: Cookies.get("mobile"),
                exam: parseInt(Cookies.get("examid")),
                class1: 0,
                subject: parseInt(this.props.ComponentParams.subject),
                chapter: this.props.ComponentParams.chapter.toString(),
                institute_id: 0,
                page: parseInt(page)
            });

            if (result.data.getVideos.length == 0) {
                this.setState({ hasMore: false, page: page });
                return;
            }
            else {
                setTimeout(() => {
                    this.setState({
                        page: page,
                        getVideos: this.state.getVideos.concat(result.data.getVideos)
                    });
                }, 500);
            }
        }
    }

    classFun(data) {
        let array = [];
        console.log("classFun", data);
        if (data.length > 0) {
            data.map((cmap) => {
                const obj = {
                    value: cmap.id,
                    label: cmap.class
                }
                array.push(obj);

            })

            const obj1 = {
                value: "0",
                label: "All Classes"
            }
            array.unshift(obj1);
        }
        return array;

    }
    pdfonHide = () => {
        this.setState({
            modalShow1: false
        })
    }
    onHide = () => {
        this.setState({
            modalShow: false
        })
    }

    render() {
        console.log("currentstate", this.state);
        const { id, videoThumbnail, Title, subTitle } = recentdVideo[0];

        let selectionType = "";
        if (this.props.ComponentParams.chapter != "0") {

            selectionType = "chapter";
        }
        else {
            selectionType = "subject";
        }
        console.log("InfiniteScroll", this.props.ComponentParams, selectionType);
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
        //start get subject data
        let chapternewArray = [];
        globalsubjects.map((cmap) => {
            if (this.props.ComponentParams.subject == cmap.id) {
                cmap.studentChapters.map((chmap) => {
                    let gcharray = [];
                    this.state.getVideos.videoDetails.videosList.map((item) => {
                        gcharray.push(item.chapter);
                    })

                    const uniquegcharray = [...new Set(gcharray)];
                    //console.log("uniquegcharray", uniquegcharray, chmap.chapter);
                    if (uniquegcharray.includes(chmap.id.toString())) {
                        const obj = {
                            value: chmap.id,
                            label: chmap.chapter
                        }
                        chapternewArray.push(obj);
                    }

                });

            }


        })
        let chapterselectall = false;
        let chapterlabelledBy = "Select";
        let chapterdisableSearch = false;
        if (chapternewArray.length > 0) {
            chapterselectall = false;
            chapterdisableSearch = false;
        }
        else {
            chapterdisableSearch = true;
            chapterselectall = false;
            chapterlabelledBy = "No Options"
        }
        //end get test data 
        let videosList = this.state.getVideos.videoDetails.videosList;
        console.log("No Options", videosList);
        if (this.state.searchclass != "0" || this.state.chaptertype.length > 0) {
            if (this.state.searchclass != "0") {
                videosList = this.state.getVideos.videoDetails.videosList.filter((a) => a.class == this.state.searchclass);
            }
            if (this.state.chaptertype.length > 0) {
                videosList = this.state.getVideos.videoDetails.videosList.filter((a) => this.state.chaptertype.includes(a.chapter.toString()));
            }
        }

        console.log("videosList123", this.state.chaptertype);
        let bstatus = false;
        videosList.map((vmap) => {
            if (vmap.is_purchased == false) {
                bstatus = true
            }

        });



        return (
            <React.Fragment>
                {this.state.getVideos.length > 7 ? (
                    <InfiniteScroll
                        dataLength={this.state.getVideos.length}
                        next={this.onScrollgetVideos}
                        hasMore={this.state.hasMore}
                        loader={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Loading...</b>
                            </p>}
                        endMessage={
                            <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <section className="subject_section pt-3">
                            <Row className="align-items-center">
                                <Col xl={4} lg={12} md={12}>
                                    <div className="title-block mt-3 mb-2">
                                        {selectionType == "chapter" ? (<h5 className="title mb-0">{this.state.getVideos.videoDetails.videosList.length > 0 ? (this.state.getVideos.videoDetails.videosList[0].ChapterName) : ("")}</h5>) : ("")}

                                        <p className="text-gray4">Select video to Start Learning &amp; practise</p>
                                    </div>
                                </Col>
                                <Col xl={8} lg={12} md={12} className="d-flex">
                                    {this.props.ComponentParams.chapter == "0" ? (
                                        <React.Fragment>
                                            <div className="second mr-2" style={{ width: 200 }}>
                                                <SelectDropDown
                                                    stateData={this.state.searchclassValue}
                                                    handleChange={this.selecthandleInputChange}
                                                    name="searchclass"
                                                    options={this.classFun(studentGlobals.classes)}
                                                    placeholderName={'Classes'}
                                                    dropdownIndicator={{ DropdownIndicator }}
                                                />
                                            </div>
                                            <div className="second mr-2" style={{ width: 200 }}>
                                                <Form.Group controlId="SelectExam">

                                                    <MultiSelect

                                                        overrideStrings={{
                                                            "allItemsAreSelected": "All Chapters are selected.",
                                                            "selectSomeItems": chapterlabelledBy
                                                        }
                                                        }
                                                        disableSearch={chapterdisableSearch}
                                                        hasSelectAll={chapterselectall}
                                                        options={chapternewArray}
                                                        value={this.state.chaptertypevalue}
                                                        onChange={(e) => this.handleMultipleSelectInputChange(e, "chaptertype")}
                                                        labelledBy={"Chapter"}
                                                    />

                                                </Form.Group>
                                            </div>
                                        </React.Fragment>

                                    ) : ("")}
                                    {bstatus == true ? (<Button className="btn btn-darkblue py-2 ml-3 px-4" style={{ height: 40 }} onClick={() => this.setState({ modalShow: true })}>Buy This Chapter video</Button>) : ("")}
                                    <BuyChapterVideoModal
                                        globalsubjects={globalsubjects}
                                        getChapterId={this.props.getChapterId}
                                        selectionType={selectionType}
                                        ComponentParams={this.props.ComponentParams}
                                        show={this.state.modalShow} onHide={this.onHide} />

                                </Col>
                            </Row>
                            <div className="mb-3 WatchingVideos">
                                <Row>
                                    <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                        <h5>ELAPP Videos</h5>
                                    </Col>
                                    {videosList.map((videoData, index) => {
                                        if (videoData.is_purchased == true) {
                                            return (
                                                <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} >

                                                    <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <Link to={{
                                                            pathname: "/student/subject/start-video-watching",
                                                            state: {
                                                                index: index,
                                                                videosList: videosList.filter((a) => a.is_purchased == true),
                                                                getChapterId: this.props.getChapterId,
                                                                ComponentParams: this.props.ComponentParams,

                                                            }
                                                        }}>
                                                            <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                            {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                                <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                            )}
                                                        </Link>
                                                        <div className="content pt-1">
                                                            <h6 className="px-2 title">{videoData.title}</h6>
                                                            <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                                {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>) : ("")}
                                                            </div>
                                                        </div>
                                                    </Card>

                                                </Col>
                                            )

                                        }
                                        else {
                                            return (
                                                <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} >
                                                    {/* <Link
                                                        
                                                        to={{
                                                            pathname: "/student/subject/video-watching",
                                                            state: {
                                                                videoObj: videoData,
                                                                getChapterId: this.props.getChapterId

                                                            }
                                                        }}
                                                    > */}
                                                    <Card style={{ cursor: "pointer" }} as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                        <div onClick={() => this.setState({ modalShow: true })} >
                                                            <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                            {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                                <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                            )}
                                                        </div>

                                                        <div className="content pt-1">
                                                            <h6 className="px-2 title">{videoData.title}</h6>
                                                            <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                            <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                                {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>) : ("")}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    {/* </Link> */}
                                                </Col>

                                            )
                                        }

                                    })}
                                </Row>
                                {Cookies.get("student_userlevel") == "1" ? (
                                    <InstituteVideosSection
                                        stateData={{
                                            searchclass: this.state.searchclass,
                                            chaptertype: this.state.chaptertype
                                        }}
                                        ComponentParams={this.props.ComponentParams}
                                        defaultActiveKey={this.props.defaultActiveKey}
                                        getChapterId={this.props.getChapterId} />) : ("")}


                            </div>
                        </section>
                    </InfiniteScroll>
                ) : (
                    <section className="subject_section pt-3">
                        <Row className="align-items-center">
                            <Col xl={4} lg={12} md={12}>
                                <div className="title-block mt-3 mb-2">
                                    {selectionType == "chapter" ? (<h5 className="title mb-0">{this.state.getVideos.videoDetails.videosList.length > 0 ? (this.state.getVideos.videoDetails.videosList[0].ChapterName) : ("")}</h5>) : ("")}

                                    <p className="text-gray4">Select video to Start Learning &amp; practise</p>
                                </div>
                            </Col>
                            <Col xl={8} lg={12} md={12} className="d-flex">
                                {this.props.ComponentParams.chapter == "0" ? (
                                    <React.Fragment>
                                        <div className="second mr-2" style={{ width: 200 }}>
                                            <SelectDropDown
                                                stateData={this.state.searchclassValue}
                                                handleChange={this.selecthandleInputChange}
                                                name="searchclass"
                                                options={this.classFun(studentGlobals.classes)}
                                                placeholderName={'Classes'}
                                                dropdownIndicator={{ DropdownIndicator }}
                                            />
                                        </div>
                                        <div className="second mr-2" style={{ width: 200 }}>
                                            <Form.Group controlId="SelectExam">

                                                <MultiSelect

                                                    overrideStrings={{
                                                        "allItemsAreSelected": "All Chapters are selected.",
                                                        "selectSomeItems": chapterlabelledBy
                                                    }
                                                    }
                                                    disableSearch={chapterdisableSearch}
                                                    hasSelectAll={chapterselectall}
                                                    options={chapternewArray}
                                                    value={this.state.chaptertypevalue}
                                                    onChange={(e) => this.handleMultipleSelectInputChange(e, "chaptertype")}
                                                    labelledBy={"Chapter"}
                                                />

                                            </Form.Group>
                                        </div>
                                    </React.Fragment>

                                ) : ("")}
                                {bstatus == true ? (<Button className="btn btn-darkblue py-2 ml-3 px-4" style={{ height: 40 }} onClick={() => this.setState({ modalShow: true })}>Buy This Chapter video</Button>) : ("")}
                                <BuyChapterVideoModal
                                    globalsubjects={globalsubjects}
                                    getChapterId={this.props.getChapterId}
                                    selectionType={selectionType}
                                    ComponentParams={this.props.ComponentParams}
                                    show={this.state.modalShow} onHide={this.onHide} />
                            </Col>
                        </Row>
                        <div className="mb-3 WatchingVideos">
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} className="mb-3">
                                    <h5>ELAPP Videos</h5>
                                </Col>
                                {videosList.map((videoData, index) => {
                                    if (videoData.is_purchased == true) {
                                        console.log("videoData", videoData);
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} >

                                                <Card as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <Link
                                                        to={{
                                                            pathname: "/student/subject/start-video-watching",
                                                            state: {
                                                                videosList: videosList.filter((a) => a.is_purchased == true),
                                                                //videoObj: videoData,
                                                                index: index,
                                                                getChapterId: this.props.getChapterId,
                                                                ComponentParams: this.props.ComponentParams

                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-badge-check position-absolute" style={{ top: 10, right: 10, color: '#00C596' }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                            <Image
                                                                src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"}
                                                                title="vimeo-player" fluid />
                                                        )}
                                                    </Link>
                                                    <div className="content pt-1">
                                                        <h6 className="px-2 title">{videoData.title}</h6>
                                                        <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>) : ("")}
                                                        </div>
                                                    </div>
                                                </Card>

                                            </Col>
                                        )

                                    }
                                    else {
                                        return (
                                            <Col key={id} xl={4} lg={4} md={6} sm={12} xs={12} >
                                                {/* <Link 

                                                    
                                                    to={{
                                                        pathname: "/student/subject/video-watching",
                                                        state: {
                                                            videoObj: videoData,
                                                            getChapterId: this.props.getChapterId

                                                        }
                                                    }}
                                                    > */}
                                                <Card style={{ cursor: "pointer" }} as={Card.Body} className="p-0 single_video shadow-sm mb-4">
                                                    <div onClick={() => this.setState({ modalShow: true })}>
                                                        <i className="fas fa-lock text-warning position-absolute" style={{ top: 10, right: 10 }}></i>
                                                        {videoData.thumbnail != "" ? (<Image src={videoData.thumbnail} title={videoData.title} fluid />) : (
                                                            <Image src={"https://source.unsplash.com/M185_qYH8vg/1780x1040"} title="vimeo-player" fluid />
                                                        )}
                                                    </div>

                                                    <div className="content pt-1">
                                                        <h6 className="px-2 title">{videoData.title}</h6>
                                                        <p className="px-2 subject text-uppercase d-flex" style={{ fontSize: 12 }}><strong style={{ width: '25%' }}>Subject :</strong> <span>{videoData.subjectName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 chapter text-uppercase d-flex"><strong style={{ width: '25%' }}>Chapter :</strong> <span>{videoData.ChapterName}</span></p>
                                                        <p style={{ fontSize: 12 }} className="px-2 topic text-uppercase d-flex"><strong style={{ width: '25%' }}>Topic :</strong> <span>{videoData.topicName}</span></p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="likes pl-2 text-dark"><i className="fas fa-eye text-dark" />: {videoData.views}</div>
                                                            {videoData.pdf_file != "" ? (<Button onClick={() => this.modalShow1(videoData.title, videoData.pdf_file)} variant="link" className="videodurations text-white text-decoration-none">View Notes</Button>) : ("")}

                                                        </div>
                                                    </div>
                                                </Card>
                                                {/* </Link> */}
                                            </Col>

                                        )
                                    }

                                })}
                            </Row>
                            {Cookies.get("student_userlevel") == "1" ? (
                                <InstituteVideosSection
                                    stateData={{
                                        searchclass: this.state.searchclass,
                                        chaptertype: this.state.chaptertype
                                    }}
                                    ComponentParams={this.props.ComponentParams} defaultActiveKey={this.props.defaultActiveKey} getChapterId={this.props.getChapterId} />) : ("")}
                        </div>
                        {videosList.length == 0 ? (<p style={{ textAlign: "center" }}>
                            <b>No data available </b>
                        </p>) : (<p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>)}
                    </section>
                )}
                <PdfModal
                    modaltitle={this.state.modaltitle}
                    pdf_file={this.state.pdf_file}
                    show={this.state.modalShow1} onHide={() => this.setState({ modalShow1: false })} />
            </React.Fragment>



        )
    }
}


export default withApollo((WatchingVideoSection));
