import React, { Component } from "react";
import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import QuestionPaperResultSection from "../components/questioners/manage_questin_papers/QuestionPaperResultSection";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";
import DataTableWithOutSearch from '../components/datatables/DataTableWithOutSearch'
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";



import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import ManageStudentResult from "../components/questioners/manage_questin_papers/ManageStudentResult";

const FETCH_EXAMS = gql`
  query($institution_id: Int!,$exam_paper_id:Int) {
    manageQuestions(institution_id: $institution_id,exam_paper_id: $exam_paper_id){
        id
        name
            exam_type
            no_of_sets
            start_time
            end_time
            is_completed
            filename
            exam_name
            class
            class_id
            sub_exam_type
            total_question_count
            section
            branch
            student_results{
              session_id
              student_name
              mobile
              email
              branch_id
              class_id
              section_id
              correct
              wrong
              not_answered
              total_questions
              correct_marks
              negative_marks
              total_marks
              accuracy
              speed
              attempted_exam
            }
            exam_questions{
              id
              subject
              chapter
              question
              option1
              option2
              option3
              option4
              qtype
              complexity
              chapter_name
              compquestion
              list1type
              list2type
              mat_question
              answer
              inputquestion
            }
            result_graph{
              limit
              percentage
            }
        }
    }
`;


const GET_GLOBALS = gql`
 query($institution_id: Int!) {
          globals(institution_id: $institution_id) {
            exams{
            id
            exam
            exam_subjects{
                subject_id
            }
            avg_question_time
        }
            globalBranches{
              id
              branch_name
            }
            globalSections{
              id
              section_name
            }
            classes{
              id
              class
            }
            subjects{
            id
            subject
            chapters{
                id
                chapter
                topics{
                    id
                    topic
                    # practice_percentage
                }
                class
            }
        }
          }
        }
`;

class QuestionPaperResult extends Component {
  menuToggler = () => {
    const toggled = Cookies.get("toggle");
     if (toggled === "wrapper") {
         this.setState({toggled:"wrapper sidebar-enable"});
         Cookies.set("toggle", "wrapper sidebar-enable");
     } else {
         this.setState({toggled:"wrapper"});
         Cookies.set("toggle", "wrapper");
     }
 };
  render() {
    
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getExams = this.props.getExams;
    const loading2 = getExams.loading;
    const error2 = getExams.error;

    //if (loading2) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }
    

    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          {/* <NavbarOne onClick={() => this.menuToggler()} /> */}
          {/* {(loading1 == true && loading2 == true) ? (<PreloaderTwo />) : (
            <React.Fragment>
              <div className="overlay" onClick={() => this.menuToggler()} />
              <div className="main-content">
                <QuestionPaperResultSection
                  getExams={getExams.manageQuestions}
                  globals={globals.globals}
                  getLocationData={this.props.location.state}
                  student_results={this.props.location.state.student_results} />
                <ManageStudentResult
                  globals={globals.globals}
                  student_results={this.props.location.state.student_results} />
              </div>
            </React.Fragment>

          )} */}
          {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
          <NavbarOne onClick={() => this.menuToggler()} />

          <div className="overlay" onClick={() => this.menuToggler()} />
          {
            !loading1 && !loading2 && (
              <div className="main-content">
                <QuestionPaperResultSection
                  getExams={getExams.manageQuestions}
                  globals={globals.globals}
                />
                <ManageStudentResult
                  globals={globals.globals}
                  student_results={getExams.manageQuestions[0].student_results} />
              </div>)}
          <Footer />
        </div>
      </div>
    );
  }
}



export default withRouter(
  compose(
    graphql(
      GET_GLOBALS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          },
          fetchPolicy: 'cache-and-network'
        }),
        name: "globals"
      }
    ),
    graphql(FETCH_EXAMS,

      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid")),
            exam_paper_id: parseInt(props.location.state.exam_id)
          }
          ,
          fetchPolicy: 'cache-and-network'
        }), name: "getExams"
      })

  )(QuestionPaperResult)
);
