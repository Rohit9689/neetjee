import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Image,
} from "react-bootstrap";
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import parse, { domToReact } from "html-react-parser";
import Notification from "../navbars/Notification";
import "../navbars/_navbars.scss";

class AssesmentInstructions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }
  render() {
     
        
     let instructions = this.props.examInstructions
       
    return (
      <div className="Instructions">
        
        <div className="bg-success py-3">
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
          >
            <div className="my-2 my-md-0 text-center">
              <h6 className="title mb-0 mr-4 text-white">
                {this.props.type == "exam" ? "Exam" : "Practice"} Instructions
              </h6>
            </div>
            <div>&nbsp;</div>
          </Container>
        </div>
        <div className="content-box pt-2" style={{ paddingBottom: "4rem" }}>
          <Container>
            <Row>
              <Col
                xl={{ span: 10, offset: 1 }}
                lg={{ span: 10, offset: 1 }}
                md={{ span: 10, offset: 1 }}
                sm={12}
              >
                <h6 className="mb-2">
                  <u>Please read the following instructions carefully.</u>
                </h6>
                {instructions != undefined ? (parse(instructions.instructions)) : ("")}
                {/* {this.state.examtype == "NEET"
                  ? parse(
                      '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <title>Hello, world!</title>\n <style type="text/css">p{margin:10px auto;}</style> </head>\n  <body style="font-size:20px">\n<p dir="ltr" style="text-align: justify;"><strong>For MCQs -</strong> 4 Marks will be awarded for every correct answer and 1 Mark will be deducted for every incorrect answer</p>\n<p dir="ltr" style="text-align: justify;"><strong>For answer with numeric value - </strong>4 Marks will be awarded for every correct answer and 0 Mark will be deducted for every incorrect answer</p>\n<p dir="ltr" style="text-align: justify;"><strong>Numerical / Integer type Questions</strong> does not have negative marking</p>\n<p dir="ltr" style="text-align: justify;">20 - MCQs and 5 Numerical type questions in each subject</p>\n</body>\n</html>\n<p><strong>Do&#39;s and Don&#39;ts</strong></p>\n<p><strong>While taking the test</strong></p>\n<p><strong>&middot;</strong>&nbsp; Make sure you being the test with a plan. Start with your strongest section</p>\n<p><strong>&middot;</strong> Go through the entire paper and attempt the questions you know first.</p>\n<p><strong>&middot;</strong>&nbsp; Make sure you save at least 20-30 mins in the end to revisit your answers in an online test, you can change your answer at any time.</p>\n<p><strong>Don&#39;ts</strong></p>\n<p><strong>General Guidelines</strong></p>\n<p><strong>&middot;</strong> Don&#39;t change the date and time of the device in between the test otherwise ,it will get auto submitted.</p>\n<p><strong>&middot;</strong> Don&#39;t switch to web or app for the same test once you started in the current app.</p>\n<p><strong>&middot;</strong> Don&#39;t submit the test before time. Try to use the entire duration of the test wisely.</p>\n<p>&nbsp;</p>'
                    )
                  : parse(
                      '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <title>Hello, world!</title>\n <style type="text/css">p{margin:10px auto;}</style> </head>\n  <body style="font-size:20px">\n<p dir="ltr" style="text-align: justify;"><strong>For MCQs -</strong> 4 Marks will be awarded for every correct answer and 1 Mark will be deducted for every incorrect answer</p>\n<p dir="ltr" style="text-align: justify;"><strong>For answer with numeric value - </strong>4 Marks will be awarded for every correct answer and 0 Mark will be deducted for every incorrect answer</p>\n<p dir="ltr" style="text-align: justify;"><strong>Numerical / Integer type Questions</strong> does not have negative marking</p>\n<p dir="ltr" style="text-align: justify;">20 - MCQs and 5 Numerical type questions in each subject</p>\n</body>\n</html>\n<p><strong>Do&#39;s and Don&#39;ts</strong></p>\n<p><strong>While taking the test</strong></p>\n<p><strong>&middot;</strong>&nbsp; Make sure you being the test with a plan. Start with your strongest section</p>\n<p><strong>&middot;</strong> Go through the entire paper and attempt the questions you know first.</p>\n<p><strong>&middot;</strong>&nbsp; Make sure you save at least 20-30 mins in the end to revisit your answers in an online test, you can change your answer at any time.</p>\n<p><strong>Don&#39;ts</strong></p>\n<p><strong>General Guidelines</strong></p>\n<p><strong>&middot;</strong> Don&#39;t change the date and time of the device in between the test otherwise ,it will get auto submitted.</p>\n<p><strong>&middot;</strong> Don&#39;t switch to web or app for the same test once you started in the current app.</p>\n<p><strong>&middot;</strong> Don&#39;t submit the test before time. Try to use the entire duration of the test wisely.</p>\n<p>&nbsp;</p>'
                    )} */}
              </Col>
            </Row>
          </Container>
        </div>
        <div className="bg-white shadow-sm fixed-bottom">
          <Container>
            <Row>
              <Col xl={12} lg={12} md={12} className="py-3 text-right">
                <a
                  onClick={this.props.startPracticeFun}
                  className="btn btn-outline-primary px-5"
                >
                  {this.props.type == "exam" ? "Start Exam" : "Start Practice"}
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(AssesmentInstructions);
