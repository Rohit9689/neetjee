import React, { Component } from 'react'
import { currentExamData, comingExamData } from '../StudentHomeData';
import { Card, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ContentLoader from 'react-content-loader';

class PracticeExams extends Component {
    constructor(props) {
        super(props);
        this.preLoader = this.preLoader.bind(this);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        setTimeout(this.preLoader, 1000);
    }

    preLoader() {
        this.setState({ isLoading: false })
    }
    render() {
        return (
            this.state.isLoading ?
                <Card className="border-0 my-3">
                    <div className="showcase-component">
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={560}
                            viewBox="0 0 420 560"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                        </ContentLoader>
                    </div>
                </Card>
                :
                <div className="aside-card my-3">
                    <Card className="currentExams border-0 mb-4">
                        <Card.Header className="bg-white border-0 d-flex align-items-center px-3">
                            <div className="icon mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27.588" height="30.653" viewBox="0 0 27.588 30.653"><defs><linearGradient id="b" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#55b5fe" /><stop offset="1" stopColor="#0060ce" /></linearGradient></defs><path fill="url(#b)" d="M2.071,26.92a1.563,1.563,0,0,1-.22-.49,2.17,2.17,0,0,1-.075-.565V10.85l7.77-5.914a.944.944,0,0,0,.186-.383.758.758,0,0,0-.038-.4.678.678,0,0,0-.22-.308L7.217,1.913h14.3a2.078,2.078,0,0,1,1.515.619,2.019,2.019,0,0,1,.628,1.494v6.69L25.21,9.223v-5.2A3.508,3.508,0,0,0,24.1,1.439a2.638,2.638,0,0,0-.222-.2,2.957,2.957,0,0,1-.22-.2L23.361.9A.55.55,0,0,0,23.1.75L22.807.6c-.1-.023-.2-.054-.314-.092a1.752,1.752,0,0,0-.314-.073c-.1-.011-.2-.025-.314-.034a2.9,2.9,0,0,0-.353-.021H5.065L4.99.42c-.084.023-.128.042-.165.054a.252.252,0,0,0-.094.057L4.548.748A.29.29,0,0,0,4.475.93L.3,11.116a.61.61,0,0,0-.075.291V25.864a3.465,3.465,0,0,0,1.09,2.565,3.576,3.576,0,0,0,2.6,1.079h4.1l.554-1.529H3.919A2.078,2.078,0,0,1,2.4,27.358c-.125-.149-.234-.293-.333-.439ZM5.95,12.645H18.962v1.533H5.95V12.645Zm9.889,3.577v1.531H5.95V16.222ZM12.2,19.8v1.533H5.95V19.8ZM5.95,9.07h15.1V10.6H5.95V9.07Zm7.514,13.949,9.728-9.355a1.8,1.8,0,0,1,.594-.374,1.841,1.841,0,0,1,.684-.134,1.8,1.8,0,0,1,.678.134,2.112,2.112,0,0,1,.6.377l1.538,1.485a1.717,1.717,0,0,1-.006,2.477l-9.751,9.38-4.065-3.991ZM12.345,24.1l-1.571,1.513L9.307,30.33l-.234.707L14.941,29.5l1.469-1.414L12.345,24.1ZM23.426,27.3a2.229,2.229,0,0,1-1.6.634H18.211l-.81,1.569h4.427a3.848,3.848,0,0,0,2.753-1.1,3.532,3.532,0,0,0,1.153-2.632V21.331l-1.64,1.531v2.912a2.059,2.059,0,0,1-.669,1.529Z" transform="translate(-0.224 -0.384)" /></svg>
                            </div>
                            <h6 className="mb-0">Current Exams</h6>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled schedule_exams">
                                {
                                    currentExamData.map((item) => {
                                        const { id, itemType, days, name, totalStudents, dicount, imgSticker } = item;
                                        return (
                                            <li key={id} className={`currentexam-lists ${itemType}`}>
                                                <Card className="single-card h-100">
                                                    <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center text-left">
                                                            <div className="examTypeImage">
                                                                <Image src={require('../../../../images/Neet-Exam.png')} width="45" height="50" alt="logo" roundedCircle />
                                                            </div>
                                                            <div className="ml-1 text">
                                                                <Card.Title className="mb-1 h6">{name}</Card.Title>
                                                                <Card.Text className="text-muted">Attempted Students : <small className="text-dark font-weight-bold">{totalStudents}</small></Card.Text>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="days font-weight-bold">{days}</p>
                                                            <Image className="my-1" src={imgSticker} width="20" height="20" alt="logo" roundedCircle />
                                                            <p className="dicount">{dicount}</p>
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer className="py-1 border-0 text-center">
                                                        <Card.Link to="#">Start Exam</Card.Link>
                                                    </Card.Footer>
                                                </Card>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Card.Body>
                    </Card>
                    <Card className="upcomingExams border-0">
                        <Card.Header className="bg-white border-0 d-flex align-items-center px-3">
                            <div className="icon mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27.588" height="30.653" viewBox="0 0 27.588 30.653"><defs><linearGradient id="a" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#feaf55" /><stop offset="1" stopColor="#f05d70" /></linearGradient></defs><path fill="url(#a)" d="M2.071,26.92a1.563,1.563,0,0,1-.22-.49,2.17,2.17,0,0,1-.075-.565V10.85l7.77-5.914a.944.944,0,0,0,.186-.383.758.758,0,0,0-.038-.4.678.678,0,0,0-.22-.308L7.217,1.913h14.3a2.078,2.078,0,0,1,1.515.619,2.019,2.019,0,0,1,.628,1.494v6.69L25.21,9.223v-5.2A3.508,3.508,0,0,0,24.1,1.439a2.638,2.638,0,0,0-.222-.2,2.957,2.957,0,0,1-.22-.2L23.361.9A.55.55,0,0,0,23.1.75L22.807.6c-.1-.023-.2-.054-.314-.092a1.752,1.752,0,0,0-.314-.073c-.1-.011-.2-.025-.314-.034a2.9,2.9,0,0,0-.353-.021H5.065L4.99.42c-.084.023-.128.042-.165.054a.252.252,0,0,0-.094.057L4.548.748A.29.29,0,0,0,4.475.93L.3,11.116a.61.61,0,0,0-.075.291V25.864a3.465,3.465,0,0,0,1.09,2.565,3.576,3.576,0,0,0,2.6,1.079h4.1l.554-1.529H3.919A2.078,2.078,0,0,1,2.4,27.358c-.125-.149-.234-.293-.333-.439ZM5.95,12.645H18.962v1.533H5.95V12.645Zm9.889,3.577v1.531H5.95V16.222ZM12.2,19.8v1.533H5.95V19.8ZM5.95,9.07h15.1V10.6H5.95V9.07Zm7.514,13.949,9.728-9.355a1.8,1.8,0,0,1,.594-.374,1.841,1.841,0,0,1,.684-.134,1.8,1.8,0,0,1,.678.134,2.112,2.112,0,0,1,.6.377l1.538,1.485a1.717,1.717,0,0,1-.006,2.477l-9.751,9.38-4.065-3.991ZM12.345,24.1l-1.571,1.513L9.307,30.33l-.234.707L14.941,29.5l1.469-1.414L12.345,24.1ZM23.426,27.3a2.229,2.229,0,0,1-1.6.634H18.211l-.81,1.569h4.427a3.848,3.848,0,0,0,2.753-1.1,3.532,3.532,0,0,0,1.153-2.632V21.331l-1.64,1.531v2.912a2.059,2.059,0,0,1-.669,1.529Z" transform="translate(-0.224 -0.384)" /></svg>
                            </div>
                            <h6 className="mb-0">Up Coming Exams</h6>
                        </Card.Header>
                        <Card.Body>
                            <ul className="list-unstyled schedule_exams">
                                {
                                    comingExamData.map((item) => {
                                        const { id, Active, itemType, name, Examdate, likes } = item;
                                        return (
                                            <li key={id} className={`upcomingexam-lists ${Active} ${itemType}`}>
                                                <Card as={Link} to="#" className="single-card h-100">
                                                    <Card.Body className="p-2 single-card-body d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center text-left">
                                                            <div className="examTypeImage">
                                                                <Image src={require('../../../../images/Neet-Exam.png')} width="45" height="50" alt="logo" roundedCircle />
                                                            </div>
                                                            <div className="ml-xl-4 ml-lg-4 text">
                                                                <Card.Title className="mb-1 h6">{name}</Card.Title>
                                                                <Card.Text className="text-dark">{Examdate}</Card.Text>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="like-icon fa-2x fad fa-thumbs-up"></span>
                                                            <p className="likes">{likes}</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
        )
    }
}

export default PracticeExams
