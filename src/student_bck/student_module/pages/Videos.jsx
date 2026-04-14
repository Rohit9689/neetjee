import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import AsideNavbar from '../components/navbars/AsideNavbar'
import ScrollTopNavbar from '../components/navbars/ScrollTopNavbar'
import VideoSection from '../components/videos/VideoSection'
import PreloaderTwo from '../components/preloader/PreloaderTwo';
import * as Cookies from "es-cookie";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from 'react-router-dom';
class Videos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            headerBottomImg: {
                Img: require('../../images/exam.svg'),
                Title: "Videos",
                width: 200,
                helpImg: require('../../images/Ask_me_for_Help.gif')
            }
        }
    }
    render() {
        const getVideoCategories = this.props.getVideoCategories;
        const loading1 = getVideoCategories.loading;
        const error1 = getVideoCategories.error;
        
        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        return (
            <div className="student main-wrapper">
                <div className="student header-area videos-topnavbar">
                    <ScrollTopNavbar headerBottom={this.state.headerBottomImg} onClick={() => this.props.changeToggle()} />
                </div>
                {(loading1 == true) && (<PreloaderTwo />)}
                <AsideNavbar />
                <div className="content-wrapper">
                    <Container>
                        {
                            !loading1 && (
                                <VideoSection getVideoCategories={getVideoCategories.getVideoCategories}/>)
                        }

                    </Container>
                </div>
            </div>
        )
    }
}


export default withRouter(compose(

    graphql(gql`
    query($params: VideosInput) {
      getVideoCategories(
        params: $params
      ) {
          id
          category
          
        }
    }
  `, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: Cookies.get("mobile"),
                    exam: parseInt(Cookies.get("examid")),
                    class1: 0,
                    subject: 0,
                    chapter: "",
                    topic: "",
                    institute_id: 0,
                    page: 0,
                    latest: 0,
                    recently_watched: 0
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getVideoCategories",
    }))(Videos));