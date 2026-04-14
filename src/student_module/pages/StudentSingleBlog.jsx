import React, { Component } from 'react'
import Navbars from '../components/navbars/Navbars'
import AsideNavbar from '../components/navbars/AsideNavbar'
import SingleBlogSection from '../components/blog/SingleBlogSection'
import axios from "axios";
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

class StudentSingleBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleBlog: ""


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
    componentDidMount = () => {
        const title = GoogleAnalyticsArray[0].Blog_View;
        ReactGA.pageview('/student/student-blog/student-blog-view', ["ELAPP"], title);

        axios.get(`https://rizee.in/blog/wp-json/wp/v2/posts/${this.props.history.location.state.blogid}?_fields=id,date,status,title,link,featured_media,content,prevpost,nextpost`)
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
        return (
            <div className={Cookies.get("toggle")}>
                <div className="header-area">
                    <Navbars onClick={() => this.menuToggler()} />
                </div>
                <div className="main-wrapper">
                    {this.state.singleBlog == "" ? (<PreloaderTwo />) : ("")}
                    <AsideNavbar onClick={() => this.menuToggler()} />
                    <div className="student-overlay" onClick={() => this.menuToggler()} />
                    <div className="content-wrapper pt-0">
                        {this.state.singleBlog != "" ? (
                            <SingleBlogSection singleBlog={this.state.singleBlog} />
                        ) : ("")}

                    </div>
                </div>
            </div>
        )

    }
}

export default StudentSingleBlog
