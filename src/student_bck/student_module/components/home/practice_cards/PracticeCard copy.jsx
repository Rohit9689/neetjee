import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { learnpracticeData } from '../StudentHomeData';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { withRouter } from "react-router-dom";
import ContentLoader from 'react-content-loader';
const FETCH_GET_SUBJECTS = gql`
  query($mobile: String) {
    getSubjects(mobile: $mobile) {
      id
      studentChapters {
        id
        accuracy
      }
    }
  }
`;
class PracticeCard extends Component {
    constructor(props) {
        super(props);
        this.preLoader = this.preLoader.bind(this);
        this.state = {
            isLoading: true,
        };
    }
    idFunction(data) {
        console.log("idFunction");
        let id = parseInt(data + 1);
        return id;
    }
    componentDidMount() {
        setTimeout(this.preLoader, 1000);
    }

    preLoader() {
        this.setState({ isLoading: false })
    }
    leastChapter() {
        let getData = this.props.getSubjects.getSubjects[this.props.stateData.mainindex];

        let classname = "";
        if (getData.id == "1") {
            classname = "learn_practice border-0 h-100 botany";
        } else if (getData.id == "2") {
            classname = "learn_practice border-0 h-100 physics";
        } else if (getData.id == "3") {
            classname = "learn_practice border-0 h-100";
        } else if (getData.id == "5") {
            classname = "learn_practice border-0 h-100 zoology";
        } else if (getData.id == "4") {
            classname = "learn_practice border-0 h-100 maths";
        }
        return classname;
    }
    render() {
        const getSubjects = this.props.getSubjects;
        const loading1 = getSubjects.loading;
        const error1 = getSubjects.error;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }

        if (loading1) {
            return (

                <Card className="learn_practice my-3 border-0">
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
                </Card>)
        }
        else {

            const singleSubject = getSubjects.getSubjects.find((a) => a.id == this.props.getChapters.id);
            const chapters = this.props.getChapters.studentChapters.map((smap) => {
                const singlechap = singleSubject.studentChapters.find((a) => a.id == smap.id);
                if (singlechap != undefined) {
                    return { ...smap, accuracy: singlechap.accuracy }

                }
            });
            console.log("PracticeCards", this.props.getSubjects);
            const Data = chapters.sort((a, b) => {
                return a.accuracy - b.accuracy;
            });

            return (
                <Card className={this.leastChapter(this.props.getSubjects)}>
                    <Card.Header className="d-flex align-items-center border-0">
                        <div className="icon d-flex align-items-center justify-content-center mr-3">
                            <i className="fa-2x fad fa-book-reader" />
                        </div>
                        <div className="header-text">
                            <Card.Title className="h6">Learn &amp; Practice</Card.Title>
                            <Card.Subtitle>Least 5 Accurate Chapters</Card.Subtitle>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ul className="list-unstyled learn_practice_lists m-0">
                            {Data.map((item1, index1) => {
                                console.log("item1item1item1", item1);
                                if (index1 < 5) {

                                    return (
                                        <li key={item1.id} className="singleTopic">
                                            <Row>
                                                <Col xs={8}>
                                                    <Row className="topic-content">
                                                        <Col xs={3}><div className="sno">{this.idFunction(index1)}</div></Col>
                                                        <Col xs={9} className="content">
                                                            <div className="content-title mb-1">{item1.chapter}</div>
                                                            <div className="content-description"
                                                            style={{cursor:"pointer"}}
                                                                onClick={() =>
                                                                    this.props.practceRedirect(
                                                                        item1,
                                                                        this.props.isuserValid.lp_practice_exam
                                                                    )
                                                                }>Start Practice Now</div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={4}>
                                                    {item1.accuracy != "0" ? (
                                                        <div className="accurancy"><strong>{item1.accuracy}%</strong><br />accurancy</div>
                                                    ) : (<div className="status">Yet to Start</div>)}


                                                </Col>
                                            </Row>
                                        </li>
                                    )
                                }
                            })
                            }
                        </ul>
                    </Card.Body>
                </Card>
            )
        }
    }
}
export default withRouter(
    graphql(FETCH_GET_SUBJECTS, {
        options: (props) => ({
            variables: {
                mobile: Cookies.get("mobile"),
            }
            ,
            fetchPolicy: "no-cache"
        }),
        name: "getSubjects",
    })
        (PracticeCard)
);
