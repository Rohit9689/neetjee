import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Image, Nav, Accordion } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import logo from '../../../images/logo.svg'
import small_logo from '../../../images/small-logo.png';
import * as Cookies from "es-cookie";
import gifImage from "../../../images/new-gif-icon.png";
import './_navbars.scss';
import StartingModal from '../../components/home/starting_modal/StartingModal';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from '../../pages/GoogleAnalytics';
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
class WebAsideNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            StartingModalShow: false
        }
    }
    componentDidMount = () => {
        console.log("localStorage.getItem", localStorage.getItem("homemodal"));
        if (localStorage.getItem("homemodal") == "true") {
            this.setState({
                StartingModalShow: true
            })
        }
    }
    onHide = () => {
        console.log("onHide");
        this.setState({ StartingModalShow: false });
        localStorage.setItem("homemodal", "false");
    }

    getAccordianActive = () => {
        switch (this.props.history.location.pathname) {

            // Analysis
            case "/student/result-analysis":
                return 1;
            case "/student/practice-exam-analysis":
                return 1;
            case "/student/strength-analysis":
                return 1;
            case "/student/time-analysis":
                return 1;
            case "/student/complexity-analysis":
                return 1;
            case "/student/error-analysis":
                return 1;
            case "/student/questiontype-analysis":
                return 1;

            case "/student/get-ready-for-exam":
                return 2;
            case "/student/bookmark":
                return 2;
            case "/student/notes":
                return 2;

            default: return 0;
        }
    }

    getActiveClassTwo = (link) => {

        if (link === this.props.history.location.pathname)
            return "collapse-item active";
        else
            return "collapse-item";
    }

    getActiveClass = (link) => {
        if (link === this.props.history.location.pathname)
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subjects" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/topics" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/pre-exam-test" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/chapter" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/chapter-status" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/practice-exam-history" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/start-watching" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/start-learning" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/short-notes" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/start-error-exam" && link === "/student/learn-practice")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/subject/start-error-exam/error-exam" && link === "/student/learn-practic")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/schedule-exam" && link === "/student/exams")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/adaptive-exam" && link === "/student/exams")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/custom-exam" && link === "/student/exams")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/error-exam" && link === "/student/exams")
            return "nav-link active";
        else if (this.props.history.location.pathname === "/student/videos/recently-watched" && link === "/student/videos")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/previous-paper-exam" && link === "/student/exams")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/custom-previous-paper-exam" && link === "/student/exams")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/chapter-exam" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/cumulative-exam" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/semigrand-exam" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/grand-exam" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/get-ready-shortnotes-and-materials" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/get-ready-shortnotes/single-shortnote" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/get-ready-for-exam/history" && link === "/student/get-ready-for-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/videos" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/videos/watch-video" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/shortnotes-and-materials" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/shortnotes-and-material/single-shortnote" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/practice-questions" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/bookmark/exam-questions" && link === "/student/bookmark")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/videos" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/videos/watch-video" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/shortnotes-and-materials" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/shortnotes-and-material/single-shortnote" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/shortnotes-and-material/single-revisions-material" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/practice-questions" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/notes/exam-questions" && link === "/student/notes")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/revision-material-groups/custom-revision-materials" && link === "/student/revision-material-groups")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/revision-material-groups/custom-single-revision-material" && link === "/student/revision-material-groups")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/exams/custom-practise-exam" && link === "/student/exams/custom-practise-exam")
            return "nav-link active";

        else if (this.props.history.location.pathname === "/student/student-blog/student-blog-view" && link === "/student/student-blog")
            return "nav-link active";
        else if (this.props.history.location.pathname === "/student/featuredvideos" && link === "/student/featuredvideos")
            return "nav-link active";
        else if (this.props.history.location.pathname === "/student/createpreviouspaperexam" && link === "/student/createpreviouspaperexam")
            return "nav-link active";

        else
            return "nav-link";
    }



    forumLink = () => {
        const title = GoogleAnalyticsArray[0].Doubts_App;
        ReactGA.pageview(Cookies.get("forumlink"), ["ELAPP"], title);

        window.open(Cookies.get("forumlink"), "_blank")
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar-header mb-0 px-2 py-2">
                    <Link
                        to="/student/home"
                        className={this.getActiveClass("/student/home")}>
                        {/* <Image className="logo" src={logo} width="100" alt="Image" />
                        <Image className="small_logo" src={small_logo} width="40" style={{ marginLeft: -22 }} alt="Image" /> */}
                      <img loading='lazy' width="150" height="43" className='mt-2 bg-white' src='https://entrolabs.com/assets/logo/logo-black.png' alt='logo '/>
                    </Link>
                </div>
                <Scrollbars style={{ height: '80vh' }}
                    renderThumbVertical={renderThumb}
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}>
                    <Nav className="navbar-nav menu">
                        <Accordion defaultActiveKey={this.getAccordianActive()}>
                            <Nav.Item>
                                <Link className={this.getActiveClass("/student/home")} to="/student/home">
                                    <i className="fal fa-home" title="Home" /> <span>Home</span>
                                </Link>
                            </Nav.Item>
                            {this.props.isuserValid.ins_mock_test == true ? ("") : (<Nav.Item>

                                <Link className={this.getActiveClass("/student/exams/test-series")} to="/student/exams/test-series">
                                    <i className="fal fa-badge-check" title="Exams History" /> <span>Mock Tests<Image className="ml-2" src={gifImage} alt="New" width="40" /></span>
                                </Link>

                            </Nav.Item>)}
                            {
                                Cookies.get("examid") == 2 && this.props.isuserValid.ins_jee_mains_2021 == false ? (
                                    <Nav.Item>
                                        <Link className={this.getActiveClass("/student/createpreviouspaperexam")} to="/student/createpreviouspaperexam">
                                            <i className="fal fa-clipboard-list-check" title="JEE Mains 2021" /> <span>JEE Mains 2021<Image src={gifImage} className="ml-1" alt="New" width="31" /></span>
                                        </Link>
                                    </Nav.Item>
                                ) : ("")
                            }
                            {this.props.isuserValid.ins_previous_paper_analysis_tab == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/previous-paper-analysis")} to="/student/previous-paper-analysis">
                                    <i className="fal fa-gift-card" title="Previous Paper Analysis" /><span>Previous Paper Analysis</span>
                                </Link>
                            </Nav.Item>)}
                            {this.props.isuserValid.ins_linkage_analysis_tab == true ? ("") : (
                                <Nav.Item>
                                    <Link className={this.getActiveClass("/student/linkage-chapter-analysis")} to="/student/linkage-chapter-analysis">
                                        <i className="fal fa-link" title="Linkage Chapter Analysis" /><span>Linkage Chapter Analysis</span>
                                    </Link>
                                </Nav.Item>
                            )}
                            <hr className="sidebar-divider" />
                            {this.props.isuserValid.ins_learn_tab == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/learn-practice")} to="/student/learn-practice">
                                    <i className="fal fa-book-reader" title="Learn &amp; Practice" /><span>Learn &amp; Practise</span>
                                </Link>
                            </Nav.Item>)}

                            {this.props.isuserValid.ins_videos_tab == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/videos")} to="/student/videos">
                                    <i className="fal fa-video" title="Videos" /> <span>Videos<Image src={gifImage} className="ml-2" alt="New" width="40" /></span>
                                </Link>
                            </Nav.Item>)}

                            {this.props.isuserValid.ins_help_videos == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/featuredvideos")} to="/student/featuredvideos">
                                    <i className="fal fa-video" title="Help Videos" /> <span>Help Videos<Image src={gifImage} className="ml-2" alt="New" width="40" /></span>
                                </Link>
                            </Nav.Item>)}



                            {this.props.isuserValid.ins_exam_tab == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/exams")} to="/student/exams">
                                    <i className="fal fa-clipboard-list-check" title="Create Exam" /> <span>Create Exam</span>
                                </Link>
                            </Nav.Item>)}



                            {this.props.isuserValid.ins_analysis_tab == true ? ("") : (
                                <Nav.Item>
                                    <Link className={this.getActiveClass("/student/result-analysis")} to="/student/result-analysis">
                                        <i className="fal fa-analytics" title="Result &amp; Analysis" /><span>Performance Analysis</span>
                                    </Link>
                                </Nav.Item>

                            )}
                            <hr className="sidebar-divider" />

                            {this.props.isuserValid.ins_revision_material_tab == true ? ("") : (<Nav.Item>
                                <Link className={this.getActiveClass("/student/revision-material-groups")} to="/student/revision-material-groups">
                                    <i className="fal fa-books" title="Revision Materials" /> <span>Revision Material</span>
                                </Link>
                            </Nav.Item>)}
                            {this.props.isuserValid.ins_ready_exam_tab == false || this.props.isuserValid.ins_bookmarks_tab == false || this.props.isuserValid.ins_notes_tab == false ? (
                                <React.Fragment>
                                    <Accordion.Header as={Nav.Item} eventKey={2} className="HasChild">
                                        <span className="nav-link" style={{ cursor: 'pointer' }}>
                                            <i className="fal fa-cogs" title="Learning Tools" /> <span>Learning Tools</span>
                                        </span>
                                    </Accordion.Header>
                                    <Accordion.Body eventKey={2}>
                                        <div className="collapse-inner">
                                            {this.props.isuserValid.ins_ready_exam_tab == true ? ("") : (<Nav.Item>
                                                <Link className={this.getActiveClassTwo("/student/get-ready-for-exam")} to="/student/get-ready-for-exam">
                                                    <i className="fal fa-running" title="Get Ready For Exam" /> <span>Get Ready For Exam</span>
                                                </Link>
                                            </Nav.Item>)}
                                            {this.props.isuserValid.ins_bookmarks_tab == true ? ("") : (<Nav.Item>
                                                <Link className={this.getActiveClassTwo("/student/bookmark")} to="/student/bookmark">
                                                    <i className="fal fa-bookmark" title="Bookmarks" /> <span>Bookmarks</span>
                                                </Link>
                                            </Nav.Item>)}

                                            {this.props.isuserValid.ins_notes_tab == true ? ("") : (<Nav.Item>
                                                <Link className={this.getActiveClassTwo("/student/notes")} to="/student/notes">
                                                    <i className="fal fa-book" title="Notes" /> <span>Notes</span>
                                                </Link>
                                            </Nav.Item>)}

                                        </div>
                                    </Accordion.Body>
                                </React.Fragment>
                            ) : ("")}

                            {this.props.isuserValid.ins_blog == true ? ("") : (
                                <Nav.Item>
                                    <Link className={this.getActiveClass("/student/student-blog")} to="/student/student-blog">
                                        <i className="fal fa-blog" /><span>Blog<Image src={gifImage} className="ml-2" alt="New" width="40" /></span>
                                    </Link>
                                </Nav.Item>
                            )}

                            {this.props.isuserValid.ins_package_tab == true ? ("") : (<React.Fragment>
                                {Cookies.get("student_userlevel") != 1 ? (<Nav.Item>
                                    <Link className={this.getActiveClass("/student/package")} to="/student/package">
                                        <i className="fal fa-sack" title="Package" /> <span>Subscription Plans</span>
                                    </Link>
                                </Nav.Item>) : ("")}
                            </React.Fragment>)}
                            {/* <hr className="sidebar-divider" /> */}
                            {/* {this.props.isuserValid.ins_doubts_tab == true ? ("") : (
                                    <Nav.Item>
                                        <Link className={this.getActiveClass("/student/previous-paper-analysis")} onClick={() => this.forumLink()}>
                                            <i className="fal fa-paper-plane" title="Doubts App" /> <span>Doubts App</span>
                                        </Link>
                                    </Nav.Item>
                                )} */}


                        </Accordion>

                    </Nav>
                </Scrollbars>
                <StartingModal show={this.state.StartingModalShow} onHide={this.onHide} />
            </React.Fragment>
        )
    }
}

export default withRouter(WebAsideNavbar);
