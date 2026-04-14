import React, { Component } from 'react'
import SideNavbar from '../components/navbars/SideNavbar'
import NavbarOne from '../components/navbars/NavbarOne'
import Preloader from '../components/preloader/Preloader';
import QuestionsPreviewSection from '../components/questioners/create_question_paper/own_question_paper/own_question_types/QuestionsPreviewSection';
import Footer from '../components/footer/Footer'

import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import ReplaceQuestionsModal from '../components/questioners/create_question_paper/ReplaceQuestionsModal';

const REPLACE_QUESTIONS = gql`
  mutation(
    $params:ReplaceQuestionsInput  
    ) {
      replaceQuestions(
        params: $params
     ){
       
        exam_paper_id
        filename
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
            compquestion
            list1type
            list2type
            mat_question
            answer
            inputquestion
            chapter_name
        }
     }
  }
`;

const FETCH_GLOBALS = gql` 
query($institution_id: Int!) {
    globals(institution_id: $institution_id){
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
        classes{
            id
            class
        }
        globalSections{
            id
            section_name
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
                }
                class
            }
        }
        questionTypes{
            id
            questiontype
        }
        questionTheory{
            id
            question_theory
        }
    }
}

`;


class QuestionsPreview extends Component {
  constructor(props) {
    super(props)
    let examquestionsArray = [];
    if (props.history.location.state.exam_questions.length > 0) {
      examquestionsArray = props.history.location.state.exam_questions.map((item) => {
        return { ...item, checked: false }

      })
    }
    this.state = {
      submitError1: "",
      exam_paper_id: props.history.location.state.exam_paper_id,
      subjects: props.history.location.state.subjects,
      currentStep: 1,
      searchsubject: "0",
      searchsubjectvalue: "",
      searchchapter: "0",
      searchchaptervalue: "",
      questiontypes: [],
      questiontypesvalue: [],
      applicationtheory: "",
      applicationtheoryvalue: "",
      examquestionsArray: examquestionsArray,
      searchquestionid: "",
      modalShow: false,
      questionbankquestions: false,
      ownaddedquestions: false,
      spinnerStatus: "",
      searchsubjectown: "0",
      searchsubjectownvalue: "",
      ownaddedArray: []
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
  replaceQuestions = (e) => {
    let status = false;
    let dataArray = [];
    this.state.examquestionsArray.map(
      (item) => {
        if (item.checked == true) {
          dataArray.push(item.id);
        }
      }
    );
    if (dataArray.length > 0) {
      status = true;
    }
    if (status) {
      this.setState({ modalShow: true, submitError1: "" })
    }
    else if (!status) {
      this.setState({
        submitError1: "Please select at least one question to replace the question", spinnerStatus: ""
      });
    }

  }
  QuestionFunction = (e, questionsdata) => {
    let examquestions = this.state.examquestionsArray.map((item) => {
      if (item.id == questionsdata) {
        if (e.target.checked == true) {
          return {
            ...item, checked: true
          }
        }
        else {
          return {
            ...item, checked: false
          }
        }
      } else {
        return {
          ...item
        }
      }
    });
    this.setState({ examquestionsArray: examquestions });
  }
  ownQuestionFunction = (e, questionsdata) => {
    console.log("ownQuestionFunction", e, questionsdata);
    let newarray = this.state.ownaddedArray;
    let filterData = this.state.ownaddedArray.filter((a) => a.id == questionsdata.id);
    if (e.target.checked == true) {
      if (filterData.length == 0) {
        newarray.push(questionsdata.id);
      }
    }
    else {
      let ownedarray = this.state.ownaddedArray.filter((a) => a != questionsdata.id);
      newarray = ownedarray;
    }

    console.log("ownquestions", newarray);
    this.setState({ ownaddedArray: newarray });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    if (this.state.questionbankquestions == true || this.state.ownaddedquestions == true) {
      if (this.state.ownaddedquestions == true) {

        this.setState({
          spinnerStatus: "1"
        });
        let dataArray = [];
        this.state.examquestionsArray.map(
          (item) => {
            if (item.checked == true) {
              dataArray.push(item.id);
            }
          }
        );
        let own_questions = false;
        if (this.state.ownaddedquestions == true) {
          own_questions = true;
        }
        console.log("lengthss", dataArray.length, this.state.ownaddedArray.length);
        if (dataArray.length == this.state.ownaddedArray.length) {


          let replacequestionsobject = "";
          replacequestionsobject = {
            exam_paper_id: parseInt(this.props.history.location.state.exam_paper_id),
            replace_questions: dataArray.toString(),
            own_questions: own_questions,
            institution_questions: this.state.ownaddedArray.toString(),
            username: Cookies.get("username")
          }
          console.log('replacequestionsobject', replacequestionsobject);
          this.replacequestionsFun(
            replacequestionsobject
          ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
              submitError1: error.graphQLErrors.map(x => x.message), spinnerStatus: ""
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
          });
        }
        else {
          this.setState({ submitError1: "Make sure that replace questions and own added questions count same", spinnerStatus: "" });
        }

      }
      else if (this.state.questionbankquestions == true) {
        this.setState({
          spinnerStatus: "1"
        });
        let dataArray = [];
        this.state.examquestionsArray.map(
          (item) => {
            if (item.checked == true) {
              dataArray.push(item.id);
            }
          }
        );
        let own_questions = false;
        if (this.state.ownaddedquestions == true) {
          own_questions = true;
        }
        let replacequestionsobject = "";
        replacequestionsobject = {
          exam_paper_id: parseInt(this.props.history.location.state.exam_paper_id),
          replace_questions: dataArray.toString(),
          own_questions: own_questions,
          institution_questions: "",
          username: Cookies.get("username")
        }
        console.log('replacequestionsobject', replacequestionsobject);
        this.replacequestionsFun(
          replacequestionsobject
        ).catch(error => {
          console.log("catch if error");
          console.log(error);
          this.setState({
            submitError1: error.graphQLErrors.map(x => x.message), spinnerStatus: ""
          });
          console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });
      }

    } else {
      this.setState({ submitError1: "Please check question bank questions or own added questions", spinnerStatus: "" });
    }
  };
  replacequestionsFun = async (
    params) => {
    await this.props.replacequestionsFun({
      variables: {
        params
      },
      update: (store, { data }) => {
        if (data.replaceQuestions) {
          console.log("repldata", data, data.replaceQuestions.exam_questions);
          const examquestionsArray1 = data.replaceQuestions.exam_questions.map((item) => {
            return { ...item, checked: false }

          })
          this.setState({
            submitError1: "",
            exam_paper_id: data.replaceQuestions.exam_paper_id,
            subjects: this.props.history.location.state.subjects,
            searchsubject: "0",
            searchsubjectvalue: "",
            searchchapter: "0",
            searchchaptervalue: "",
            questiontypes: [],
            questiontypesvalue: [],
            applicationtheory: "",
            applicationtheoryvalue: "",
            examquestionsArray: examquestionsArray1,
            searchquestionid: "",
            //modalShow: false,
            questionbankquestions: false,
            ownaddedquestions: false,
            spinnerStatus: "",
            currentStep: 5,
            filename: data.replaceQuestions.filename,
            ownaddedArray: []
          });
          setTimeout(() => { this.SetpageLoad1() }, 1000);
        }
      }
    });
  };
  SetpageLoad1 = () => {
    this.setState({ currentStep: 1, modalShow: false });

  }
  selecthandleInputChange = (ename, evalue) => {
    console.log("selecthandleInputChange", ename, evalue);
    const name = ename;
    const value = evalue;

    if (name == "searchsubject") {
      let subjectData = this.props.globals.globals.subjects.find((a) => a.id == value);
      this.setState({
        searchsubjectvalue: {
          value: subjectData.id,
          label: subjectData.subject
        }
      });
    }
    if (name == "searchsubjectown") {
      let subjectData = this.props.globals.globals.subjects.find((a) => a.id == value);
      this.setState({
        searchsubjectownvalue: {
          value: subjectData.id,
          label: subjectData.subject
        }
      });
    }
    if (name == "searchchapter") {
      let subjectData = this.props.globals.globals.subjects.find((a) => a.id == this.state.searchsubjectown);
      let chData = subjectData.chapters.find((a) => a.id == value);
      this.setState({
        searchchaptervalue: {
          value: chData.id,
          label: chData.chapter
        }
      });
    }
    if (name == "questiontypes") {
      let questionData = this.props.globals.globals.questionTypes.find((a) => a.id == value);
      this.setState({
        questiontypesvalue: {
          value: questionData.id,
          label: questionData.questiontype
        }
      });
    }
    if (name == "applicationtheory") {
      let theoryData = this.props.globals.globals.questionTheory.find((a) => a.id == value);
      this.setState({
        applicationtheoryvalue: {
          value: theoryData.id,
          label: theoryData.question_theory
        }
      });
    }
    this.setState({ [name]: value });
  }
  handleInputChange = (e) => {
    console.log("handleInputChange", e.target.name, e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    if (name == "questionbankquestions") {
      if (e.target.checked == true) {
        this.setState({ questionbankquestions: true, ownaddedquestions: false });
      }
      else {
        this.setState({ questionbankquestions: false });
      }
    }
    if (name == "ownaddedquestions") {
      if (e.target.checked == true) {
        this.setState({ ownaddedquestions: true, questionbankquestions: false });
      }
      else {
        this.setState({ ownaddedquestions: false });
      }
    }
    this.setState({ searchquestionid: value });
  }
  render() {
    if (Cookies.get("token") == undefined) this.props.history.push("/login");
    const globals = this.props.globals;
    const loading3 = globals.loading;
    const error3 = globals.error;
    if (error3 !== undefined) {
      alert("Server Error. " + error3.message);
      return null;
    }
    console.log("QuestionsPreview", this.props.history.location.state);
    let examquestionsData = this.state.examquestionsArray;
    if (this.state.searchsubject != "0" ||
      this.state.searchchapter != "0" ||
      this.state.questiontypes != "" ||
      this.state.applicationtheory != "") {

      this.state.examquestionsArray.map((item) => {
        if (this.state.searchsubject != "0") {
          examquestionsData = this.state.examquestionsArray.filter((a) => a.subject == this.state.searchsubject);
        }
        if (this.state.searchchapter != "0") {
          examquestionsData = this.state.examquestionsArray.filter((a) => a.chapter == this.state.searchchapter);
        }
        if (this.state.questiontypes != "") {
          examquestionsData = this.state.examquestionsArray.filter((a) => a.qtype == this.state.questiontypes);
        }
        // if (this.state.applicationtheory != "0") {
        //   examquestionsData = this.state.examquestionsArray.filter((a) => a.subject == this.state.applicationtheory);
        // }

      });
    }
    console.log("currentState", this.state);
    let latestData = "";
    if (this.state.searchquestionid != "") {
      console.log("examquestionsData", examquestionsData);
      latestData = examquestionsData.filter((a) => a.id.toString().includes(this.state.searchquestionid));
    }
    else {
      latestData = examquestionsData;
    }


    return (
      <div className={Cookies.get("toggle")}>
        <div className="left-side-menu">
          <SideNavbar onClick={() => this.menuToggler()} />
        </div>
        <div className="content-page">
          {(loading3 == true) && (<PreloaderTwo />)}
          <NavbarOne onClick={() => this.menuToggler()} />
          <div className="overlay" onClick={() => this.menuToggler()} />
          {
            !loading3 && (
              <div className="main-content">
                <QuestionsPreviewSection
                  pselecthandleInputChange={this.selecthandleInputChange}
                  globals={globals.globals}
                  stateData={this.state}
                  breadCrumbsData={this.props.history.location.state}
                  examquestionsData={latestData}
                  QuestionFunction={this.QuestionFunction}
                  handleInputChange={this.handleInputChange}
                  ParentreplaceQuestions={this.replaceQuestions} />
              </div>
            )}

          <Footer />
          <ReplaceQuestionsModal
            pselecthandleInputChange={this.selecthandleInputChange}
            globals={globals.globals}
            phandleInputChange={this.handleInputChange}
            stateData={this.state}
            ParenthandleFormSubmit={this.handleFormSubmit}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false, submitError1: "" })}
            ownQuestionFunction={this.ownQuestionFunction}
          />
        </div>
      </div>
    )
  }
}
export default withRouter(
  compose(
    graphql(REPLACE_QUESTIONS, {
      name: "replacequestionsFun"
    }),

    graphql(FETCH_GLOBALS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        }), name: "globals"
      })

  )
    (QuestionsPreview));
