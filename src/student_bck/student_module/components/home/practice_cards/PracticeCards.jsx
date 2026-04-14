import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { withRouter } from "react-router-dom";
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
class PracticeCards extends Component {
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
            classname = "learn_practice my-3 border-0 botany";
        } else if (getData.id == "2") {
            classname = "learn_practice my-3 border-0 physics";
        } else if (getData.id == "3") {
            classname = "learn_practice my-3 border-0";
        } else if (getData.id == "5") {
            classname = "learn_practice my-3 border-0 zoology";
        } else if (getData.id == "4") {
            classname = "learn_practice my-3 border-0 maths";
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
            
            const singleSubject=getSubjects.getSubjects.find((a)=>a.id==this.props.getChapters.id);
            const chapters=this.props.getChapters.studentChapters.map((smap)=>{
                const singlechap=singleSubject.studentChapters.find((a)=>a.id==smap.id);
                if(singlechap!=undefined){
                    return{...smap, accuracy:singlechap.accuracy}

                }
             });
             console.log("PracticeCards",this.props.getSubjects);
            const Data = chapters.sort((a, b) => {
                return a.accuracy - b.accuracy;
            });
            return (
                <Card
                    className={this.leastChapter(this.props.getSubjects)}
                >
                    <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center pt-4">
                        <div className="title d-flex align-items-center pl-2">
                            <i className="fa-2x fad fa-book-reader icon mr-2" /><h6 className="mb-0">Learn &amp; Practise<br /> <span className="text-muted mb-0" style={{ fontSize: 12 }}>Least 5 Accurate Chapters</span></h6>

                        </div>

                    </Card.Header>
                    <Card.Body>
                        <ul className="list-unstyled topic-lists m-0">
                            {Data.map((item1, index1) => {
                                console.log("item1item1item1", item1);
                                if (index1 < 5) {
                                    return (
                                        <li key={item1.id} className="singleTopic">
                                            <Card
                                                as={Card.Body}
                                                className="topic-card flex-row justify-content-between align-items-center"
                                            >
                                                <div className="topicNames">
                                                    <p className="mb-0 text-muted">
                                                        <span>{this.idFunction(index1)}</span> -{" "}
                                                        {item1.chapter}
                                                    </p>
                                                </div>
                                                <div className="percentage">
                                                    <Card className="flex-row align-items-center p-2 border-0">
                                                        <h6 className="mb-0 mr-3">
                                                            {item1.accuracy}%
                                                    </h6>
                                                        <a>
                                                            <i
                                                                onClick={() =>
                                                                    this.props.practceRedirect(
                                                                        item1,
                                                                        this.props.isuserValid.lp_practice_exam
                                                                    )
                                                                }
                                                                className="fas fa-long-arrow-alt-right"
                                                            />
                                                        </a>
                                                    </Card>
                                                </div>
                                            </Card>
                                        </li>
                                    );
                                }
                            })}
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
    (PracticeCards)
);
