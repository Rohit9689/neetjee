import React, { Component } from 'react'
import { components } from 'react-select'
import { Row, Col, Jumbotron, Image, ResponsiveEmbed, Form, Tab, Nav, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import './_videos.scss'
import FearturedRecentlyWatchedVideos from "./FearturedRecentlyWatchedVideos";
import * as Cookies from "es-cookie";
class FeaturedVideoSection extends Component {
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
            

        }

    }
    render() {
        
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
        
        console.log("FeaturedVideoSection",isuserValid);
        if (isuserValid.help_videos == true) {
            return (
                <div className="video_section pt-4">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <Image src={require('../../../images/locked.png')} width="40" alt="locked image" />
                                {Cookies.get("student_userlevel") == "1" ? (<h5 className="text-danger">Dear Student Now you have limited access.</h5>) : (
                                    <React.Fragment>
                                        <h5 className="text-danger">Dear Student Now you have limited access. To Get Full Access subscribe now</h5>
                                        <Link style={{ color: '#007bff' }} to={"/student/package"}>upgrade to Paid Plan</Link></React.Fragment>

                                )}
                            </div>

                        </Col>
                    </Row>

                </div>
            );
        }
        else{
            return (
                <div className="video_section">
                    <FearturedRecentlyWatchedVideos
                        type={this.props.type}
                        examtype={this.props.examtype}
                        mobile={this.props.mobile}
                        stateData={this.state} 
                        mname="feartured"/>
                </div >
            )
        }
        
        

    }
}

export default withRouter(FeaturedVideoSection);
