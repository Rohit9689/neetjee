import React, { Component } from 'react'
import { Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { exploreData } from '../StudentHomeData';

class ExploreTags extends Component {
    constructor(props) {
        super(props);
        this.preLoader = this.preLoader.bind(this);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        setTimeout(this.preLoader, 1000);
    }

    preLoader() {
        this.setState({ isLoading: false })
    }
    render() {
        return (
            this.state.isLoading ?
                <Card className="exploreTags my-3 border-0">
                    <div className="showcase-component">
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={560}
                            viewBox="0 0 420 560"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="8" y="14" rx="2" ry="2" width="400" height="560" />
                        </ContentLoader>
                    </div>
                </Card>
                :
                <React.Fragment>
                    <Card className="exploreTags my-3 border-0">
                        <Card.Header className="bg-white border-0 d-flex align-items-center px-4">
                            <i className="mr-2 fa-2x fad fa-history icon" /> <h6 className="mb-0">Explore more</h6>
                        </Card.Header>
                        <Card.Body>
                            <ul className="tags-list list-inline">
                                {
                                    exploreData.map((item) => {
                                        const { id, Active, exploreName } = item;
                                        return (
                                            <li key={id} className={`list-inline-item ${Active}`}>
                                                <Link to="#" onClick={() => this.setState({ modalShow: true })} className="text-muted">
                                                    <i className="mr-2 fad fa-check-circle" /> {exploreName}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Card.Body>
                    </Card>
                    <Modal {...this.props} className="tags-video"
                        show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}
                        size="lg" aria-labelledby="example-modal-sizes-title-lg">
                        <Modal.Header closeButton className="justify-content-center align-items-center p-0 border-0" />
                        <Modal.Body className="p-0">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="video" allowfullscreen></iframe>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
        )
    }
}

export default ExploreTags
