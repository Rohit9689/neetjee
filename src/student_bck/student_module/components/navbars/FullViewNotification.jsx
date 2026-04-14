import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import {  Image,Card,Row, Col } from 'react-bootstrap'
import './_navbars.scss';
import * as Cookies from "es-cookie";
import moment from 'moment';
import parse, { domToReact } from "html-react-parser";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as compose from "lodash.flowright";


const NOTIFICATION_VIEWS = gql`
  mutation($id: Int,$mobile: String) {
    viewedNotification(id: $id,mobile: $mobile)
  }
`;
class FullViewNotification extends Component {
    constructor(props) {
        super(props);
        const notifications = props.getStudentNotificatons.find((a)=>a.id==this.props.id);
        let seen="";
        if(notifications.seen_status=="0"){
            seen="0"
        }
        else{
            seen="1"
        }
        this.state = {
            seen:seen,
            submitError3:"",
            BreadcrumbData: {
                Title: 'Notification',
                Link: '/notifications',
                btnName: 'Back'
            }
        }
    }
    decodefun(data) {
        var decdata = decodeURIComponent(data);
        // decdata = decdata.replace(/font-family/g, "ff");

        return decdata;
    }
    //views start
    seenhandleFormSubmit = (e) => {
    console.log("seenhandleFormSubmit", this.props.id);
    this.notificationview(parseInt(this.props.id),Cookies.get("mobile")).catch((error) => {
      
      this.setState({
        submitError3: error.graphQLErrors.map((x) => x.message),
      });
      console.error(
        "ERR =>",
        error.graphQLErrors.map((x) => x.message)
      );
    });
  };
  notificationview = async (id,mobile) => {
    await this.props.notificationview({
      variables: {
        id:id,
        mobile:mobile
      },
      update: (store, { data }) => {
        console.log("viewedNotification", data.viewedNotification);
        if (data.viewedNotification) {
         this.setState({
            seen: "1"
          });
        }
      },
    });
  };

  //views end
    componentDidMount=()=>{
        
        if(this.state.seen=="0"){
            this.seenhandleFormSubmit();
        }

    }
    render() {
        console.log("this.props.getStudentNotificatons",this.props.getStudentNotificatons, this.props.id);
        const notifications = this.props.getStudentNotificatons.find((a)=>a.id==this.props.id);
        return (
            <section className="notification">
            <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <div className="breadcrumb_section border-bottom border-theme pb-3 mb-4 d-flex align-items-center justify-content-between">
                        <h2 className="title h5 mb-0">{this.state.BreadcrumbData.Title}</h2>
                        <Link to={{ pathname: "/student/notifications" }} className="btn btn-success text-uppercase text-white px-4">{this.state.BreadcrumbData.btnName}</Link>
                    </div>
                    <div className="notification-block">
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white px-3">

                                <div className="d-flex mb-2">
                                    <div className="icon">
                                        {notifications.image != "" ? (
                                            <Image src={notifications.image} width="40" height="40" alt="img" className="rounded-circle" style={{
                                                padding: " 0.25rem",
                                                backgroundColor: "#fff",
                                                border: "1px solid #dee2e6"
                                            }} />
                                        ) : (
                                                // <div className="empty-notifications rounded-circle p-2" style={{ width: "40px", height: "40px", border: '1px solid #6c757d' }}>
                                                //     <i className="fal fa-bell text-dark" style={{ fontSize: '1.5rem' }}></i>
                                                // </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                    <g id="Layer">
                                                        <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                        <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                        <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                    </g>
                                                </svg>
                                            )}

                                    </div>
                                    <div className="notification-title ml-3">
                                        <Card.Title className="mb-0">{notifications.title}</Card.Title>
                                        <small className="text-muted">{moment.unix(notifications.timestamp).format("DD-MM-YYYY @ LT")}</small>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {/* <Row className="align-content-center justify-content-center text-center">
                                        <Col xl={8} lg={8} md={8} sm={12}>
                                            {notifications.image != "" ? (<Image src={notifications.image} alt="img" className="img-fluid" />) : ""}

                                        </Col>
                                    </Row> */}
                                    {parse(
                                        this.decodefun(
                                            notifications.long_description
                                        )
                                    )}

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </section>
        )
    }
}




export default withRouter(
    compose(
      
      graphql(NOTIFICATION_VIEWS, {
        name: "notificationview",
      })
      
    )(FullViewNotification)
  );
  

