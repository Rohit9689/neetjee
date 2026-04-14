import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Card, NavDropdown, Image, Button } from 'react-bootstrap'
import ContentLoader from 'react-content-loader';
class HomeNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <div
                className="student-top-nav pb-5"
            // className="student-top-nav dummyname pb-5"
            >
                <Navbar className="header-top" style={{ height: 150 }}>
                    <Container>
                        {/* <Card as={Card.Body}
                            className="border-0 p-2 text-center"
                        //className="border-0 p-2 text-center showcase-component"
                        > */}
                        <div className="w-100 justify-content-center d-flex text-center">
                            <p className="text-white">Please Wait While We Fetch your Data for Optimized
                    Performance</p>
                        </div>
                        {/* <ContentLoader
                                speed={2}
                                width={1920}
                                height={100}
                                viewBox="0 0 1920 100"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="8" y="14" rx="2" ry="2" width="1920" height="100" />
                            </ContentLoader> */}
                        {/* </Card> */}

                    </Container>

                </Navbar>

            </div>
        )
    }
}

export default withRouter(HomeNavbar)
