import React, { Component } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
import './_subscribe-plans.scss'

export class SubscribePlans extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subscribeTrending: false,
        }
    }

    render() {
        const examPlanSubscribe = [
            {
                id: 1,
                subscribePlan: 'one-week',
                subscribeDays: 'one week',
                planRank: 'plan-Rank Booster 2021',
                planPrice: '₹99',
                planDescription: 'Unlimited mock test & access'
            },
            {
                id: 2,
                subscribePlan: 'three-months ',
                subscribeTrending: true,
                subscribeDays: '3 Months',
                planRank: 'plan-Rank Booster 2021',
                planPrice: ' ₹1999',
                planDescription: 'Unlimited mock test & access'
            },
            {
                id: 3,
                subscribePlan: 'six-months ',
                subscribeDays: '6 Months',
                planRank: 'plan-Rank Booster 2021',
                planPrice: ' ₹3499',
                planDescription: 'Unlimited mock test & access'
            },
            {
                id: 4,
                subscribePlan: 'one-year ',
                subscribeDays: 'One Year',
                planRank: 'plan-Rank Booster 2021',
                planPrice: ' ₹ 4999',
                planDescription: 'Unlimited mock test & access'
            }
        ];

        return (
            <Modal {...this.props}
                size="md" aria-labelledby="example-modal-sizes-title-lg" className="scribePlan-modal">
                <Button variant="link p-0 close" onClick={() => { this.props.onHide() }}> <i className="fas fa-times" /> </Button>
                <Modal.Body>
                    <div>
                        {
                            examPlanSubscribe.map((item, index) => {
                                const { subscribePlan, subscribeDays, planRank, planPrice, planDescription, subscribeTrending } = item;
                                return (
                                    <Card key={index} as={Card.Body} className={`subscribe-plans pl-4 py-2 ${subscribePlan}`}>
                                        {
                                            `${subscribeTrending}` === 'true' ?
                                                <div className="subscribe-lable text-uppercase">Trending</div>
                                                :
                                                null
                                        }
                                        <div className="subscribe-content d-flex justify-content-between align-items-start">
                                            <div className="content-left">
                                                <p className="text-muted text-capitalize">{planRank}</p>
                                                <h6 className="text-dark text-capitalize mb-0">{subscribeDays}</h6>
                                                <small className="text-muted plan-price">{planPrice} only</small>
                                                <p className="text-uppercase plan-description"><i className="fas fa-circle" /> {planDescription}</p>
                                            </div>
                                            <div className="content-right">
                                                <div className="price-block shadow-sm p-2">
                                                    <h6 className="mb-0"><i className="fas fa-rupee-sign text-white"></i> </h6>
                                                    <div className="text-right">
                                                        <div className="plan-price text-white">{planPrice}</div>
                                                        <small className="text-white-50">only</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SubscribePlans
