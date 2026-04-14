import React, { Component } from 'react'
import { Row, Col, Card,Image } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import './_blog.scss';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageSection from './ImageSection';
import parse, { domToReact } from "html-react-parser";
import moment from "moment";
import PreloaderTwo from '../preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
class BlogSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 6,
            page: 1,
            blogs: [],
            loader: 0,
            hasMore: true,
            nodata: false,
            firstLoading: false

        }
    }
    componentDidMount = () => {
        console.log("componentDidMount", this.state.page);
        axios.get(`https://rizee.in/blog/wp-json/wp/v2/posts?_fields=id,date,status,title,link,featured_media&per_page=${this.state.per_page}&page=${this.state.page}`)
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        blogs: response.data,
                        page: parseInt(this.state.page) + 1,
                        firstLoading: true
                    });
                }
                else {
                    this.setState({
                        blogs: [],
                        firstLoading: true
                    });
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    onScrollgetBlogs = async (e) => {
        if (this.state.blogs.length < 6) {
            this.setState({ hasMore: false });
        }
        else {

            if (this.state.nodata == false) {
                this.setState({
                    loader: 1
                });
                let page = parseInt(this.state.page) + 1;

                axios.get(`https://rizee.in/blog/wp-json/wp/v2/posts?_fields=id,date,status,title,link,featured_media&per_page=${this.state.per_page}&page=${this.state.page}`)
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data.length == 0) {
                                this.setState({
                                    hasMore: false,
                                    page: page,
                                    loader: 0,
                                    nodata: true
                                });
                            }
                            else {
                                if (response.data.length < 6) {
                                    this.setState({
                                        blogs: this.state.blogs.concat(response.data),
                                        hasMore: false,
                                        page: page,
                                        loader: 0,
                                        nodata: true
                                    });
                                }
                                else {
                                    this.setState({
                                        loader: 0,
                                        page: page,
                                        blogs: this.state.blogs.concat(response.data)
                                    });
                                }

                            }

                        }
                        else {
                            this.setState({
                                hasMore: false,
                                page: page,
                                loader: 0,
                                nodata: true
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            else {
                this.setState({
                    hasMore: false,
                    loader: 0

                });
            }

        }
    }



    render() {
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }

        const isuserValid = JSON.parse(isStudentUserValid.user_access_restictions);

        if (this.state.firstLoading == false) {
            return (<PreloaderTwo />);

        }
        if (isuserValid.blog_tab == true) {
            return (
                <div className="blog pt-4">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <Image src={require('../../../images/locked.png')} width="40" alt="locked image" />
                                {Cookies.get("student_userlevel") == "1" ? (<h5 className="text-danger">Dear Student Now you have limited access.</h5>) : (
                                    <React.Fragment>
                                        <h5 className="text-danger">Dear Student Now you have limited access. To Get Full Access subscribe now</h5>
                                        <Link style={{ color: '#007bff' }} to={"/student/package"}>upgrade to Paid Plan</Link></React.Fragment>

                                )}
                            </div>

                        </Col>
                    </Row>

                </div>
            );

        }
        else {
            return (
                <section className="blog">
                    <Row>
                        <Col xs={12}>
                            <h1 className="h4 mt-2 title">New Post</h1>
                        </Col>
                    </Row>

                    {this.state.blogs.length > 5 ? (
                        <InfiniteScroll
                            dataLength={this.state.blogs.length}
                            next={(e) => this.onScrollgetBlogs(e)}
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
                            <Row>
                                {
                                    this.state.blogs.map((item, index) => {

                                        return (
                                            <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                                                <Card as={Link}
                                                    to={{
                                                        pathname: "/student/student-blog/student-blog-view",
                                                        state: {
                                                            blogid: item.id
                                                        }
                                                    }}
                                                    className="single-blog border-0 h-100">
                                                    {/* moment.unix(idata.timestamp).format("YYYY/MM/DD") */}
                                                    <Card.Body className="p-1">
                                                        <ImageSection featured_media={item.featured_media} />
                                                        <Card.Title className="blog-title mb-4">{parse(item.title.rendered)}</Card.Title>
                                                        <div className="blog-time">Date: {moment(item.date.split("T")[0]).format("D-MMM-YYYY")}</div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>

                        </InfiniteScroll>
                    ) : (<Row>
                        {
                            this.state.blogs.map((item, index) => {

                                return (
                                    <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12} className="mb-3">
                                        <Card as={Link}
                                            to={{
                                                pathname: "/student/student-blog/student-blog-view",
                                                state: {
                                                    blogid: item.id
                                                }
                                            }} className="single-blog border-0 h-100">
                                            <Card.Body className="p-1">
                                                <ImageSection featured_media={item.featured_media} />
                                                <Card.Title className="blog-title mb-4">{parse(item.title.rendered)}</Card.Title>
                                                <div className="blog-time">Date: {moment(item.date.split("T")[0]).format("D-MMM-YYYY")}</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        {this.state.blogs.length == 0 ? (<p style={{ textAlign: "center" }}>
                            <b>No data available </b>
                        </p>) : (<p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>)}
                    </Row>)}
                </section>
            )
        }
    }
}

export default withRouter(BlogSection);
