import React, { Component } from 'react'
import { sliderData } from './StudentHomeData';
import { Card, Carousel, ProgressBar } from 'react-bootstrap';

class BootstrapCarouselSlider extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }
    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }
    render() {
        const { index, direction } = this.state;
        return (
            <Carousel className="bootstrap-slider"
                interval={false}
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                {
                    sliderData.map((item) => {
                        const { id, sliderimg, title, percentage, subjectName } = item;
                        return (
                            <Carousel.Item key={id} className={`item ${subjectName}`}>
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
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        )
    }
}

export default BootstrapCarouselSlider
