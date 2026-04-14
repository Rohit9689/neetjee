import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button } from 'react-bootstrap'
import * as Cookies from "es-cookie";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from 'lodash.flowright';
import { withRouter } from "react-router-dom";
import PreloaderTwo from '../../preloader/PreloaderTwo';
import InnerBuyChapterVideoModalBody from './InnerBuyChapterVideoModalBody';
const FETCH_VIDEOPRICES = gql`
  query($params: VideoPriceInput) {
    getVideoPrices(
      params: $params
    ) {
        id
        price
        class
        video_count
        className
      }
  }
`;
class BuyChapterVideoModalBody extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        const getVideoPrices = this.props.getVideoPrices;
        const loading1 = getVideoPrices.loading;
        const error1 = getVideoPrices.error;
        if (loading1) return (<div className="bg-light p-3">
            <div className="d-flex justify-content-center align-items-center">
                <div class="spinner-border text-primary"></div>
            </div>
        </div>);
        let displayerror1="";
        if (error1 !== undefined) {
            displayerror1=error1.message;
        }
        
        // console.log("getVideoPrices.getVideoPrices", displayerror1, "params:", {
        //     mobile: Cookies.get("mobile"),
        //     exam: parseInt(Cookies.get("examid")),
        //     subject: this.props.stateData.subjecttype.toString(),
        //     chapter: parseInt(this.props.ComponentParams.chapter),
        //     institute_id: parseInt(Cookies.get("institution_id")),
        //     selectionType: this.props.selectionType,
        // });
        if(displayerror1==""){
            return (
            
                <InnerBuyChapterVideoModalBody 
                params={{
                    subject: this.props.stateData.subjecttype.toString(),
                    chapter: parseInt(this.props.ComponentParams.chapter),
                    selectionType: this.props.selectionType
                    }
                }
    
                getVideoPrices={getVideoPrices.getVideoPrices}/>
            )
        }
        else{
            return( <div className="p-3 d-flex justify-content-center text-danger" style={{height:150}}>
                {displayerror1.split(":")[1]}
            </div>)

        }
        
    }
}

export default compose(

    graphql(FETCH_VIDEOPRICES, {
        options: (props) => ({
            variables: {
                params: {
                    mobile: Cookies.get("mobile"),
                    exam: parseInt(Cookies.get("examid")),
                    subject: props.stateData.subjecttype.toString(),
                    chapter: parseInt(props.ComponentParams.chapter),
                    institute_id: 0,
                    selectionType: props.selectionType,
                }


            },
            fetchPolicy: 'no-cache'
        }),
        name: "getVideoPrices",
    }))(BuyChapterVideoModalBody);
