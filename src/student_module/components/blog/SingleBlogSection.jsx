import React, { Component } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import parse, { domToReact } from "html-react-parser";
import ImageSectionTwo from './ImageSectionTwo';
import axios from "axios";
import moment from "moment";
class SingleBlogSection extends Component {
    constructor(props) {
        super(props)
        console.log("SingleBlogSection", props.singleBlog);
        this.state = {
            singleBlog: props.singleBlog

        }

    }
    newPostFun = () => {

        axios.get(`https://rizee.in/blog/wp-json/wp/v2/posts/${this.state.singleBlog.nextpost}?_fields=id,date,status,title,link,featured_media,content,prevpost,nextpost`)
            .then(response => {
                console.log("SingleBlogSection", response);
                if (response.status == 200) {
                    this.setState({
                        singleBlog: response.data
                    });
                }
                else {
                    this.setState({
                        singleBlog: ""
                    });
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    oldPostFun = () => {

        axios.get(`https://rizee.in/blog/wp-json/wp/v2/posts/${this.state.singleBlog.prevpost}?_fields=id,date,status,title,link,featured_media,content,prevpost,nextpost`)
            .then(response => {
                console.log("SingleBlogSection", response);
                if (response.status == 200) {
                    this.setState({
                        singleBlog: response.data
                    });
                }
                else {
                    this.setState({
                        singleBlog: ""
                    });
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        console.log("locationData", "stateDta", this.state.singleBlog);

        return (
            <section className="blog">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h1 className="h4 mt-2 title">Blog Post</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8} md={12}>
                            <Card className="single-blog border-0">
                                <Card.Header className="bg-white border-0 p-2 mb-0">
                                    <ImageSectionTwo featured_media={this.state.singleBlog.featured_media} />
                                </Card.Header>
                                <Card.Body className="content">
                                    <div className="post-time mb-2">{moment(this.state.singleBlog.date.split("T")[0]).format("MMMM D, YYYY")} By ELAPP</div>
                                    <h1 className="h4">{this.state.singleBlog != "" ? (parse(this.state.singleBlog.title.rendered)) : ("")}</h1>
                                    <p>{this.state.singleBlog != "" ? (parse(this.state.singleBlog.content.rendered)) : ("")}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8} md={12}>
                            <Card as={Card.Body} className="pagination-block mt-3 border-0 py-3">
                                <div className="pagination justify-content-between align-items-center">
                                    <Button variant="link" className="p-0 prev text-decoration-none text-dark" onClick={() => this.oldPostFun()}><i className="fas fa-chevron-left mr-2"></i> Old Post</Button>
                                    <Button variant="link" className="p-0 next text-decoration-none text-dark" onClick={() => this.newPostFun()}>New Post <i className="fas fa-chevron-right ml-2"></i></Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        )


    }
}

export default SingleBlogSection
