import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import PreloaderTwo from '../../preloader/PreloaderTwo';
import BookmarkPracticeQuestionsSectionSeparation from "./BookmarkPracticeQuestionsSectionSeparation";

const FETCH_BOOKMARKSHORTNOTES = gql`
  query(
          $mobile: String!, $subject_id: Int, $tag_id: String, $contentType: Int) {
            getStudentBookmarks(mobile: $mobile, subject_id: $subject_id, tag_id:$tag_id, contentType:$contentType ){
              id
              customcontent
              content{
                  id
                  subject
                  title
                  chapter
                  description
                  video_link
                  tags
                  file
                  question
                  option1
                  option2
                  option3
                  option4
                  explanation
                  answer
                  qtype
                  bookmarked
                  comments
                  
              }
              short_notes_count
              practice_questions_count
              exam_questions_count
          }
      }
`;



class BookmarkPracticeQuestionsSection extends Component {
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        return decdata;
    }
    revisionMaterialCount(data) {
        let SampleArray = [];
        let count = 0;
        for (let i = 0; i <= data.length; i++) {
            let idata = data[i]
            if (idata != undefined) {
                SampleArray.push(parseInt(idata.content.length));
            }

        }
        for (let num of SampleArray) {
            count = count + num
        }
        return count;
    }
    render() {
        
        const getStudentBookmarks = this.props.getStudentBookmarks;
        const loading1 = getStudentBookmarks.loading;
        const error1 = getStudentBookmarks.error;

        if (error1 !== undefined) {
            alert("Server Error. " + error1.message);
            return null;
        }
        if (loading1) return <PreloaderTwo />;
        let questionData = "";
       
        if (this.props.stateData.chapterId != "") {
            questionData =
            getStudentBookmarks.getStudentBookmarks[0].content.filter((a) => a.chapter == this.props.stateData.chapterId);
        }
        else {
            questionData = getStudentBookmarks.getStudentBookmarks[0].content;
        }

        
        return (
            <BookmarkPracticeQuestionsSectionSeparation
                questionData={questionData}
                getData={this.props.getData}
                contentType={this.props.contentType}
                getStudentBookmarks= {getStudentBookmarks.getStudentBookmarks}
                studentGlobals={this.props.studentGlobals}
            />
        )
    }
}
export default
withRouter( compose(graphql(FETCH_BOOKMARKSHORTNOTES,
        {
            options: props => ({
                variables: {
                    mobile: Cookies.get("mobile"),
                    subject_id: parseInt(props.stateData.subjectId),
                    tag_id: props.stateData.tags,
                    contentType: parseInt(props.contentType)
                    //contentType: 0
                },
                fetchPolicy: "cache-and-network"
            }), name: "getStudentBookmarks"
        })
    )(BookmarkPracticeQuestionsSection));
