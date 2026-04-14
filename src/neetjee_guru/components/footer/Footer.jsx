import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Row>
                    <Col xl={6} lg={6} md={7} sm={12}>
                        <ul className="footer-links list-inline m-0 p-0">
                            <li className="list-inline-item"><a className="text-muted" href="#">Support</a></li>
                            <li className="list-inline-item"><a className="text-muted" href="#">Help Center</a></li>
                            <li className="list-inline-item"><a className="text-muted" href="#">Privacy</a></li>
                            <li className="list-inline-item"><a className="text-muted" href="#">Terms of Services</a></li>
                        </ul>
                    </Col>
                    <Col xl={6} lg={6} md={5} sm={12} className="text-md-right">2020 &copy; ELAPP Web App</Col>
                </Row>
            </footer>
        )
    }
}

export default Footer
