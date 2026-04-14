import React, { Component } from 'react'
import { sliderData } from './StudentHomeData';
import { Card, ProgressBar } from 'react-bootstrap';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

class OwlCarouselSlider extends Component {
    render() {
        return (
            <OwlCarousel className="owl-theme subject-slides"
                items={1}
                loop
                margin={10}
                nav
            >
                {
                    sliderData.map((item) => {
                        const { id, sliderimg, title, percentage, subjectName } = item;
                        return (
                            <div key={id} className={`item ${subjectName}`}>
                                <Card className="single-card shadow-sm border-0">
                                    <Card.Img variant="top" src={sliderimg} alt="img" />
                                    <Card.Body>
                                        <Card.Subtitle>
                                            <i className="fad fa-vial" />
                                        </Card.Subtitle>
                                        <Card.Title className="my-5 text-dark text-uppercase">{title}</Card.Title>
                                        <ProgressBar now={percentage} label={`${percentage}%`} min={0} max={100} />
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0 text-muted">0%</p>
                                            <p className="mb-0 text-muted">100%</p>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="border-0 text-center py-2">
                                        <Card.Link to="#">Continue</Card.Link>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })
                }
            </OwlCarousel>
        )
    }
}

export default OwlCarouselSlider
