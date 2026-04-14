import React, { Component } from 'react'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import TextEditor from '../../../../neetjee_guru/components/text_editor/TextEditor';
import Select from 'react-select';
import parse, { domToReact } from "html-react-parser";
import { MultiSelect } from "react-multi-select-component";

class SingleNoteModal extends Component {
    constructor(props) {
        super(props)
       this.state = {
            show: "",
            submitError2: "",
            ntags: "",
            ntagsvalue: "",
            nnewtag: "",
            ncomments: props.stateData.ncomments,
            formErrors: {
              ntags: "",
              nnewtag: "",
              ncomments: ""
            },
            
            formValid2: false,
            ntagsValid: false,
            nnewtagValid: false,
            ncommentsValid: false,
            getDerived:1,
          };

    }
    static getDerivedStateFromProps(nextProps, prevState){
        console.log("nextProps, prevState",nextProps,nextProps.stateData.getDerived,prevState.getDerived,nextProps.stateData.modalShow);
        if(nextProps.stateData.getDerived!=prevState.getDerived && nextProps.stateData.modalShow==true){
            console.log("1234567");
            let ntags=nextProps.stateData.ntags;
            let ntagsvalue=nextProps.stateData.ntagsvalue;
            let ncomments=nextProps.stateData.ncomments;
            let ntagsValid=nextProps.stateData.ntagsValid;
            let ncommentsValid=nextProps.stateData.ncommentsValid;
            let formValid2=nextProps.stateData.formValid2;
            let show=nextProps.stateData.show;

           // console.log("nextncomments",ncomments);
            return{
                show: show,
                submitError2: "",
                ntags: ntags,
                ntagsvalue: ntagsvalue,
                nnewtag: "",
                ncomments: ncomments,
                formErrors: {
                  ntags: "",
                  nnewtag: "",
                  ncomments: ""
                },
                formValid2: formValid2,
                ntagsValid: ntagsValid,
                nnewtagValid: false,
                ncommentsValid: ncommentsValid,
                getDerived:nextProps.stateData.getDerived
              }
          //return { someState: nextProps.someValue};
       }
       else return null;
     }
    //componentDidUpdate=(prevProps)=>{
      
        // if (prevProps.stateData.empid != this.props.stateData.empid) {
        //     let ntags=this.props.stateData.ntags;
        //     let ntagsvalue=this.props.stateData.ntagsvalue;
        //     let ncomments=this.props.stateData.ncomments;
        //     let ntagsValid=this.props.stateData.ntagsValid;
        //     let ncommentsValid=this.props.stateData.ncommentsValid;
        //     let formValid2=this.props.stateData.formValid2;
        //     let show=this.props.stateData.show;
        //    this.setState({
        //         show: show,
        //         submitError2: "",
        //         ntags: ntags,
        //         ntagsvalue: ntagsvalue,
        //         nnewtag: "",
        //         ncomments: ncomments,
        //         formErrors: {
        //           ntags: "",
        //           nnewtag: "",
        //           ncomments: ""
        //         },
        //         formValid2: formValid2,
        //         ntagsValid: ntagsValid,
        //         nnewtagValid: false,
        //         ncommentsValid: ncommentsValid
        //       });
        // }
        
    //}
    showFunction = () => {
        console.log("showFunction", this.state.show);
        if (this.state.show == true) {
          this.setState({ show: false });
        }
        else {
          this.setState({ show: true });
        }
    }

    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    //add note
  noteshandleFormSubmit = (contype, conid) => {
   
    //e.preventDefault();
    if (this.state.formValid2) {
        console.log("childnoteshandleFormSubmit", contype, conid);
        //this.setState({getDerived:"2"});
        this.props.noteshandleFormSubmit(this.state.ntags,this.state.nnewtag,this.state.ncomments,contype, conid,this.state.getDerived);
    } else {
      this.setState({ submitError2: "Please fill all the values to proceed" });
    }
  };
  

  validateField(fieldName, value) {
    console.log("fieldName", fieldName, value);
    let fieldValidationErrors = this.state.formErrors;
    let ntagsValid = this.state.ntagsValid;
    let nnewtagValid = this.state.nnewtagValid;
    let ncommentsValid = this.state.ncommentsValid;
    
    switch (fieldName) {

      case "ntags":
        if (value.length == "") {
          ntagsValid = false;
          fieldValidationErrors.ntags = "Bookmark new tag Cannot Be Empty";
        } else {
          ntagsValid = true;
          fieldValidationErrors.ntags = "";
        }

        break;

      case "nnewtag":
        if (value.length == "") {
          nnewtagValid = false;
          fieldValidationErrors.nnewtag = "Bookmark new tag Cannot Be Empty";
        } else {
          nnewtagValid = true;
          fieldValidationErrors.nnewtag = "";
        }

        break;

      case "ncomments":
        if (value.length == "") {
          ncommentsValid = false;
          fieldValidationErrors.ncomments = "note comments Cannot Be Empty";
        } else {
          ncommentsValid = true;
          fieldValidationErrors.ncomments = "";
        }

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        ntagsValid: ntagsValid,
        nnewtagValid: nnewtagValid,
        ncommentsValid: ncommentsValid,
      },
      this.validateForm
    );
  }
  validateForm() {
      console.log("validateForm",this.state);
    this.setState({
      formValid2:
        (this.state.ntagsValid || this.state.nnewtagValid) &&
        this.state.ncommentsValid,
     });
    if (this.state.formValid2) {
      this.setState({ submitError2: "" });
    }
    
  }
  handleInputChange = (e) => {
    //console.log("handleInputChange", e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  handleEditorChange = (e) => {
   
    if(e.target.getContent()!=""){
      console.log("handleEditorChange", e.target.getContent());
      this.setState({
        ncomments: e.target.getContent()
      }, () => {
        this.validateField("ncomments", "1");
      });
    }
    else{
      console.log("handleEditorChange123", e.target.getContent());
      this.validateField("ncomments", "");
    }
    

  }
  handleMutipleInputChange = (e, name) => {
    if (name == "ntags") {
      let ntags = Array();
      let ntagsvalue = Array();
      if (e.length != 0) {
        for (let i = 0; i < e.length; i++) {
          const ntagsval = e[i];
          const newObj = {
            label: ntagsval.label,
            value: ntagsval.value
          }
          ntagsvalue.push(newObj);
          ntags.push(ntagsval.value);
        }
        this.setState({
          ntagsvalue: ntagsvalue,
          ntags: ntags.toString()
        }, () => {
          this.validateField(name, "1");
        });
      }
      else {
        this.setState({
          ntagsvalue: [],
          ntags: ""
        }, () => {
          this.validateField(name, "");
        });

      }
    }

  };
  Cancel=()=>{
    this.setState({
      //getDerived:this.props.getDerived
    },()=>{this.props.onHide(this.state.getDerived)});
    
  }
    render() {
        console.log("SingleNoteModal123", this.state);
        //start get test data
        let testnewArray = [];
        this.props.studentGlobals.tags.map((item) => {
            if (item != undefined) {
                if (item.type == "notes") {
                    const obj = {
                        value: item.id,
                        label: item.tag,
                    };
                    testnewArray.push(obj);
                }

            }

        })
        let testselectall = true;
        let testlabelledBy = "Select";
        let testdisableSearch = false;
        if (testnewArray.length > 0) {
            testselectall = true;
            testdisableSearch = false;
        }
        else {
            testdisableSearch = true;
            testselectall = false;
            testlabelledBy = "No Options"
        }
        //end get test data
        return (
            <Modal {...this.props}
                size="lg" aria-labelledby="example-modal-sizes-title-lg" data-keyboard="false">
                 <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-lg">Notes</Modal.Title>
                        <div onClick={() => { this.Cancel() }} size="sm" variant="text-decoration-none text-dark link" style={{cursor: "pointer"}} className="py-2">
                            <i className="far fa-times" />
                        </div>
                    </Modal.Header>


                <Modal.Body className="p-4" style={{ overflow: "auto" }}>
                    <Form>
                        {this.props.stateData.currentStep == 5 ? (
                            <Form.Text className="form-text text-danger">
                                Note saved successfully
                            </Form.Text>
                        ) : (
                                <Form.Text className="form-text text-danger">
                                    {this.props.stateData.submitError2}
                                    {this.state.submitError2}
                                </Form.Text>
                            )}
                        <Form.Row>

                            <Form.Group as={Col}
                                lg={5}
                                md={12}
                                sm={12} controlId="SelectTag">
                                <MultiSelect
                                    overrideStrings={{
                                        "allItemsAreSelected": "All Tags are selected.",
                                        "selectSomeItems": testlabelledBy
                                    }
                                    }
                                    disableSearch={testdisableSearch}
                                    hasSelectAll={testselectall}
                                    options={testnewArray}
                                    value={this.state.ntagsvalue}
                                    onChange={(e) => this.handleMutipleInputChange(e, "ntags")}
                                    labelledBy={"Select"}
                                />
                            </Form.Group>
                            <Col
                                lg={1}
                                md={12}
                                sm={12} className="mb-2 text-center">
                                <span>or</span>
                            </Col>
                            <Form.Group as={Col}
                                lg={6}
                                md={12}
                                sm={12} controlId="NewTag2">
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Enter New Tag"
                                    name="nnewtag"
                                    value={this.state.newtag}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}
                                lg={12}
                                md={12}
                                sm={12} controlId="CommentsTextarea2">
                                {this.props.modaltype == "notes" ? (
                                    <div className="editor-block">
                                        <TextEditor
                                            content={this.state.ncomments}
                                            type="studentnote"
                                            handleEditorChange={this.handleEditorChange} />
                                    </div>
                                ) : (<React.Fragment>
                                    {this.props.stateData.ncomments == "" ? (
                                        <div className="editor-block">
                                            <TextEditor
                                                content={this.state.ncomments}
                                                type="studentnote"
                                                handleEditorChange={this.handleEditorChange} />
                                        </div>) : (
                                            <React.Fragment>
                                                {this.state.show == true ? (
                                                    <React.Fragment>
                                                        <Form.Label className="font-weight-bold">Edit <Button variant="link text-decoration-none" onClick={(e) => this.showFunction()}><i className="fal fa-edit" /></Button></Form.Label>
                                                        <div className="cotent-block">
                                                            <p>{parse(
                                                                this.decodefun(
                                                                    this.state.ncomments
                                                                )
                                                            )}</p>
                                                        </div></React.Fragment>) : (<div className="editor-block">
                                                          <TextEditor
                                                            content={this.state.ncomments}
                                                            type="studentnote"
                                                            handleEditorChange={this.handleEditorChange} /></div>)}

                                            </React.Fragment>

                                        )}
                                </React.Fragment>)}

                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer variant="white" className="px-4 py-0 d-block">
                    <Row className="text-center">
                        <Col xl={6} lg={6} md={6} sm={6} xs={6} className="border-right">

                        <Button
                        onClick={() => { this.Cancel() }}

                        //onClick={() => { this.props.onHide() }}
                        size="sm" variant="text-decoration-none text-dark link" className="py-2">
                        Cancel
                        </Button>

                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                            <Button
                                onClick={(e) => this.noteshandleFormSubmit(this.props.removecontypId, this.props.custonid)}
                                size="sm" variant="text-decoration-none text-dark link" className="py-2">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default (SingleNoteModal);
