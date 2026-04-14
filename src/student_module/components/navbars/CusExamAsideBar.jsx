import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Card, Image, Button } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import logo from '../../../images/logo.svg'

import './_navbars.scss'


const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class CusExamAsideBar extends Component {
    constructor(props) {
        super(props)
        const questionsData = props.stateData.questions.map((item) => {
            return { ...item, sidebutton: "0" }

        });
        console.log("questionsData", questionsData);
        this.state = {
            questions: questionsData,
            examSubjects: props.stateData.examSubjects
        }
    }
    idFunction(data) {
        let id = parseInt(data + 1);
        return id;
    }
    classNameFunction(data) {
        console.log("classNameFunction", data.attempted, data.status, data.saveandnext);
        let cname = "list-inline-item";
        if (data.attempted != null) {
            cname = "list-inline-item attempted";
        }
        else if (data.status == "skip") {
            cname = "list-inline-item bookmark";
        }
        // else if (data.status == "review") {
        //     cname = "list-inline-item views";
        // }
        else if (data.status == "" && data.saveandnext == "1") {
            cname = "list-inline-item bookmark";
        }
        return cname;

    }
    //backup
    // classNameFunction(data) {
    //     console.log("classNameFunction", data.isSubmitted);
    //     let cname = "list-inline-item";
    //     if (data.attempted != null) {
    //         cname = "list-inline-item attempted";
    //     }
    //     else if (data.status == "skip") {
    //         cname = "list-inline-item bookmark";
    //     }
    //     return cname;

    // }
    //bckup
    // notViewedCountFunction(data) {

    //     let wrongA = [];
    //     let currectA = [];
    //     let skipA = [];
    //     for (let i = 0; i < data.length; i++) {
    //         let idata = data[i];
    //         if (idata.status == "wrong") {
    //             const id = idata.id;
    //             wrongA.push(id);
    //         }
    //         else if (idata.status == "currect") {
    //             const id = idata.id;
    //             currectA.push(id);
    //         }
    //         else if (idata.status == "skip") {
    //             const id = idata.id;
    //             skipA.push(id);
    //         }

    //     }

    //     let nviewed = parseInt(data.length - wrongA.length - currectA.length - skipA.length);
    //     return nviewed;
    // }

    notViewedCountFunction(data) {

        let wrongA = [];
        let currectA = [];
        let skipA = [];
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            if (idata.status == "wrong") {
                const id = idata.id;
                wrongA.push(id);
            }
            else if (idata.status == "currect") {
                const id = idata.id;
                currectA.push(id);
            }
            else if (idata.status == "skip") {
                const id = idata.id;
                skipA.push(id);
            }
            else if (idata.status == "" && idata.saveandnext == "1") {
                const id = idata.id;
                skipA.push(id);
            }

        }

        let nviewed = parseInt(data.length - wrongA.length - currectA.length - skipA.length);
        return nviewed;
    }
    // skipFunction(data) {
    //     let skipA = [];
    //     for (let i = 0; i < data.length; i++) {
    //         let idata = data[i];
    //         if (idata.status == "skip") {
    //             const id = idata.id;
    //             skipA.push(id);
    //         }
    //     }
    //     return skipA.length;
    // }
    // currentFunction(data) {
    //     let currectA = [];
    //     for (let i = 0; i < data.length; i++) {
    //         let idata = data[i];
    //         //if (idata.isSubmitted == true) {
    //         if (idata.attempted != null) {
    //             const id = idata.id;
    //             currectA.push(id);
    //         }
    //         //}
    //     }
    //     return currectA.length;
    // }

    wrongFunction(data) {
        let wrongA = [];
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            if (idata.isSubmitted == true) {
                if (idata.status == "wrong") {
                    const id = idata.id;
                    wrongA.push(id);
                }
            }

        }
        return wrongA.length;
    }

    skipFunction(data) {
        let skipA = [];
        console.log("skipFunctiondata", data);
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            if (idata.status == "skip" || (idata.status == "" && idata.saveandnext == "1")) {
                console.log("skipskip");
                skipA.push(idata.id);
            }
            // if (idata.status == "" && idata.saveandnext == "1") {
            //     console.log("saveandnext");
            //     skipA.push(idata.id);
            // }
        }
        return skipA.length;
    }
    reviewFunction(data) {
        let skipA = [];
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            if (idata.status == "review") {
                const id = idata.id;
                skipA.push(id);
            }
        }
        return skipA.length;
    }
    currentFunction(data) {
        let currectA = [];
        for (let i = 0; i < data.length; i++) {
            let idata = data[i];
            //if (idata.isSubmitted == true) {
            if (idata.attempted != null) {
                const id = idata.id;
                currectA.push(id);
            }
            //}
        }
        return currectA.length;
    }
    subjectFilter = (subtype) => {
        console.log("subtype", subtype);
        const activeSubjects = this.state.examSubjects.map((item) => {
            if (item.id == subtype) {
                return { ...item, active: "active" }

            }
            return { ...item, active: "" }

        });
        this.setState({
            examSubjects: activeSubjects,
        });
        this.props.parentSubjectfilter(subtype);
    }

    render() {
        const lqlength = this.props.stateData.questions.length - 1;
        console.log("pesection", this.props.stateData.questions.filter((a) => a.sidebutton == "0"));
        const qudata = this.props.stateData.questions.filter((a) => a.sidebutton == "0");
        //console.log("ExamAsideBar", this.props.stateData);
        return (
            <div id="examAsidebar" className="exam-asidebar">
                <div className="sidebar-header px-3 py-2">
                    <Link
                    //to="/student/home"
                    >
                        {/* <Image className="logo" src={logo} width="100" alt="Image" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="159.501" height="37.139" className="logo"
                            viewBox="0 0 159.501 37.139">
                            <g transform="translate(-384.741 -406.553)">
                                <g transform="translate(445.845 406.553)">
                                    <path fill="#2a346c"
                                        d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z"
                                        transform="translate(-825.498 -406.553)" />
                                    <path fill="#2a346c"
                                        d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z"
                                        transform="translate(-983.902 -406.553)" />
                                    <path fill="#2a346c"
                                        d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z"
                                        transform="translate(-1047.488 -442.954)" />
                                    <path fill="#2a346c"
                                        d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z"
                                        transform="translate(-1167.251 -441.157)" />
                                    <path fill="#2a346c"
                                        d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z"
                                        transform="translate(-1309.031 -441.157)" />
                                </g>
                                <g transform="translate(445.797 439.343)">
                                    <path fill="#2a346c"
                                        d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                                        transform="translate(-825.153 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z"
                                        transform="translate(-864.261 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                        transform="translate(-907.798 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z"
                                        transform="translate(-969.577 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                        transform="translate(-1009.586 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z"
                                        transform="translate(-1047.869 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z"
                                        transform="translate(-1088.442 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                        transform="translate(-1125.485 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z"
                                        transform="translate(-1161.778 -643.074)" />
                                    <path fill="#2a346c" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z"
                                        transform="translate(-1200.4 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z"
                                        transform="translate(-1261.126 -643.074)" />
                                    <path fill="#2a346c"
                                        d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z"
                                        transform="translate(-1304.889 -643.45)" />
                                    <path fill="#2a346c" d="M1431.991,643.51h.785v4.228h-.785Z"
                                        transform="translate(-1347.863 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z"
                                        transform="translate(-1372.971 -643.45)" />
                                    <path fill="#2a346c"
                                        d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z"
                                        transform="translate(-1417.109 -643.45)" />
                                </g>
                                <g transform="translate(384.741 406.948)">
                                    <path fill="#2a346c"
                                        d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z"
                                        transform="translate(-384.741 -409.399)" />
                                    <path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z"
                                        transform="translate(-571.865 -409.399)" />
                                </g>
                            </g>
                        </svg>

                    </Link>
                </div>
                <Scrollbars style={{ height: '80vh' }}
                    renderThumbVertical={renderThumb}
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}>
                        <ul className="assessment-nav-filter p-2">
                        {this.state.examSubjects.map((item, index) => {
                            return (<li className={item.active}>
                                <a onClick={() => this.subjectFilter(item.id)}>{item.subject}</a>
                            </li>);
                        })}
                    </ul>
                    <div className="questionnor_block m-3">
                        <div className="d-flex justify-content-between mb-2 text-dark">
                            <h6>Questions</h6>
                            <h6>{qudata.length}</h6>
                        </div>
                        <Scrollbars style={{ height: 300 }}
                            renderThumbVertical={renderThumb}
                            autoHide
                            autoHideTimeout={500}
                            autoHideDuration={200}>
                            <ul className="questionNos list-inline">
                                {this.props.stateData.questions.map((Data, index) => {
                                    if (Data.sidebutton == "0") {
                                        return( <li className={this.classNameFunction(Data)} onClick={(e) => this.props.psideQFun(index)}>{this.idFunction(index)}</li>)
                                    }
                                   
})}
                            </ul>
                        </Scrollbars>
                        <div className="mark_status mt-4 d-flex justify-content-between align-items-center">
                            <Card as={Card.Body} className="single_mark align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center">
                                <span className="icon_status" />
                                <div className="status_name">Not Viewed</div>
                                <div className="status_count">{this.notViewedCountFunction(this.props.stateData.questions)}</div>
                            </Card>
                            {/* <Card as={Card.Body} className="single_mark align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center">
                                <span className="icon_status views" />
                                <div className="status_name">Wrong</div>
                                <div className="status_count">{this.wrongFunction(this.props.stateData.questions)}</div>
                            </Card> */}
                            <Card as={Card.Body} className="single_mark align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center">
                                <span className="icon_status bookmark" />
                                <div className="status_name">Skip</div>
                                <div className="status_count">{this.skipFunction(this.props.stateData.questions)}</div>
                            </Card>
                            <Card as={Card.Body} className="single_mark align-items-center w-100 h-100 pt-2 pb-1 border-0 p-0 text-center">
                                <span className="icon_status attempted" />
                                <div className="status_name">Answered</div>
                                <div className="status_count">{this.currentFunction(this.props.stateData.questions)}</div>
                            </Card>
                        </div>
                    </div>
                </Scrollbars>
                <div className="footer-block pb-3 text-center">
                    <ul className="list-unstyled">
                        
                        {/* <li>
                            {this.props.stateData.index != lqlength ? ("") : (<Button variant="success" className="px-4" onClick={this.props.ParenthandleFormSubmit}>Finish Exam</Button>)}
                        </li> */}
                    </ul>
                </div>

            </div>
        )
    }
}

export default withRouter(CusExamAsideBar);
