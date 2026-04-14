import React, { Component } from "react";
import { Link } from "react-router-dom";
import { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Form,
  Popover,
  Nav,
  Tab,
  OverlayTrigger,
  Breadcrumb,
  Button,
  CardGroup,
  Image
} from "react-bootstrap";
import SelectDropDown from "../../../../neetjee_guru/components/selectdropdown/SelectDropDown";
//import './_readyforexam.scss';
import "../_subjects.scss";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import parse, { domToReact } from "html-react-parser";
import InfiniteScroll from 'react-infinite-scroll-component';
import { withApollo } from "@apollo/client/react/hoc";
import RevisionMaterialVideos from "./RevisionMaterialVideos";
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


class RevisionMaterialSection extends Component {
  constructor(props) {
    console.log("constructor", props.getCustomContent);
    super(props);
    this.state = {
      removecontypId: "",
      custonid: "",
      show: true,
      modalShow: false,
      modalShowb: false,
      ctypeId: 0,
      ctypeIdValue: { value: "0", label: "Select All" },
      reportreson: 0,
      reportcomment: "",
      submitError1: "",
      submitError2: "",
      submitError3: "",
      ntags: "",
      ntagsvalue: [],
      nnewtag: "",
      ncomments: "",
      bnewtag: "",
      btags: "",
      btagsvalue: [],
      formErrors: {
        reportreson: "",
        reportcomment: "",
        btags: "",
        bnewtag: "",
        ntags: "",
        nnewtag: "",
        ncomments: "",
      },
      currentStep: 1,
      formValid1: false,
      formValid2: false,
      formValid3: false,
      formValid4: false,
      reportresonValid: false,
      reportcommentValid: false,
      btagsValid: false,
      bnewtagValid: false,
      ntagsValid: false,
      nnewtagValid: false,
      ncommentsValid: false,
      getDerived: 0,


      getCustomContent: props.getCustomContent,
      page: props.stateData.page,
      loader: 0,
      hasMore: true,
      defaultActiveKey: props.stateData.defaultActiveKey
    };
  }




  eventKeyFun = (key) => {
    console.log("eventKeyFun", this.props.getCustomContent);
    this.setState({
      defaultActiveKey: key,
      page: this.props.stateData.page,
      getCustomContent: this.props.getCustomContent,
      loader: 0,
      hasMore: true,
    });
  }

  decodefun(data) {
    var decdata = decodeURIComponent(data);
    decdata = decdata.replace(/font-family/g, "ff");

    return decdata;
  }
  revisionMaterialCount(type, data) {
    console.log("revisionMaterialCount", data);
    if (type == "short") {
      let fdata = data.find((a) => a.id == "1");
      return fdata.total_count;
    }
    else if (type == "video") {
      let fdata = data.find((a) => a.id == "5");
      return fdata.total_count;
    }
    else {
      let count = 0
      data.map((a) => {
        if (a.id != 1 &&
          a.id != 5 &&
          a.id != 9 &&
          a.id != 98 &&
          a.id != 99) {
          count = parseInt(count) + parseInt(a.total_count)
        }
      });
      return count;
    }
    // let SampleArray = [];
    // let count = 0;
    // for (let i = 0; i <= data.length; i++) {
    //   let idata = data[i];
    //   if (idata != undefined) {
    //     SampleArray.push(parseInt(idata.content.length));
    //   }
    // }
    // for (let num of SampleArray) {
    //   count = count + num;
    // }
    // return count;
  }
  handleSelectInputChange = (name, value) => {
    console.log("handleSelectInputChange", name, value);
    let filterData = this.state.getCustomContent.find((a) => a.id == value);
    if (value == "0") {
      this.setState({
        ctypeId: value,
        ctypeIdValue: { value: "0", label: "Select All" },
        page: this.props.stateData.page,
        getCustomContent: this.props.getCustomContent,
        loader: 0,
        hasMore: true,
      });
    }
    else {
      this.setState({
        ctypeId: value,
        ctypeIdValue: { value: value, label: filterData.customcontent + " - " + "(" + filterData.total_count + ")" },
        page: this.props.stateData.page,
        getCustomContent: this.props.getCustomContent,
        loader: 0,
        hasMore: true,
      });
    }

  };
  typesFunction() {
    let data = this.state.getCustomContent;
    //console.log("data", data);
    console.log("getCustomContent", this.state.getCustomContent);
    if (this.state.getCustomContent.length > 0) {
      let sampleArray = [];
      for (let i = 0; i <= this.state.getCustomContent.length; i++) {
        let idata = data[i];
        if (idata != undefined) {
          if (
            idata.id != 1 &&
            idata.id != 5 &&
            idata.id != 9 &&
            idata.id != 98 &&
            idata.id != 99
          ) {
            // let filterData = this.state.getCustomContent.find((a) => a.id == idata.id);
            // console.log("filterData", filterData.content);
            if (idata.total_count > 0) {
              let labelData = idata.customcontent + " - " + "(" + idata.total_count + ")";
              //let labelData = idata.customcontent + " - " + "(" + filterData.content.length + ")";
              //if (filterData.content.length != 0) {
              const newObj = {
                value: idata.id,
                label: labelData,
                //count: filterData.content.length
              };
              sampleArray.push(newObj);
              //}
            }


          }
        }
      }
      // let allcount = 0
      // sampleArray.map((item) => {

      //   allcount = parseFloat(allcount) + parseFloat(item.count)

      // })
      //console.log("allcount", allcount);
      //let alllabelData = "Select All" + " - " + "(" + allcount + ")";
      const newObj1 = {
        value: "0",
        label: "Select All",
      };
      sampleArray.unshift(newObj1);
      return sampleArray;
    }
  }

  contentImage(contentImage) {
    let findData = this.state.getCustomContent.find((a) => a.id == contentImage);
    console.log("contentImage", findData);
    return (findData.image);
  }
  onScrollgetCustomContent = async (e, dactive) => {
    console.log("onScrollgetCustomContent", this.state);
    let onscrollconid = 0;

    let totalcount = 0
    let count1 = 0;
    if (dactive == "first") {
      onscrollconid = 1;
      this.state.getCustomContent.map((map) => {
        if (map.id == "1") {
          totalcount = parseFloat(totalcount) + parseFloat(map.total_count);
        }

      })
      this.state.getCustomContent.map((map) => {
        if (map.id == "1") {
          count1 = parseFloat(count1) + parseFloat(map.content.length);
        }
      })
    }
    else if (dactive == "second") {
      onscrollconid = this.state.ctypeId;
      if (this.state.ctypeId == 0) {
        this.state.getCustomContent.map((map) => {
          if (map.id != 1 && map.id != 5 && map.id != 9 && map.id != 98 && map.id != 99) {
            totalcount = parseFloat(totalcount) + parseFloat(map.total_count);
          }

        })

        this.state.getCustomContent.map((map) => {

          if (map.id != 1 && map.id != 5 && map.id != 9 && map.id != 98 && map.id != 99) {
            count1 = parseFloat(count1) + parseFloat(map.content.length);
          }
        })
      }
      else {
        this.state.getCustomContent.map((map) => {
          if (map.id == this.state.ctypeId) {
            totalcount = parseFloat(totalcount) + parseFloat(map.total_count);
          }

        })
        this.state.getCustomContent.map((map) => {
          if (map.id == this.state.ctypeId) {
            count1 = parseFloat(count1) + parseFloat(map.content.length);
          }
        })

      }

    }

    console.log("countcount", totalcount, count1);
    if (totalcount == count1) {
      this.setState({ hasMore: false });
    }
    else {
      this.setState({ hasMore: true });
      let page = parseInt(this.state.page) + 1;
      console.log("dactivetopicId:", parseInt(this.props.getChapterId.otid),
        "chapterId:", parseInt(this.props.getChapterId.ocid),
        "mobile:", Cookies.get("mobile"),
        "page:", parseInt(page));
      const result = await this.props.client.query({
        query: gql` 
        query(
          $topicId: Int, $chapterId: Int, $mobile: String!,$page: Int, $contentType:Int
            
            ) {
                getCustomContent(
                  topicId: $topicId
                  chapterId: $chapterId
                  mobile: $mobile,
                  page:$page,
                  contentType:$contentType
                )
                {
                  id
                  customcontent
                  content {
                    id
                    subject
                    title
                    description
                    video_link
                    file
                    topic
                    chapter
                    bookmarked
                    stared
                    notes{
                      tags
                      comments
                    }
                    total_views
                    your_views
                    star_count
                    bookmark_count
                  }
                  image
                  total_count
                }
        }
    `,
        variables: {
          topicId: parseInt(this.props.getChapterId.otid),
          chapterId: parseInt(this.props.getChapterId.ocid),
          mobile: Cookies.get("mobile"),
          page: parseInt(page),
          contentType: parseInt(onscrollconid)
        },
        fetchPolicy: 'no-cache'
      })
      let rstatus = true;
      let count = 0;
      if (dactive == "first") {
        result.data.getCustomContent.map((map) => {
          if (map.id == "1") {
            count = parseFloat(count) + parseFloat(map.content.length);
          }
        })
      }
      else if (dactive == "second") {
        if (this.state.ctypeId == 0) {
          result.data.getCustomContent.map((map) => {

            count = parseFloat(count) + parseFloat(map.content.length);

          })
        }
        else {
          result.data.getCustomContent.map((map) => {
            if (map.id == this.state.ctypeId) {
              count = parseFloat(count) + parseFloat(map.content.length);
            }
          })
        }

      }
      //console.log("totalcountcount", totalcount, count);
      if (totalcount != count) {
        rstatus = false;
      }
      console.log("result.data.getCustomContent", "topicId:", parseInt(this.props.getChapterId.otid),
        "chapterId:", parseInt(this.props.getChapterId.ocid),
        "mobile:", Cookies.get("mobile"),
        "page:", parseInt(page), parseInt(onscrollconid), result.data.getCustomContent, rstatus, dactive);
      if (rstatus == true) {
        this.setState({ hasMore: false, page: page });
        return;
      }
      else {
        let getCustomContent = [];
        if (page == 2) {
          getCustomContent = this.props.getCustomContent;
        }
        else {
          getCustomContent = this.state.getCustomContent;
        }

        if (dactive == "first") {

          getCustomContent = getCustomContent.map((a) => {
            const innercontent = result.data.getCustomContent.find((b) => b.id == "1");
            console.log("innercontent1", innercontent);
            if (innercontent.content.length > 0 && a.id == "1") {
              return { ...a, content: a.content.concat(innercontent.content) }
            }
            else {
              return { ...a }
            }
          })
          console.log("ndevi", getCustomContent)
        }
        else if (dactive == "second") {
          if (this.state.ctypeId == 0) {
            getCustomContent=result.data.getCustomContent.map((a)=>{
              const innercontent = getCustomContent.find((b) => b.id == a.id);
                if (a.content.length > 0) {
                  const concatData=innercontent.content.concat(a.content)
                return { ...a, content: concatData }
              }
              else {
                return { ...a, content:innercontent.content}
              }

            })
            // getCustomContent = getCustomContent.map((a) => {
            //   const innercontent = result.data.getCustomContent.find((b) => b.id == a.id);
            //   console.log("innercontent20", innercontent);
            //   if (innercontent.content.length > 0) {
            //     return { ...a, content: a.content.concat(innercontent.content) }
            //   }
            //   else {
            //     return { ...a }
            //   }
            // })
            //console.log("sri", getCustomContent);
          }
          else {
            getCustomContent = getCustomContent.map((a) => {
              const innercontent = result.data.getCustomContent.find((b) => b.id == this.state.ctypeId);
              console.log("innercontent2", innercontent);
              if (innercontent.content.length > 0 && a.id == this.state.ctypeId) {
                return { ...a, content: a.content.concat(innercontent.content) }
              }
              else {
                return { ...a }
              }
            })
            console.log("dev", getCustomContent);
          }
        }


        setTimeout(() => {
          this.setState({
            page: page,
            getCustomContent: getCustomContent
          });
        }, 500);
      }
    }



  }
  render() {
    console.log("hasMore", this.state.hasMore);
    let pagetype = "";
    if (this.props.getChapterId.otid == "0") {
      pagetype = "revisionchview"
    }
    else {
      pagetype = "revisiontopicview"
    }
    const funData1 = this.state.getCustomContent.find((a) => a.id == 1);
    //console.log("funData1", funData1);
    let funData = funData1;
    if (funData1 != undefined) {
      if (this.props.getChapterId.ocid != "0") {
        funData = funData1.content.filter(
          (a) => a.chapter == this.props.getChapterId.ocid
        );
      } else {
        funData = funData1.content;
      }
    }

    const materialData = this.state.getCustomContent.filter(
      (a) => a.id != 1 && a.id != 5 && a.id != 9 && a.id != 98 && a.id != 99
    );
    let newArray = [];
    for (let i = 0; i <= materialData.length; i++) {
      let idata = materialData[i];
      if (idata != undefined) {
        if (idata.content.length > 0) {
          newArray.push(idata);
        }
      }
    }
    let emptyMaterial = [];
    let removecontypId = "";
    if (this.state.ctypeId != 0) {
      const someData = this.state.getCustomContent.find(
        (a) => a.id == this.state.ctypeId
      );
      removecontypId = someData.id;
      if (someData != undefined) {
        if (this.props.getChapterId.ocid != "0") {
          // emptyMaterial = someData.content.filter(
          //   (a) => a.chapter == this.props.getChapterId.ocid
          // );
          emptyMaterial = someData.content.map((item) => {
            if (item.chapter == this.props.getChapterId.ocid) {
              return { ...item, ctype: someData.id }

            }

          });

        } else {
          emptyMaterial = someData.content.map((item) => {

            return { ...item, ctype: someData.id }
          });

        }
      }
    } else {
      if (newArray.length > 0) {
        //removecontypId = newArray[0].id;

        let arr = [];
        newArray.map((smap) => {
          const data = smap.content.map((data1) => {
            return { ...data1, ctype: smap.id }

          })
          arr.push(...data);

        });
        emptyMaterial = arr

      }
    }

    let dactive = this.state.defaultActiveKey;
    if (this.state.defaultActiveKey != "third") {
      if (funData.length == 0) {
        dactive = "second"

      } else if (emptyMaterial.length == 0) {
        dactive = "first"
      }
    }

    //console.log("dactive", dactive);
    //for global subjects
    let globalsubjects = "";
    if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
      globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
    }
    else {
      this.props.history.push("/student/login");
    }
    // Reasons
    console.log("emptyMaterial.length",emptyMaterial.length);
    const Reasons = [
      { value: 1, label: "Reasons-1" },
      { value: 2, label: "Reasons-2" },
      { value: 3, label: "Reasons-3" },
    ];
    const SectionData = [
      {
        value: "NEET 2020",
        label: "NEET 2020",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "JEE 2020", label: "JEE 2020", color: "#0052CC", isFixed: true },
      { value: "EAMCET 2020", label: "EAMCET 2020", color: "#5243AA" },
    ];
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
    const renderThumb = ({ style, ...props }) => {
      const thumbStyle = {
        borderRadius: 6,
        width: "3px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      };
      return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };
    return (
      <div className="get_ready_exam_shortNote_materials">
        <div className="section-description mb-4">
          {/* <h5 className="mb-0 pl-3 pt-3">NEET Exam</h5> */}
          <div className="breadcrumb-content">
            <Breadcrumb>
              {/* <Breadcrumb.Item href="#">{this.props.stateData.subjectname}</Breadcrumb.Item>
                            <Breadcrumb.Item active>{this.props.stateData.chaptername}</Breadcrumb.Item> */}
            </Breadcrumb>
          </div>
        </div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={dactive}
        >
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center pb-0 bg-white">
              <Nav
                variant="tabs get_ready_exam_shortNotes_navs"
                className="flex-row"
              >
                <Nav.Item>
                  <Nav.Link eventKey="first" onClick={() => this.eventKeyFun("first")}>
                    Short Notes - {this.revisionMaterialCount("short", this.state.getCustomContent)}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" onClick={() => this.eventKeyFun("second")}>
                    Revision Material -{" "}
                    {this.revisionMaterialCount("material", this.state.getCustomContent)}
                  </Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
                  <Nav.Link eventKey="third" onClick={() => this.eventKeyFun("third")}>
                    Videos -{" "}
                    {this.revisionMaterialCount("video", this.state.getCustomContent)}
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
              <Tab.Content className="header-filter">
                <Tab.Pane eventKey="second">
                  <Form style={{ width: 250 }}>
                    <Form.Group
                      className="mb-1"
                      as={Row}
                      controlId="SelectType"
                    >
                      <Form.Label column sm="4">
                        Types
                      </Form.Label>
                      <Col sm={8}>
                        <SelectDropDown
                          stateData={this.state.ctypeIdValue}
                          name="contenttype"
                          handleChange={this.handleSelectInputChange}
                          options={this.typesFunction()}
                          placeholderName={"Select type"}
                          dropdownIndicator={{ DropdownIndicator }}
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {funData.length > 5 ? (
                    <InfiniteScroll
                      dataLength={funData.length}
                      next={(e) => this.onScrollgetCustomContent(e, dactive)}
                      hasMore={this.state.hasMore}
                      loader={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                          <b>Loading...</b>
                        </p>}
                      endMessage={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {funData.map((item, index) => {

                        let topicname = "";
                        globalsubjects.map((sitem) => {
                          console.log("sub", sitem.id, item.subject);
                          if (sitem.id == item.subject) {

                            sitem.studentChapters.map((citem) => {
                              console.log("sub1", citem.id, item.chapter);
                              if (citem.id == item.chapter) {
                                citem.topics.map((titem) => {
                                  console.log("sub2", titem.id, item.topic);
                                  if (titem.id == item.topic) {
                                    topicname = titem.topic;
                                  }
                                })

                              }

                            })

                          }

                        })
                        return (<Card
                          className="single_card mb-1"
                          style={{ textDecoration: "none", color: "black" }}
                          as={Link}
                          to={{
                            pathname: "/student/subject/short-notes",
                            state: {
                              subjectid: this.props
                                .getChapterId.subjectid,
                              getChapterId: this.props.getChapterId,
                              funData: funData,
                              getData: funData[index],
                              index: index,
                              type: "short",
                              removecontypId: "1",
                              defaultActiveKey: "first",
                              page: this.state.page,
                            }
                          }}>
                          <Card.Header className="border-0 px-3 bg-light d-flex justify-content-between align-items-start">
                            <div className="header-title">
                              <Card.Title className="h6 mb-0">
                                {topicname}
                              </Card.Title>
                              <ul className="helpTags list-inline m-0 p-0">
                                <li className="list-inline-item">
                                  <i className="mr-2 fas fa-eye text-success"></i> My views :{item.your_views}
                                </li>
                                {/* <li className="list-inline-item">
                                  <i className="mr-2 fas fa-eye text-primary"></i>  Total Views :{item.total_views}
                                </li>
                                <li className="list-inline-item">
                                  <i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks :{item.bookmark_count}
                                </li>
                                <li className="list-inline-item">
                                  <i className="mr-2 fas fa-star text-primary"></i> Total Stared :{item.star_count}
                                </li> */}

                              </ul>

                            </div>
                            <div className="d-flex justify-content-between align-items-center">

                              <ul className="helpTags list-inline m-0 p-0">
                                {item.stared == true ? (
                                  <li className="list-inline-item">
                                    <i
                                      title="Un Star"
                                      className="fas fa-star text-warning"
                                      style={{cursor:"pointer"}}
                                    />
                                  </li>
                                ) : (
                                    <li className="list-inline-item">
                                      <i title="Star" 
                                      style={{cursor:"pointer"}}
                                      
                                      className="fal fa-star" />
                                    </li>
                                  )}
                                <li className="list-inline-item">
                                  <i className="fal fa-info-circle" 
                                  style={{cursor:"pointer"}}
                                  title="Report"/>
                                </li>
                                <li className="list-inline-item">
                                  <i className="fal fa-notes-medical" 
                                  style={{cursor:"pointer"}}
                                  title="Notes"/>
                                  {/* {item.notes.tags != "" || item.notes.comments != "" ? (<i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />) : ("")} */}
                                </li>
                                {item.bookmarked == true ? (
                                  <li className="list-inline-item">
                                    <i className="fas fa-bookmark text-success" 
                                    style={{cursor:"pointer"}}
                                    title="Un Bookmark"/>
                                  </li>
                                ) : (
                                    <li className="list-inline-item">
                                      <i className="fal fa-bookmark" 
                                      style={{cursor:"pointer"}}
                                      title="Bookmark"/>
                                    </li>
                                  )}
                                {/* <li className="list-inline-item"><i className="fal fa-star" /></li>
       
       <li className="list-inline-item">
         <i className="fal fa-bookmark" />
       </li> */}
                              </ul>
                            </div>
                          </Card.Header>
                          <Card.Body className="pt-1">
                            <Scrollbars
                              style={{ height: 150 }}
                              {...this.props}
                              renderThumbVertical={renderThumb}
                              autoHide
                              autoHideTimeout={500}
                              autoHideDuration={200}
                            >
                              <div className="text-right mb-3">
                                <Image
                                  width="30"
                                  src={this.contentImage("1")}
                                  alt="content-image" />
                              </div>
                              {/* <div className="text-right mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="32" viewBox="0 0 112 32"><g transform="translate(-312 -63)"><g fill="#fcfeff" stroke="#35a2f5" transform="translate(312 63)"><rect stroke="none" width="112" height="32" rx="4"></rect><rect fill="none" x="0.5" y="0.5" width="111" height="31" rx="3.5"></rect></g><text fill="#1592e6" transform="translate(351 85)"><tspan x="0" y="0">Formula</tspan></text><g fill="#fcfeff" stroke="#35a2f5" transform="translate(312 63)"><rect stroke="none" width="32" height="32" rx="4"></rect><rect fill="none" x="0.5" y="0.5" width="31" height="31" rx="3.5"></rect></g><g transform="translate(319.838 71)"><path fill="#35a2f5" d="M1348.208-1409.175v1.228c0,.079,0,.158,0,.236a.364.364,0,0,1-.339.337.347.347,0,0,1-.371-.317c-.016-.241-.01-.483-.01-.725s0-.491,0-.76c-.242,0-.465,0-.688,0a.367.367,0,0,1-.374-.255.356.356,0,0,1,.343-.465c.118,0,.236,0,.354,0h.365v-.236q0-6.627,0-13.254a1.8,1.8,0,0,1,.008-.236.347.347,0,0,1,.377-.307.35.35,0,0,1,.335.335c0,.05,0,.1,0,.152v13.546h12.851a.762.762,0,0,1,.232.023.361.361,0,0,1,.234.372.354.354,0,0,1-.3.315,1.645,1.645,0,0,1-.235.011h-12.778Z" transform="translate(-1346.409 1424.303)"></path><path fill="#35a2f5" d="M1392.381-1368.044a8.877,8.877,0,0,1-5.536-2.113,8.867,8.867,0,0,1-2.912-4.589,8.543,8.543,0,0,1-.295-2.262.351.351,0,0,1,.336-.386.349.349,0,0,1,.38.358c.051.507.071,1.02.157,1.521a7.8,7.8,0,0,0,1.587,3.539,8.128,8.128,0,0,0,4.864,3.035c.47.1.956.114,1.436.166.094.01.191.008.285.02a.344.344,0,0,1,.307.361.348.348,0,0,1-.321.35C1392.573-1368.038,1392.477-1368.044,1392.381-1368.044Z" transform="translate(-1380.757 1381.369)"></path><path fill="#35a2f5" d="M1501.251-1402.848c-.419-.631-.836-1.257-1.252-1.883a.674.674,0,0,1-.094-.177.35.35,0,0,1,.187-.424.351.351,0,0,1,.449.116c.166.233.321.475.48.712l.665.993c.048-.067.084-.114.117-.164.324-.486.645-.974.975-1.456a.6.6,0,0,1,.245-.215.315.315,0,0,1,.389.117.357.357,0,0,1,0,.439q-.517.779-1.036,1.556l-.254.383q.616.924,1.226,1.84a1.314,1.314,0,0,1,.1.172.362.362,0,0,1-.128.447.346.346,0,0,1-.447-.044,1.041,1.041,0,0,1-.124-.159q-.483-.72-.964-1.442c-.03-.045-.063-.089-.107-.152-.073.106-.135.2-.2.288-.308.462-.614.927-.925,1.387a.356.356,0,0,1-.468.147.352.352,0,0,1-.19-.423.824.824,0,0,1,.111-.206Q1500.631-1401.92,1501.251-1402.848Z" transform="translate(-1488.014 1407.181)"></path><path fill="#35a2f5" d="M1463.3-1426.585h1.252c.056,0,.113,0,.169,0a.362.362,0,0,1,.368.36.357.357,0,0,1-.374.37c-.4.006-.809,0-1.214,0h-.2v.209q0,1.627,0,3.253a1.291,1.291,0,0,1,0,.168.362.362,0,0,1-.371.32.362.362,0,0,1-.354-.321,1.434,1.434,0,0,1,0-.168q0-2.436,0-4.872a1.464,1.464,0,0,1,1.393-1.473c.488-.024.977-.012,1.466-.007a.361.361,0,0,1,.386.36.364.364,0,0,1-.392.371c-.449.006-.9,0-1.349,0a.712.712,0,0,0-.766.75C1463.3-1427.042,1463.3-1426.824,1463.3-1426.585Z" transform="translate(-1453.572 1428.75)"></path></g></g></svg>
    </div> */}
                              <Card.Text>{parse(this.decodefun(item.description))}</Card.Text>
                            </Scrollbars>
                          </Card.Body>
                        </Card>)
                      })}
                    </InfiniteScroll>
                  ) : (
                      <React.Fragment>
                        {funData.map((item, index) => {

                          let topicname = "";
                          globalsubjects.map((sitem) => {
                            console.log("sub", sitem.id, item.subject);
                            if (sitem.id == item.subject) {

                              sitem.studentChapters.map((citem) => {
                                console.log("sub1", citem.id, item.chapter);
                                if (citem.id == item.chapter) {
                                  citem.topics.map((titem) => {
                                    console.log("sub2", titem.id, item.topic);
                                    if (titem.id == item.topic) {
                                      topicname = titem.topic;
                                    }
                                  })

                                }

                              })

                            }

                          })
                          return (<Card
                            className="single_card mb-1"
                            style={{ textDecoration: "none", color: "black" }}
                            as={Link}
                            to={{
                              pathname: "/student/subject/short-notes",
                              state: {
                                subjectid: this.props
                                  .getChapterId.subjectid,
                                getChapterId: this.props.getChapterId,
                                funData: funData,
                                getData: funData[index],
                                index: index,
                                type: "short",
                                removecontypId: "1",
                                defaultActiveKey: "first",
                                page: this.state.page,

                              }
                            }}>
                            <Card.Header className="border-0 px-3 bg-light d-flex justify-content-between align-items-start">
                              <div className="header-title">
                                <Card.Title className="h6 mb-0">
                                  {topicname}
                                </Card.Title>
                                <ul className="helpTags list-inline m-0 p-0">
                                  <li className="list-inline-item">
                                    <i className="mr-2 fas fa-eye text-success"></i> My views :{item.your_views}
                                  </li>
                                  {/* <li className="list-inline-item">
                                    <i className="mr-2 fas fa-eye text-primary"></i>  Total Views :{item.total_views}
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks :{item.bookmark_count}
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mr-2 fas fa-star text-primary"></i> Total Stared :{item.star_count}
                                  </li> */}

                                </ul>

                              </div>
                              <div className="d-flex justify-content-between align-items-center">

                                <ul className="helpTags list-inline m-0 p-0">
                                  {item.stared == true ? (
                                    <li className="list-inline-item">
                                      <i
                                        title="Un Star"
                                        className="fas fa-star text-warning"
                                        style={{cursor:"pointer"}}
                                      />
                                    </li>
                                  ) : (
                                      <li className="list-inline-item">
                                        <i title="Star" className="fal fa-star" style={{cursor:"pointer"}}/>
                                      </li>
                                    )}
                                  <li className="list-inline-item">
                                    <i className="fal fa-info-circle" 
                                    style={{cursor:"pointer"}}
                                    title="Report"/>
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="fal fa-notes-medical" 
                                    style={{cursor:"pointer"}}
                                    title="Notes"/>
                                    {/* {item.notes.tags != "" || item.notes.comments != "" ? (<i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />) : ("")} */}
                                  </li>
                                  {item.bookmarked == true ? (
                                    <li className="list-inline-item">
                                      <i className="fas fa-bookmark text-success" 
                                       style={{cursor:"pointer"}}
                                       title="Un Bookmark"/>
                                    </li>
                                  ) : (
                                      <li className="list-inline-item">
                                        <i className="fal fa-bookmark" 
                                        style={{cursor:"pointer"}}
                                        title="Bookmark"/>
                                      </li>
                                    )}
                                  {/* <li className="list-inline-item"><i className="fal fa-star" /></li>
                           
                           <li className="list-inline-item">
                             <i className="fal fa-bookmark" />
                           </li> */}
                                </ul>
                              </div>
                            </Card.Header>
                            <Card.Body className="pt-1">
                              <Scrollbars
                                style={{ height: 150 }}
                                {...this.props}
                                renderThumbVertical={renderThumb}
                                autoHide
                                autoHideTimeout={500}
                                autoHideDuration={200}
                              >
                                <div className="text-right mb-3">
                                  <Image
                                    width="30"
                                    src={this.contentImage("1")}
                                    alt="content-image" />
                                </div>
                                {/* <div className="text-right mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="32" viewBox="0 0 112 32"><g transform="translate(-312 -63)"><g fill="#fcfeff" stroke="#35a2f5" transform="translate(312 63)"><rect stroke="none" width="112" height="32" rx="4"></rect><rect fill="none" x="0.5" y="0.5" width="111" height="31" rx="3.5"></rect></g><text fill="#1592e6" transform="translate(351 85)"><tspan x="0" y="0">Formula</tspan></text><g fill="#fcfeff" stroke="#35a2f5" transform="translate(312 63)"><rect stroke="none" width="32" height="32" rx="4"></rect><rect fill="none" x="0.5" y="0.5" width="31" height="31" rx="3.5"></rect></g><g transform="translate(319.838 71)"><path fill="#35a2f5" d="M1348.208-1409.175v1.228c0,.079,0,.158,0,.236a.364.364,0,0,1-.339.337.347.347,0,0,1-.371-.317c-.016-.241-.01-.483-.01-.725s0-.491,0-.76c-.242,0-.465,0-.688,0a.367.367,0,0,1-.374-.255.356.356,0,0,1,.343-.465c.118,0,.236,0,.354,0h.365v-.236q0-6.627,0-13.254a1.8,1.8,0,0,1,.008-.236.347.347,0,0,1,.377-.307.35.35,0,0,1,.335.335c0,.05,0,.1,0,.152v13.546h12.851a.762.762,0,0,1,.232.023.361.361,0,0,1,.234.372.354.354,0,0,1-.3.315,1.645,1.645,0,0,1-.235.011h-12.778Z" transform="translate(-1346.409 1424.303)"></path><path fill="#35a2f5" d="M1392.381-1368.044a8.877,8.877,0,0,1-5.536-2.113,8.867,8.867,0,0,1-2.912-4.589,8.543,8.543,0,0,1-.295-2.262.351.351,0,0,1,.336-.386.349.349,0,0,1,.38.358c.051.507.071,1.02.157,1.521a7.8,7.8,0,0,0,1.587,3.539,8.128,8.128,0,0,0,4.864,3.035c.47.1.956.114,1.436.166.094.01.191.008.285.02a.344.344,0,0,1,.307.361.348.348,0,0,1-.321.35C1392.573-1368.038,1392.477-1368.044,1392.381-1368.044Z" transform="translate(-1380.757 1381.369)"></path><path fill="#35a2f5" d="M1501.251-1402.848c-.419-.631-.836-1.257-1.252-1.883a.674.674,0,0,1-.094-.177.35.35,0,0,1,.187-.424.351.351,0,0,1,.449.116c.166.233.321.475.48.712l.665.993c.048-.067.084-.114.117-.164.324-.486.645-.974.975-1.456a.6.6,0,0,1,.245-.215.315.315,0,0,1,.389.117.357.357,0,0,1,0,.439q-.517.779-1.036,1.556l-.254.383q.616.924,1.226,1.84a1.314,1.314,0,0,1,.1.172.362.362,0,0,1-.128.447.346.346,0,0,1-.447-.044,1.041,1.041,0,0,1-.124-.159q-.483-.72-.964-1.442c-.03-.045-.063-.089-.107-.152-.073.106-.135.2-.2.288-.308.462-.614.927-.925,1.387a.356.356,0,0,1-.468.147.352.352,0,0,1-.19-.423.824.824,0,0,1,.111-.206Q1500.631-1401.92,1501.251-1402.848Z" transform="translate(-1488.014 1407.181)"></path><path fill="#35a2f5" d="M1463.3-1426.585h1.252c.056,0,.113,0,.169,0a.362.362,0,0,1,.368.36.357.357,0,0,1-.374.37c-.4.006-.809,0-1.214,0h-.2v.209q0,1.627,0,3.253a1.291,1.291,0,0,1,0,.168.362.362,0,0,1-.371.32.362.362,0,0,1-.354-.321,1.434,1.434,0,0,1,0-.168q0-2.436,0-4.872a1.464,1.464,0,0,1,1.393-1.473c.488-.024.977-.012,1.466-.007a.361.361,0,0,1,.386.36.364.364,0,0,1-.392.371c-.449.006-.9,0-1.349,0a.712.712,0,0,0-.766.75C1463.3-1427.042,1463.3-1426.824,1463.3-1426.585Z" transform="translate(-1453.572 1428.75)"></path></g></g></svg>
                        </div> */}
                                <Card.Text>{parse(this.decodefun(item.description))}</Card.Text>
                              </Scrollbars>
                            </Card.Body>
                          </Card>)
                        })}
                        {funData.length == 0 ? (<p style={{ textAlign: "center" }}>
                          <b>No data available </b>
                        </p>) : (<p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>)}
                      </React.Fragment>)}





                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {emptyMaterial.length > 2 ? (
                    <InfiniteScroll
                      dataLength={emptyMaterial.length}
                      next={(e) => this.onScrollgetCustomContent(e, dactive)}
                      hasMore={this.state.hasMore}
                      loader={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                          <b>Loading...</b>
                        </p>}
                      endMessage={
                        <p style={{ textAlign: "center", overflow: "hidden !important" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      <Row className="material_cards">
                        {emptyMaterial.map((subMData, index) => {
                          console.log("subMData1234", subMData.notes);
                          return (
                            <Col
                              xl={6}
                              lg={6}
                              md={12}
                              sm={12}
                              key={subMData.id}
                              className="single_material_list"
                            >
                              <Card
                                className="single_card"
                                style={{ textDecoration: 'none', color: "#000" }}
                                as={Link}
                                to={{
                                  pathname: "/student/subject/short-notes",
                                  state: {

                                    subjectid: this.props
                                      .getChapterId.subjectid,
                                    getChapterId: this.props.getChapterId,
                                    funData: emptyMaterial,
                                    getData: emptyMaterial[index],
                                    index: index,
                                    type: "revision",
                                    removecontypId: subMData.ctype,
                                    defaultActiveKey: "second",
                                    page: this.state.page,

                                  },
                                }}
                              >
                                <Card.Header className="border-0 py-2 bg-light d-flex justify-content-between align-items-center">
                                  <div className="header-title">
                                    <Card.Title className="h6 mb-0">
                                      {subMData.title}
                                    </Card.Title>
                                    <ul className="helpTags list-inline m-0 p-0">
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-eye text-success"></i> My views :{subMData.your_views}
                                      </li>
                                      {/* <li className="list-inline-item">
                                        <i className="mr-2 fas fa-eye text-primary"></i>  Total Views :{subMData.total_views}
                                      </li> */}

                                    </ul>
                                    {/* <ul className="helpTags list-inline m-0 p-0">
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks :{subMData.bookmark_count}
                                      </li>
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-star text-primary"></i> Total Stared :{subMData.star_count}
                                      </li>
                                    </ul> */}
                                  </div>
                                  <ul className="helpTags list-inline m-0 p-0">

                                    {subMData.stared == true ? (
                                      <li className="list-inline-item">
                                        <i
                                          title="Un Star"
                                          className="fas fa-star text-warning"
                                          style={{cursor:"pointer"}}

                                        />
                                      </li>
                                    ) : (
                                        <li className="list-inline-item">
                                          <i
                                            title="Star"
                                            className="fal fa-star"
                                            style={{cursor:"pointer"}}

                                          />
                                        </li>
                                      )}
                                    <li className="list-inline-item">

                                      <i
                                        className="fal fa-info-circle"
                                        title="Report"
                                        style={{cursor:"pointer"}}
                                      />

                                    </li>

                                    <li className="list-inline-item">
                                      <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}


                                      >
                                        <i className="fal fa-notes-medical"  
                                        title="Notes" style={{ color: '#00000082',cursor:"pointer" }} />
                                        {subMData.notes.tags != undefined || subMData.notes.comments != undefined ? (<i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />) : ("")}

                                      </Button>


                                    </li>
                                    {subMData.bookmarked == true ? (
                                      <li className="list-inline-item">
                                        <i
                                        style={{cursor:"pointer"}}
                                        title="Un Bookmark"
                                          className="fas fa-bookmark text-success"

                                        />
                                      </li>
                                    ) : (
                                        <li className="list-inline-item">
                                          <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}

                                          >
                                            <i  style={{cursor:"pointer"}}
                                        title="Bookmark" className="fal fa-bookmark" style={{ color: '#00000082' }} />
                                          </Button>
                                        </li>
                                      )}
                                  </ul>
                                </Card.Header>
                                <Card.Body>
                                  <Scrollbars
                                    style={{ height: 150 }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}
                                  >
                                    <div className="text-right mb-3">

                                      <Image
                                        width="30"
                                        src={this.contentImage(subMData.ctype)}
                                        alt="content-image" />

                                    </div>

                                    <Card.Text>
                                      {parse(this.decodefun(subMData.description))}
                                    </Card.Text>
                                  </Scrollbars>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        })}
                      </Row>
                    </InfiniteScroll>
                  ) : (
                    <React.Fragment>
                      <Row className="material_cards">
                        {emptyMaterial.map((subMData, index) => {
                          console.log("subMData1234", subMData.notes);
                          return (
                            <Col
                              xl={6}
                              lg={6}
                              md={12}
                              sm={12}
                              key={subMData.id}
                              className="single_material_list"
                            >
                              <Card
                                className="single_card"
                                style={{ textDecoration: 'none', color: "#000" }}
                                as={Link}
                                to={{
                                  pathname: "/student/subject/short-notes",
                                  state: {

                                    subjectid: this.props
                                      .getChapterId.subjectid,
                                    getChapterId: this.props.getChapterId,
                                    funData: emptyMaterial,
                                    getData: emptyMaterial[index],
                                    index: index,
                                    type: "revision",
                                    removecontypId: subMData.ctype,
                                    defaultActiveKey: "second",
                                    page: this.state.page,

                                  },
                                }}
                              >
                                <Card.Header className="border-0 py-2 bg-light d-flex justify-content-between align-items-center">
                                  <div className="header-title">
                                    <Card.Title className="h6 mb-0">
                                      {subMData.title}
                                    </Card.Title>
                                    <ul className="helpTags list-inline m-0 p-0">
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-eye text-success"></i> My views :{subMData.your_views}
                                      </li>
                                      {/* <li className="list-inline-item">
                                        <i className="mr-2 fas fa-eye text-primary"></i>  Total Views :{subMData.total_views}
                                      </li> */}

                                    </ul>
                                    {/* <ul className="helpTags list-inline m-0 p-0">
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-bookmark text-primary"></i>Total Bookmarks :{subMData.bookmark_count}
                                      </li>
                                      <li className="list-inline-item">
                                        <i className="mr-2 fas fa-star text-primary"></i> Total Stared :{subMData.star_count}
                                      </li>
                                    </ul> */}
                                  </div>
                                  <ul className="helpTags list-inline m-0 p-0">

                                    {subMData.stared == true ? (
                                      <li className="list-inline-item">
                                        <i
                                          style={{ cursor: "pointer" }}
                                          title="Un Star"
                                          className="fas fa-star text-warning"

                                        />
                                      </li>
                                    ) : (
                                        <li className="list-inline-item">
                                          <i
                                            style={{ cursor: "pointer" }}
                                            title="Star"
                                            className="fal fa-star"

                                          />
                                        </li>
                                      )}
                                    <li className="list-inline-item">

                                      <i
                                        className="fal fa-info-circle"
                                        title="Report"
                                      />

                                    </li>

                                    <li className="list-inline-item">
                                      <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}


                                      >
                                        <i className="fal fa-notes-medical" title="Notes" style={{ color: '#00000082',cursor:"pointer" }} />
                                        {subMData.notes.tags != undefined || subMData.notes.comments != undefined ? (<i className="fas fa-circle position-absolute text-danger" style={{ fontSize: 5, top: -5, right: 0 }} />) : ("")}

                                      </Button>


                                    </li>
                                    {subMData.bookmarked == true ? (
                                      <li className="list-inline-item">
                                        <i
                                          style={{ cursor: "pointer" }}
                                          title={"Un Bookmark"}
                                          className="fas fa-bookmark text-success"

                                        />
                                      </li>
                                    ) : (
                                        <li className="list-inline-item">
                                          <Button variant="link p-0 text-decoration-none position-relative" style={{ lineHeight: '21px' }}

                                          >
                                            <i className="fal fa-bookmark" style={{ cursor: "pointer" }}
                                              title={"Bookmark"} style={{ color: '#00000082' }} />
                                          </Button>
                                        </li>
                                      )}
                                  </ul>
                                </Card.Header>
                                <Card.Body>
                                  <Scrollbars
                                    style={{ height: 150 }}
                                    {...this.props}
                                    renderThumbVertical={renderThumb}
                                    autoHide
                                    autoHideTimeout={500}
                                    autoHideDuration={200}
                                  >
                                    <div className="text-right mb-3">

                                      <Image
                                        width="30"
                                        src={this.contentImage(subMData.ctype)}
                                        alt="content-image" />

                                    </div>

                                    <Card.Text>
                                      {parse(this.decodefun(subMData.description))}
                                    </Card.Text>
                                  </Scrollbars>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                        })}
                        
                      </Row>
                      {emptyMaterial.length == 0 ? (<p style={{ textAlign: "center" }}>
                      <b>No data available </b>
                    </p>) : (<p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>)}
                    </React.Fragment>
                    )}

                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <RevisionMaterialVideos

                    getChapterId={this.props.getChapterId}
                    defaultActiveKey="third"
                    ComponentParams={{
                      subject: "0",
                      chapter: this.props.getChapterId.ocid,
                      pagetype: pagetype
                    }}

                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>

      </div>
    );
  }
}
export default withApollo(compose(
)(RevisionMaterialSection));
