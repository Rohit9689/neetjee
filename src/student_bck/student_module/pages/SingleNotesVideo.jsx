import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import VideoNavbar from '../components/notes/notes_videos/notes_singlevideo/VideoNavbar'
import '../components/bookmarks/bookmark_videos/bookmark_singlevideo/_singlevideo.scss'
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";

const UPDATE_NOTES = gql`
  mutation(
    $params:UpdateNotes  
    ) {
        updateStudentNotes(
        params: $params
     )
  }
`;

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        width: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class SingleNotesVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.history.location.state.title,
            id: props.history.location.state.id,
            comments: props.history.location.state.comments,
            sidetoggle: false,
            showDescription: false,
            tags: props.history.location.state.tags,
            submitError: "",
            formValid: false
        }
    }
    handleFormSubmit = e => {
        e.preventDefault();
        if (this.state.formValid) {
            let updatenotesobj = {
                mobile: Cookies.get("mobile"),
                comments: this.state.comments,
                content_type: 5,
                custom_content_id: parseInt(this.state.id)
            };
            console.log("updatenotesobj", updatenotesobj);

            this.updatenotes(
                updatenotesobj
            ).catch(error => {

                console.log("catch if error", error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    updatenotes = async (
        params) => {
        await this.props.updatenotes({
            variables: {
                params
            },
            update: (store, { data }) => {
                if (data.updateStudentNotes) {
                    this.setState({
                        currentStep: 5,

                    });

                    setTimeout(() => { this.SetpageLoad1() }, 1500);
                }
            }
        });
    };
    SetpageLoad1 = () => {

        this.setState({ currentStep: 1, showDescription: false });
    }
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ comments: value }, () => {
            this.validateForm();
        });
    };
    validateForm() {
        this.setState({
            formValid: true
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }

    tagsfunction = (data) => {
        let Arr = data.split(',');
        let sample = [];
        for (let i = 0; i <= Arr.length; i++) {
            let idata = Arr[i];
            if (idata != "") {
                let getData = this.props.history.location.state.studentGlobals.tags.find((a) => a.id == idata);
                if (getData != undefined) {
                    sample.push(getData.tag);
                }

            }
        }
        return sample.toString();
    }

    render() {

        return (
            <section className="single_video">
                <VideoNavbar />
                <div className="single_video_section pb-5">
                    <Container>
                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={12} md={12} sm={12} xs={12}>
                                <div className="embed-responsive embed-responsive-16by9 my-3">
                                    <iframe className="embed-responsive-item" src={`https://player.vimeo.com/video/${this.props.history.location.state.videolink}`} title='video' allowFullScreen></iframe>
                                </div>
                                <div className="content text-white">
                                    <div className="header border-bottom pb-2 mb-3 ">
                                        <h5 className="title">{this.state.title}</h5>
                                        <h6>Physics - Physical World</h6>
                                    </div>
                                </div>
                                <Row className="mt-4">
                                    <Col xl={12} lg={12} md={12} sm={12}><h5 className="mb-3 text-white">Notes</h5></Col>
                                    <Col xl={6} lg={6} md={6} sm={12}>
                                        <Card as={Card.Body} onClick={() => this.setState({ sidetoggle: true })}>
                                            <h6 className="mb-0">{this.state.comments}</h6>
                                        </Card>
                                    </Col>
                                    {/* <Col xl={6} lg={6} md={6} sm={12}>
                                        <Card as={Card.Body}>
                                            <h6 className="mb-0">Imp Notes</h6>
                                        </Card>
                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                        <div className={`asideNavBar ${this.state.sidetoggle === true ? 'active' : ''}`}>
                            <div className="overlay" onClick={() => this.setState({ sidetoggle: false })}></div>
                            <Card className="aside-content rounded-left">
                                <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                                    <Card.Title onClick={() => this.setState({ sidetoggle: false })} className="mb-0"><i className="fal fa-arrow-left" /></Card.Title>
                                    <Card.Title className="mb-0">
                                        {
                                            this.state.showDescription ?
                                                (
                                                    <i className="fal fa-save" onClick={this.handleFormSubmit} />
                                                )
                                                :
                                                (
                                                    <i className="fal fa-edit" onClick={() => this.setState({ showDescription: !this.state.showDescription })} />
                                                )
                                        }
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Scrollbars style={{ height: '100vh', maxHeight: '100%' }}
                                        {...this.props}
                                        renderThumbVertical={renderThumb}
                                        autoHide
                                        autoHideTimeout={500}
                                        autoHideDuration={200}>
                                        {this.state.currentStep == 5 ? (
                                            <Form.Text className="form-text text-danger">
                                                Saved successfully
                                                </Form.Text>
                                        ) : (

                                                <Form.Text className="form-text text-danger">
                                                    {this.state.submitError}
                                                </Form.Text>
                                            )}
                                        <Row>
                                            {
                                                this.state.showDescription ?
                                                    (
                                                        <Col xl={12} lg={12} md={12} sm={12}>
                                                            <Card className="p-3 mb-3">
                                                                <h6 className="mb-0">{this.tagsfunction(this.state.tags)}</h6>
                                                            </Card>
                                                            <Card>
                                                                <Card.Body>
                                                                    <Form.Control as="textarea" rows="10"
                                                                        name="comments"
                                                                        value={this.state.comments}
                                                                        onChange={this.handleInputChange} />
                                                                </Card.Body>
                                                                {/* <Card.Footer className="bg-white">
                                                                    <Button variant="outline-primary">Save</Button>
                                                                </Card.Footer> */}
                                                            </Card>
                                                        </Col>
                                                    )

                                                    :

                                                    (
                                                        <Col xl={12} lg={12} md={12} sm={12}>
                                                            <p>{this.state.comments}</p>
                                                        </Col>
                                                    )
                                            }
                                        </Row>
                                    </Scrollbars>
                                </Card.Body>
                            </Card>
                        </div>
                    </Container>
                </div>
            </section>
        )
    }
}


export default withRouter(compose(
    graphql(UPDATE_NOTES, {
        name: "updatenotes"
    }))(SingleNotesVideo));
