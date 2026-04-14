import React, { Component } from 'react'
import SingleCard from './SingleCard';
import { Link } from "react-router-dom"
import { Col, Card, Image } from 'react-bootstrap'

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";


// const FETCH_SECTIONSCATEGORY = gql`
//   query($institution_id: Int!) {
//     getSectionCategories(institution_id: $institution_id) {
//       id
//       section_category
//       package_id
//       category_id
//       branch_ids
//       class_ids
//       section_ids
//       branch_id_values
//       class_id_values
//       section_id_values
//       package_name
//     }
//   }
// `;

const FETCH_SECTIONS = gql`
  query($institution_id: Int!) {
    getSections(institution_id: $institution_id) {
      id
      section_name
      category_id
      branch_id
      section_category_id
      category_name
      branch_name
      high_difficult
      difficult
      moderate
      easy
    }
  }
`;

const FETCH_CATEGORIES = gql`
  query($institution_id: Int!) {
    getCategories(institution_id: $institution_id) {
        category_name
      id
      high_difficult
      difficult
      moderate
      easy
      exams_covered
      branch_ids
      section_ids
      section_names
      branch_names
    }
  }
`;

const FETCH_GLOBALS = gql`
  query($institution_id: Int!) {
    globals(institution_id: $institution_id) {
         questionTypes{
            id
            questiontype
            
        }
        questionTheory{
          id
          question_theory
          
      }
      complexity{
          id
          complexity
          
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
      exams{
          id
          exam
          exam_subjects{
            subject_id
            no_of_questions
          }
      }
      
    }
  }
`;
class CardGroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.CustomPatternQuestionsData
        }
    }
    examImageFunction = (data) => {
        console.log("examImageFunction", data);
        if (data == 1) {
            return (require('../../../../images/Neet-Exam.png'));
        } else if (data == 2) {
            return (require('../../../../images/Jee(Mains)-Exam.png'));
        }
        //for mbipc..image not given
        else {
            return (require('../../../../images/Neet-Exam.png'));
        }
    }
    render() {
        console.log("Cookies.get", Cookies.get("institutionid"));
        const getSections = this.props.getSections;
        const loading1 = getSections.loading;
        const error1 = getSections.error;

        const getCategories = this.props.getCategories;
        const loading2 = getCategories.loading;
        const error2 = getCategories.error;

        const globals = this.props.globals;
        const loading3 = globals.loading;
        const error3 = globals.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (error2 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        if (error3 !== undefined) {
            alert("Server Error. " + error2.message);
            return null;
        }
        if (loading1 || loading2 || loading3) return (

            <div className="justify-content-center d-flex align-items-center w-100">
                <div class="spinner-border text-success text-center my-4"></div>
            </div>


        );;
        //console.log("getSections", getSections.getSections);
        //const groupsData = getSections.getSections;
        const groupsData = getCategories.getCategories.filter((a) => a.section_ids != "" && a.branch_ids != "");
        console.log("getCategoriesglobals", getCategories.getCategories,
            globals.globals.exams
        );
        return (
            <React.Fragment>
                {groupsData.map((item) => {
                    let sectionfindData = getSections.getSections.find((a) => a.category_id == item.id);
                    console.log("sectionfindData", sectionfindData);
                    //let categoryfindData = getCategories.getCategories.find((a) => a.id == item.category_id);
                    let examnamefindData = globals.globals.exams.find((a) => a.id == item.exams_covered);
                    let ename = "";
                    if (examnamefindData != undefined) {
                        ename = examnamefindData.exam;
                    }
                    let subArray = [];
                    examnamefindData.exam_subjects.map((item) => {
                        let findData = globals.globals.subjects.find((a) => a.id == item.subject_id);
                        subArray.push(findData.subject);

                    });
                    console.log("subArray", subArray);
                    return (
                        <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                            <Link
                                to={
                                    {
                                        pathname: "/questions/create-question-paper/own-question-paper",
                                        state: {
                                            //groupsData: item,
                                            groupsData: item,
                                            examname: ename,
                                            //categoryfindData: categoryfindData,
                                            categoryfindData: item,
                                            subjects: subArray,
                                            globals: globals.globals,
                                            img: this.examImageFunction(examnamefindData.id)
                                        }
                                    }
                                }
                            >
                                <Card className="single_card shadow-sm border-0 h-100">
                                    <Card.Header className="img_block bg-white">
                                        <Image
                                            //src={require('../../../../images/Neet-Exam.png')} 
                                            src={this.examImageFunction(examnamefindData.id)}
                                            alt="img" />
                                    </Card.Header>
                                    <Card.Body className="content_block pt-5">
                                        <h6 className="title text-uppercase">
                                            {/* {item.section_category} */}
                                            {ename}
                                        </h6>
                                        <div className="class_section_names">{"Category-" + item.category_name}, {"Branch-" + item.branch_names}, {"Section-" + item.section_names}</div>
                                        {/* <div className="description">{this.props.description}</div> */}
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
            </React.Fragment>

        )
    }
}
export default withRouter(
    compose(
        graphql(FETCH_SECTIONS, {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }),
            name: "getSections"
        }),
        graphql(FETCH_CATEGORIES, {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }),
            name: "getCategories"
        }),
        graphql(FETCH_GLOBALS, {
            options: props => ({
                variables: {
                    institution_id: parseInt(Cookies.get("institutionid"))
                }
            }),
            name: "globals"
        })
    )(CardGroupComponent)
);
