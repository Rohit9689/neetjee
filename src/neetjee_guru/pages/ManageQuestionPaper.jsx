import React, { Component } from "react";
import SideNavbar from "../components/navbars/SideNavbar";
import NavbarOne from "../components/navbars/NavbarOne";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import ManageQuestionPaperSection from "../components/questioners/manage_questin_papers/ManageQuestionPaperSection";
import Footer from "../components/footer/Footer";
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import moment from 'moment';

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

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
            section
            branch
        }
    }
`;
const FETCH_EXAMS_COUNTS = gql` 
query($institution_id: Int!) {
globals(institution_id: $institution_id){
    manageQuestionData{
        total
        ongoing
        completed
        future
    }
    
    }
}
`;

const DELETE_EXAM = gql`
  mutation(
    $exam_paper_id: ID
    ) {
        deleteExamPaper(
            exam_paper_id: $exam_paper_id
    )
  }
`;

class ManageQuestionPaper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 1
    }
  }
  menuToggler = () => {
    const toggled = Cookies.get("toggle");
    if (toggled === "wrapper") {
      this.setState({ toggled: "wrapper sidebar-enable" });
      Cookies.set("toggle", "wrapper sidebar-enable");
    } else {
      this.setState({ toggled: "wrapper" });
      Cookies.set("toggle", "wrapper");
    }
  };
  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    await this.props.handleDelete({
        variables: {
            exam_paper_id: rowIndex.id
        },
        update: (store, { data }) => {

            // ✅ Deep clone to avoid mutating frozen Apollo cache objects
            const data1 = JSON.parse(JSON.stringify(store.readQuery({
                query: FETCH_EXAMS,
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid")),
                    exam_paper_id: 0
                }
            })));

            const globals = JSON.parse(JSON.stringify(store.readQuery({
                query: FETCH_EXAMS_COUNTS,
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            })));

            // ✅ Now safe to mutate since these are cloned copies
            if (rowIndex.is_completed == "completed") {
                globals.globals.manageQuestionData.total -= 1;
                globals.globals.manageQuestionData.completed -= 1;
            } else {
                globals.globals.manageQuestionData.total -= 1;
                let now = moment().unix();
                if (now < rowIndex.start_time && rowIndex.is_completed == "Not completed") {
                    globals.globals.manageQuestionData.future -= 1;
                } else if (now > rowIndex.start_time && now <= rowIndex.end_time && rowIndex.is_completed == "Not completed") {
                    globals.globals.manageQuestionData.ongoing -= 1;
                }
            }

            // ✅ Write cloned + updated data back to store
            try {
                store.writeQuery({
                    query: FETCH_EXAMS_COUNTS,
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid"))
                    },
                    data: globals
                });
            } catch (e) {
                console.log("Exception", e);
            }

            // ✅ Filter out deleted record from cloned list
            data1.manageQuestions = data1.manageQuestions.filter(x => x.id != rowIndex.id);
            try {
                store.writeQuery({
                    query: FETCH_EXAMS,
                    variables: {
                        institution_id: parseInt(Cookies.get("institutionid")),
                        exam_paper_id: 0
                    },
                    data: data1
                });
            } catch (e) {
                console.log("Exception", e);
            }

            if (data.deleteExamPaper) {
                this.setState({ status: 2 });
                setTimeout(() => { this.DeleteSetpageLoad() }, 1000);
            }
        }
    });
}
  DeleteSetpageLoad = () => {
    console.log("setTimeout");
    this.setState({ status: 1 });
  }
  // handleEditFunction = (e, cell, row, rowIndex, formatExtraData) => {
  //   console.log("columnid", rowIndex);

  //   this.props.history.push("/questions/manage-question-paper/question-paper-result",
  //     {
  //       exam_id: rowIndex.id,
  //       exam_name: rowIndex.exam_name,
  //       exam_type: rowIndex.exam_type,
  //       class: rowIndex.class,
  //       class_id: rowIndex.class_id,
  //       sub_exam_type: rowIndex.sub_exam_type,
  //       is_completed: rowIndex.is_completed,
  //       start_time: rowIndex.conducted_on,
  //       filename: rowIndex.filename,
  //       student_results: rowIndex.student_results,
  //       result_graph: rowIndex.result_graph,
  //       start_timestamp: rowIndex.start_time,
  //       //exam_questions: rowIndex.exam_questions,
  //       branch: rowIndex.branch,
  //       section: rowIndex.section
  //     });
  // }
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    const getExams = this.props.getExams;
    const loading2 = getExams.loading;
    const error2 = getExams.error;

    //if (loading1) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    if (error2 !== undefined) {
      alert("Server Error. " + error2.message);
      return null;
    }
    console.log("getExams.manageQuestions", getExams.manageQuestions, Cookies.get("institutionid"));

    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          <NavbarOne onClick={() => this.menuToggler()} />
          {/* {(loading1 == true && loading2 == true) ? (<PreloaderTwo />) : (
            <React.Fragment>
              <div className="overlay" onClick={() => this.menuToggler()} />
              <div className="main-content">
                <ManageQuestionPaperSection
                  stateData={this.state}
                  manageQuestions={getExams.manageQuestions}
                  globals={globals.globals}
                  handleDelete={this.handleDelete} />

              </div>
            </React.Fragment>)} */}
          {(loading1 == true || loading2 == true) && (<PreloaderTwo />)}
          <NavbarOne onClick={() => this.menuToggler()} />

          <div className="overlay" onClick={() => this.menuToggler()} />
          {
            !loading1 && !loading2 && (
              <div className="main-content">
                <ManageQuestionPaperSection
                  stateData={this.state}
                  manageQuestions={getExams.manageQuestions}
                  globals={globals.globals}
                  handleDelete={this.handleDelete} />
              </div>)}

          <Footer />
        </div>
      </div>
    );
  }
}


export default withRouter(compose(
  graphql(FETCH_EXAMS_COUNTS,
    {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
        ,
        fetchPolicy: 'network-only'
      }), name: "globals"
    }),
  graphql(FETCH_EXAMS,

    {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid")),
          exam_paper_id: 0
        }
        ,
        fetchPolicy: 'network-only'
      }), name: "getExams"
    }), graphql(DELETE_EXAM, {
      name: "handleDelete"
    }))(ManageQuestionPaper));