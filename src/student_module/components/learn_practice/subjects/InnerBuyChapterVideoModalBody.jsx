import React, { Component } from 'react'
import { Row, Col, Modal, Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class InnerBuyChapterVideoModalBody extends Component {
    constructor(props){
        super(props)
        const getVideoPrices=props.getVideoPrices.map((item, index)=>{
            if(index==0){
                return {
                    ...item, checked:"checked"
                }

            }
            else{
                return {
                    ...item, checked:""
                }
            }

        })
        this.state={
            getVideoPrices:getVideoPrices

        }
    }
    handleChange=(e, className)=>{
       const getVideoPrices= this.state.getVideoPrices.map((map)=>{
            if(map.className==className){
                return{...map, checked:"checked"}

            }
            else{
                return{...map, checked:""}
            }

        })

        this.setState({
            getVideoPrices:getVideoPrices
        });

    }
    render() {
        
        return (
            <React.Fragment>
                <div className="p-3">
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <Row>
                                {this.state.getVideoPrices.map((item)=>{
                                    return(
                                        <Form.Group as={Col} xs={3} controlId={item.className}>
                                    <Form.Check type="radio" label={
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{item.className}</span>
                                        </div>
                                    } name={item.className} custom checked={item.checked} onChange={(e) => this.handleChange(e, item.className)} />
                                </Form.Group>
                                    )

                                })}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.getVideoPrices.map((item)=>{
                            if(item.checked=="checked"){
                                return(
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                <Card as={Card.Body} className="p-2 text-center align-items-center justify-content-center">
                                <Button className="btn btn-darkblue text-capitalize mb-3" style={{ fontSize: 10 }}> {item.className} Videos: {item.video_count}</Button>
                                    <h3 className="rate mb-0"> @ ₹ {item.price} /-</h3>
                                </Card>
                            </Col>
                                )
                            }
                            
                        })}
                        
                    </Row>
                </div>
                <div className="bg-white border-0 d-flex justify-content-center" style={{ marginBottom: 10 }}>
                    <Link className="btn btn-darkblue px-5" to={{
                        pathname:"/student/video-order-summary",
                        state:{
                            getVideoPrices: this.state.getVideoPrices.find((a)=>a.checked=="checked"),
                            params:this.props.params
                            
                        }
                    }}
                    >Proceed With Payment </Link>
                </div>
             </React.Fragment>
        )
    }
}

export default 

    (InnerBuyChapterVideoModalBody);
