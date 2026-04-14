import React, { Component } from 'react'
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import WatchingVideoSection from '../videos/WatchingVideoSection';


const FETCH_VIDEOS = gql`
  query($params: VideosInput) {
    getVideos(
      params: $params
    ) {
      videoDetails{
        totalVideos
        videosList{
          id
          paid_video
          title
          subject
          class
          chapter
          description
          video_url
          vimeo_url
          subjectName
          ChapterName
          topicName
          likes
          dislikes
          views
          is_purchased
          thumbnail
          video_id
          created_timestamp
          pdf_file
        }
      }
      }
  }
`;
class RevisionMaterialVideos extends Component {
  render() {
    

    const getVideos = this.props.getVideos;
    const loading1 = getVideos.loading;
    const error1 = getVideos.error;
    if (loading1) return <PreloaderTwo />;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }
    let globalsubjects = "";
    if (JSON.parse(localStorage.getItem("globalsubjects")) != "") {
      globalsubjects = JSON.parse(localStorage.getItem("globalsubjects"));
    }
    else {
      this.props.history.push("/student/login");
    }
    console.log("getVideos.getVideos", "params:", {
      mobile: Cookies.get("mobile"),
      exam: parseInt(Cookies.get("examid")),
      class1: 0,
      subject: parseInt(this.props.ComponentParams.subject),
      chapter: this.props.ComponentParams.chapter,
      institute_id: 0,
      page: 1
    },getVideos.getVideos);

    return (

      <WatchingVideoSection
        globalsubjects={globalsubjects}
        defaultActiveKey={this.props.defaultActiveKey}
        getVideos={getVideos.getVideos}
        getChapterId={this.props.getChapterId}
        page="1"
        ComponentParams={this.props.ComponentParams} />




    )
  }
}



export default

  graphql(FETCH_VIDEOS, {
    options: (props) => ({
      variables: {
        params: {
          mobile: Cookies.get("mobile"),
          exam: parseInt(Cookies.get("examid")),
          class1: 0,
          subject: parseInt(props.ComponentParams.subject),
          chapter: props.ComponentParams.chapter.toString(),
          institute_id: 0,
          page: 1
        }


      },
      fetchPolicy: 'no-cache'
    }),
    name: "getVideos",
  })(RevisionMaterialVideos);
