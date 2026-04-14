import React, { Component , Suspense, lazy} from "react";
import { components } from "react-select";
import SingleCard from "./SingleCard";
import { Row, Form, Col, Card, Nav, Tab, Button, Media, Image, Dropdown } from "react-bootstrap";
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ImportentAlert from "../../bookmarks/ImportentAlert";
import UserRestrictionAlert from "../../home/UserRestrictionAlert";

import StickyHelp from '../../navbars/StickyHelp';
const InnerGroupCards = React.lazy(() => import('./InnerGroupCards'));

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-6q0nyr-Svg"
        >
          <path
            fill="currentColor"
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
          ></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class GroupCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.CardsData,
      class: "",
      modalShow: false,
      userRestionModalShow: false,
      sorting: "",
      headerBottomImg: {
        helpImgAlt: 'shortNotes-help-img',
        title:"Short Notes"
    }
    };
  }
  sortingFun = (type) => {
    this.setState({ sorting: type });

  }
  idFunction(data) {
    console.log("idFunction");
    let id = parseInt(data + 1);
    return id;
  }
  defaultKey(index) {
    let remainder = index % 4;
    let returnValue = "";
    if (remainder == 0 || remainder == 4) {
      returnValue = "first";
    } else if (remainder == 1) {
      returnValue = "second";
    } else if (remainder == 2) {
      returnValue = "third";
    } else if (remainder == 3) {
      returnValue = "four";
    }
    return returnValue;
  }
  percentage(att, tot) {

    let per = 0;
    per = (parseInt(att) / parseInt(tot)) * 100;
    let retrunData = "";
    if (!isNaN(per)) {
      retrunData = Math.round(per);
    } else {
      retrunData = 0;
    }
    return retrunData;
  }
  defaultclassGetDataFunction(data) {
    let sarray = [];
    const obj1 = {
      value: 0,
      label: "ALL",
    };
    sarray.push(obj1);
    return sarray[0];
  }
  classGetDataFunction(data) {
    let sarray = [];
    const obj1 = {
      value: 0,
      label: "ALL",
    };
    for (let i = 0; i < data.length; i++) {
      let idata = data[i];
      const obj = {
        value: idata.id,
        label: idata.class,
      };
      sarray.push(obj);
    }
    sarray.push(obj1);
    return sarray;
  }
  handleInputChange = (name, value) => {
    this.setState({
      class: value,
    });
  };
  
  userRestrictionFun = (getChapters, index, isuserValid) => {
    if (getChapters.enabled == true) {

      
      if (isuserValid.lp_topics == false) {
        this.setState({
          userRestionModalShow: false
        });
        this.props.history.push({
          pathname: "/student/subject/topics",
          state: {
            otid: "0",
            ocid: getChapters.id,
            subjectid: this.props.chapters.subjectid,
          }
        });
      }
      else {
        this.setState({
          userRestionModalShow: true
        });
      }
    }
    else {
      this.setState({
        userRestionModalShow: true
      });
    }


  }
  
  render() {
    if (this.props.chapters == undefined) {
      this.props.history.push("/student/learn-practice");
    }
    //for StudentUserValid
    let isStudentUserValid = "";
    if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
      isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
    }
    else {
      this.props.history.push("/student/login");
    }
    const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);
    //for globals
    let studentglobals = "";
    if (JSON.parse(localStorage.getItem("studentglobals")) != "") {
      studentglobals = JSON.parse(localStorage.getItem("studentglobals"));
    }
    else {
      this.props.history.push("/student/login");
    }
    //for subjects
    let globalsubjects = "";
    if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
      globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
    }
    else {
      this.props.history.push("/student/login");
    }
    let subjetsobj = globalsubjects.find((a) => a.id == this.props.chapters.subjectid);
    // const fdata=subjetsobj.studentChapters.map((item)=>{
    //   let ch=subjetsobj.studentChapters.find((a) => a.id == item.id);
    //   console.log("ch", ch);
    //   return{...item, chapter:ch.chapter, topiclength:ch.topics.length,enabled:ch.enabled}

    // })
    let chapters = [];
    if (this.state.class != "") {
      chapters = subjetsobj.studentChapters.filter((a) => a.class == this.state.class);
      if (this.state.sorting != "") {
        if (this.state.sorting == "tasc") {
          chapters = chapters.sort((a, b) => {

            if (a.chapter < b.chapter) {
              return -1;
            }
            if (a.chapter > b.chapter) {
              return 1;
            }
            return 0;

          })


        }
        else if (this.state.sorting == "tdsc") {
          chapters = chapters.sort((a, b) => {

            if (a.chapter > b.chapter) {
              return -1;
            }
            if (a.chapter < b.chapter) {
              return 1;
            }
            return 0;

          })
        }
        else if (this.state.sorting == "pdsc") {
          chapters = chapters.map((item) => {
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return { ...item, lpp: retrunData }
          });
          chapters = chapters.sort((a, b) => {
            return b.lpp - a.lpp

          })


        }
        else if (this.state.sorting == "pasc") {
          chapters = chapters.map((item) => {
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return { ...item, lpp: retrunData }
          });
          chapters = chapters.sort((a, b) => {
            return a.lpp - b.lpp

          })
        }
        else if (this.state.sorting == "wdsc") {
          chapters = chapters.sort((a, b) => {
            return b.error_questions - a.error_questions

          })
        }
        else if (this.state.sorting == "wasc") {
          chapters = chapters.sort((a, b) => {
            return a.error_questions - b.error_questions

          })
        }

      }


    } else {
      chapters = subjetsobj.studentChapters;
      if (this.state.sorting != "") {
        if (this.state.sorting == "tasc") {
          chapters = chapters.sort((a, b) => {

            if (a.chapter < b.chapter) {
              return -1;
            }
            if (a.chapter > b.chapter) {
              return 1;
            }
            return 0;

          })


        }
        else if (this.state.sorting == "tdsc") {
          chapters = chapters.sort((a, b) => {

            if (a.chapter > b.chapter) {
              return -1;
            }
            if (a.chapter < b.chapter) {
              return 1;
            }
            return 0;

          })
        }
        else if (this.state.sorting == "pdsc") {
          chapters = chapters.map((item) => {
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return { ...item, lpp: retrunData }
          });
          chapters = chapters.sort((a, b) => {
            return b.lpp - a.lpp

          })


        }
        else if (this.state.sorting == "pasc") {
          chapters = chapters.map((item) => {
            let per = 0;
            per = (parseInt(item.attempted_questions) / parseInt(item.total_questions)) * 100;
            let retrunData = "";
            if (!isNaN(per)) {
              retrunData = Math.round(per);
            } else {
              retrunData = 0;
            }
            return { ...item, lpp: retrunData }
          });
          chapters = chapters.sort((a, b) => {
            return a.lpp - b.lpp

          })
        }
        else if (this.state.sorting == "wdsc") {
          chapters = chapters.sort((a, b) => {
            return b.error_questions - a.error_questions

          })
        }
        else if (this.state.sorting == "wasc") {
          chapters = chapters.sort((a, b) => {
            return a.error_questions - b.error_questions

          })
        }

      }




    }


    return (
      <div className="cardrows my-2">
        <Row className="align-items-center">
          <Col xl={4} lg={4} md={12}>
            <div className="title my-3">
              <h5 className="mb-0">Learn &amp; Practise
              {/* {this.props.chapters.subject} */}
              </h5>
              <p>Select Chapter to Begin</p>
            </div>
          </Col>
          <Col xl={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} md={12}>
            <div className="d-flex align-items-center">
              <Form.Group
                className="flex-row align-items-center card px-2 py-1 mb-0"
                controlId="selectClass"
              >
                <Form.Label className="text-uppercase mb-0">class</Form.Label>
                <div className="ml-2" style={{ width: 130 }}>
                  <SelectDropDown
                    handleChange={this.handleInputChange}
                    name="class"
                    options={this.classGetDataFunction(
                      studentglobals.classes
                    )}
                    placeholderName={"Select Class"}
                    dropdownIndicator={{ DropdownIndicator }}
                    defaultValue={this.defaultclassGetDataFunction(
                      studentglobals.classes
                    )}
                  />
                </div>
              </Form.Group>
              <Dropdown className="sortingDropdown">
                <Dropdown.Toggle className="ml-2" id="dropdown-basic">
                  <i className="fa fa-sort py-2"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                  <Dropdown.Header className="text-uppercase">Chapter Sorting</Dropdown.Header>
                  <div className="d-flex align-items-center">
                    <Dropdown.Item eventKey="1" onClick={() => this.sortingFun("tasc")}><i className="fas fa-sort-amount-up-alt" /><span> A-Z</span></Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.sortingFun("tdsc")}><i className="fas fa-sort-amount-down-alt" /><span> Z-A</span></Dropdown.Item>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Practise Accuracy</Dropdown.Header>
                  <Dropdown.Item eventKey="3" onClick={() => this.sortingFun("pdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={() => this.sortingFun("pasc")}>Low to High</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header className="text-uppercase">Pending Errors</Dropdown.Header>
                  <Dropdown.Item eventKey="5" onClick={() => this.sortingFun("wdsc")}>High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="6" onClick={() => this.sortingFun("wasc")}>Low to High</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Link to={{
                pathname:"/student/subject/start-watching",
                state: {
                  otid: "0",
                  ocid: "0",
                  subjectid: this.props.chapters.subjectid,
                }
              }}
              className="btn btn-darkblue ml-3 px-4 text-white">videos</Link> */}
            </div>
          </Col>
        </Row>

        <Row>
          {chapters.map((getChapters, index) => {
            return (
              <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                <Card className="subject-card border-0 h-100">
                  <Card.Header className="bg-white border-0 p-2">
                  <a
                      onClick={() => this.userRestrictionFun(getChapters, index, isuserValid)}
                      title="go to topic"
                    >
                      <Media className="p-2">
                        <div className="counter">{this.idFunction(index)}</div>
                        <Media.Body className="ml-2 text-uppercase">
                          <h6 className="title mb-0">{getChapters.chapter}</h6>
                          <p className="mb-0">
                            {" "}
                          Topics: <span>{getChapters.topics.length}</span>{" "}
                          </p>
                        </Media.Body>
                      </Media>
                    </a>
                  </Card.Header>
                  <Card.Body className="p-0">
                    
                    <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <InnerGroupCards
                    enabled={getChapters.enabled}
                    subjectid={this.props.chapters.subjectid}
                    ocid={getChapters.id}
                    isuserValid={isuserValid}/>
                    </Suspense>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>

        <ImportentAlert
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <UserRestrictionAlert
          show={this.state.userRestionModalShow}
          onHide={() => this.setState({ userRestionModalShow: false })}
        />
        {/* <StickyHelp headerBottom={this.state.headerBottomImg} /> */}
      </div>
    );
  }
}

export default withRouter((GroupCards));
