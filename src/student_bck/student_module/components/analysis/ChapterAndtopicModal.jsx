import React, { Component } from 'react'
import { Modal, Form, Button, Badge } from 'react-bootstrap'
import { Link,withRouter } from 'react-router-dom';
import UserRestrictionAlert from "../home/UserRestrictionAlert";
class ChapterAndtopicModal extends Component {
    constructor(props){
        super(props)
        this.state={
            userRestionModalShow: false
        }
    }
    learningFun = (id, subject_id, enabled) => {
        if (enabled == true) {
          if (this.props.isuserValid.lp_custom_content == false) {
            this.setState({
              userRestionModalShow: false
            });
            this.props.history.push({
              pathname: "/student/subject/start-learning",
              state: {
                subjectid: subject_id,
                ocid: id,
                otid: "0"
              }
            }
            );
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
    startPractise = (id, subject_id, enabled) => {
        // localStorage.setItem("subjectid", subject_id);
        // localStorage.setItem("type", "practise");
        // localStorage.setItem("ocid", id);
        // localStorage.setItem("otid", "0");
        // window.open("/student/subject/practice-test", "_blank")
        if (enabled == true) {
            if (this.props.isuserValid.lp_practice_exam == false) {
                this.setState({
                    userRestionModalShow: false
                });
                localStorage.setItem("subjectid", subject_id);
                localStorage.setItem("type", "practice");
                localStorage.setItem("ocid", id);
                localStorage.setItem("otid", "0");
                window.open("/student/subject/practice-test", "_blank") //to open new page
                window.location.reload(false);
            } else {
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
        let globalsubjects = "";
        if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
            globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
        }
        else {
            this.props.history.push("/student/login");
        }
        
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">{this.props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4" style={{ height: 522, overflowY: 'auto' }}>

                    <ul className="list-unstyled m-0 p-0">
                        {this.props.data.map((item) => {
                            const filglobalsubjects = globalsubjects.find((a) => a.id == this.props.lastdata.id)
                            const chData = filglobalsubjects.studentChapters.find((a) => a.id == item.id);
                            console.log("cmodal",chData);
                            if(chData!=undefined){
                            return (
                                <li className="mb-3">
                                    <div className="d-flex">
                                        <div className="chapter text-primary">Chapter:</div>
                                        <div className="ml-2 chapter-text">
                                            <div>{item.chapter}</div>
                                            {this.props.name != "Chapters And Topics Data" ? (
                                                <React.Fragment>
                                                    <a
                                                        onClick={() => this.learningFun(item.id,this.props.lastdata.id,chData.enabled)}
                                                        className="mx-1"><Badge variant="warning">Learn Now</Badge></a>
                                                    <Link
                                                        onClick={() => this.startPractise(item.id,this.props.lastdata.id,chData.enabled)}
                                                        
                                                        className="mx-1"><Badge variant="success">Practice Now</Badge></Link>
                                                </React.Fragment>) : ("")}

                                        </div>
                                    </div>
                                </li>

                            )
                        }
                        }
                        )}
                    </ul>
                    {/* <h5 className="text-danger">Chapters Data</h5> */}
                </Modal.Body>
                <UserRestrictionAlert
                    show={this.state.userRestionModalShow}
                    onHide={() => this.setState({ userRestionModalShow: false })}
                />
            </Modal >
        )
    }
}

export default withRouter(ChapterAndtopicModal)
