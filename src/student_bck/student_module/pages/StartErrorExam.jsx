import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import AsideNavbar from '../components/navbars/AsideNavbar'
import Navbars from '../components/navbars/Navbars'
import StartErrorExamSection from '../components/learn_practice/start_error_exam/StartErrorExamSection';
import ChepterHeaderSectionTwo from '../components/learn_practice/top_header/ChepterHeaderSectionTwo';
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../components/preloader/PreloaderTwo';


class StartErrorExam extends Component {
    render() {
        console.log("StartErrorExam", this.props.history.location.state);
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");

        const getStudentSessions = this.props.getStudentSessions;
        const loading1 = getStudentSessions.loading;
        const error1 = getStudentSessions.error;

        const getErrorDetails = this.props.getErrorDetails;
        const loading2 = getErrorDetails.loading;
        const error2 = getErrorDetails.error;
        
        

        //if (loading1 || loading2) return null;
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        
        //console.log("getUserExplored", isStudentUserValid.isStudentUserValid);
        
        
        return (

            <React.Fragment>
                <div className="header-area">
                    <Navbars onClick={() => this.props.changeToggle()} />
                </div>
                <div className="main-wrapper">
                    {(loading1 == true ||
                        loading2 == true) && (<PreloaderTwo />)}
                    <AsideNavbar />
                    {
                        !loading1 && !loading2 && (
                            <div className="content-wrapper pt-0">
                                <ChepterHeaderSectionTwo
                                   getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                />
                                <Container fluid={true}>
                                    <StartErrorExamSection
                                        getErrorDetails={getErrorDetails.getErrorDetails}
                                        getStudentSessions={getStudentSessions.getStudentSessions}
                                        getChapterId={this.props.history.location.state != undefined ? this.props.history.location.state : ""}
                                    />
                                </Container>
                            </div>
                        )}

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(compose(
    graphql(gql` 
    query(
          $mobile: String!, $session_id: ID, $chapter_id: Int) {
            getStudentSessions(mobile: $mobile, session_id: $session_id, chapter_id:$chapter_id){
              id
              correct
              wrong
              not_answered
              total_questions
              correct_marks
              negative_marks
              total_marks
              in_time
              less_time
              over_time
              accuracy
              speed
              type
              subject
              chapter
              qtype_report{
                question_type
                question_type_name
                correct
                wrong
                not_answered
              }
              error_report{
                error
                error_name
                count
              }
              timestamp
          }
      }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    session_id: 0,
                    chapter_id: parseInt(props.history.location.state.ocid)
                },
                fetchPolicy: 'cache-and-network'
            }), name: "getStudentSessions"
        }),
    graphql(gql` 
    query($mobile: String!,
        $topic_id: Int,
        $chapter_id: Int) {
            getErrorDetails(mobile: $mobile,
        topic_id: $topic_id,
        chapter_id: $chapter_id){
            overall{
                
                    not_answered
                    correct_answered
                    wrong_answered
                
            }
            practice{
                not_answered
                correct_answered
                wrong_answered
            }
            test{
                not_answered
                correct_answered
                wrong_answered

            }
            
        }
    }
    `,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    topic_id: parseInt(props.history.location.state.otid),
                    chapter_id: parseInt(props.history.location.state.ocid)
                },
                fetchPolicy: 'cache-and-network'
            }), name: "getErrorDetails"
        })
)(StartErrorExam));
