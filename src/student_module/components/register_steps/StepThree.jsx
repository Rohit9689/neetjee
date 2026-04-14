import React, { Component } from 'react'
import { Row, Col, Card, Nav, Image, Form, Button } from 'react-bootstrap';
import * as Cookies from "es-cookie";

class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupnid: ""
        }
    }
    handleInputChange = (e) => {
        this.setState({
            coupnid: e.target.value
        });
    }
    render() {

        if (this.props.currentStep !== 3) {
            return null;
        }
        console.log("successtoken", Cookies.get("successtoken"), Cookies.get("studenttoken"));
        console.log("this.props.stateData.planData", this.props.stateData);
        let planData = "";
        if (this.props.stateData.planData != "") {
            planData = this.props.stateData.planData;
        }
        let grand = "0";
        if (this.props.stateData.couponob != "") {
            console.log("cuopnobj", this.props.stateData.planData.amount, this.props.stateData.couponob.applied_amount);
            grand = Math.round(parseInt(this.props.stateData.planData.amount) - parseInt(this.props.stateData.couponob.applied_amount));
        }
        else {
            console.log("notcuopnobj");
            grand = this.props.stateData.planData.amount;
        }
        return (
            <Row className="stepThree">
                <Col xl={8} lg={8} md={12} sm={12} className="mt-2">
                    <Card as={Card.Body} className="stepFormOne border-0 px-4">
                        <div className="title border-bottom pb-3 mb-5">
                            <h5>Order Summary</h5>
                            {/* <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                        </div>
                        <Card as={Card.Body} className="rounded shadow-none flex-row justify-content-between align-items-end">
                            <div className="d-flex align-items-center">
                                {/* <div className="icon">
                                    <Image src={`${planData.image}`} alt="icon-img" width="50" />
                                </div> */}
                                <div className="content ml-4">
                                    <p className="text-muted mb-3">{planData.plan_title}</p>
                                    <h5>{planData.plan_name}</h5>
                                </div>
                            </div>
                            <div className="amount-block">
                                <h5>Rs : {planData.amount}/-</h5>

                                {planData.amount != planData.original_amount ? (<h5 className="mt-2 text-danger"><del>₹{planData.original_amount}/-</del></h5>) : ("")}
                            </div>


                        </Card>
                        

                        <ul className="list-unstyled order-summert-table">
                            <Form.Text className="form-text text-danger">
                                {this.props.stateData.submitError4}
                            </Form.Text>
                            <li className="d-flex align-items-center justify-content-between" style={{ background: "#F2F5F8" }}>
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24.429" height="24.43" viewBox="0 0 24.429 24.43"><path fill="#1a242f" d="M-726.437,162.9A12.229,12.229,0,0,0-738.57,175.1a12.2,12.2,0,0,0,12.227,12.223,12.284,12.284,0,0,0,12.2-12.238A12.332,12.332,0,0,0-726.437,162.9Zm9.609,13.327c.39.107.583.282.4.705a1.577,1.577,0,0,0-.09.436c-.041.352-.106.646-.586.484a.873.873,0,0,0-.4.055c-.166.034-.33.1-.374.276a.512.512,0,0,0,.182.52c.578.539.539.526.219,1.245-.195.437-.342.713-.862.4a.531.531,0,0,0-.734.111.517.517,0,0,0,.114.7c.415.4.242.669-.119.944a.815.815,0,0,0-.195.185c-.247.375-.5.446-.853.1a.553.553,0,0,0-.744-.065.622.622,0,0,0-.063.791c.232.365.117.558-.261.675a1.2,1.2,0,0,0-.277.145c-.364.231-.7.393-.966-.143A.509.509,0,0,0-723,183.5c-.348.079-.382.477-.355.645.109.7-.332.745-.8.814-.088.013-.171.055-.259.071-.252.048-.5.108-.538-.286a.93.93,0,0,0-.183-.4.5.5,0,0,0-.481-.27.474.474,0,0,0-.4.382c-.069.254-.026.638-.242.727a2.762,2.762,0,0,1-.933.012c-.394.006-.581-.143-.552-.569.02-.3-.052-.631-.424-.695a.624.624,0,0,0-.693.521c-.113.433-.318.415-.63.274-.068-.031-.143-.042-.213-.069a2.375,2.375,0,0,1-.651-.267c-.234-.188.033-.434.022-.66-.012-.254.026-.551-.252-.663a.7.7,0,0,0-.824.305c-.254.367-.472.2-.718.065-.09-.049-.154-.145-.241-.2-.385-.249-.737-.472-.232-.967a.508.508,0,0,0-.011-.7c-.192-.209-.417-.062-.627-.062-.275,0-.431.434-.753.229-.239-.152-.359-.427-.563-.628-.347-.342-.3-.526.067-.877.2-.193.492-.382.31-.7a.624.624,0,0,0-.84-.2c-.466.192-.637-.023-.727-.427a1.877,1.877,0,0,0-.073-.212c-.242-.686-.243-.687.453-1.054a.432.432,0,0,0,.247-.4.522.522,0,0,0-.274-.427c-.077-.041-.177-.039-.254-.081-.228-.124-.63.068-.7-.15a5.715,5.715,0,0,1-.125-1.293c-.007-.111.067-.156.172-.157a.562.562,0,0,0,.135-.008c.338-.086.792-.106.8-.552.006-.4-.351-.625-.727-.7-.263-.051-.341-.141-.245-.387a1.45,1.45,0,0,0,.044-.22,2.758,2.758,0,0,1,.2-.821c.171-.284.511-.047.774-.1.224-.046.467-.045.556-.3s-.065-.43-.213-.605c-.01-.011-.023-.02-.032-.031-.157-.192-.586-.269-.53-.468a5.168,5.168,0,0,1,.615-1.187c.086-.143.208-.005.314.032.36.124.79.372,1.063-.016.249-.353-.048-.718-.306-.99-.177-.186-.174-.305,0-.462.09-.079.167-.173.25-.26.467-.487.456-.471,1-.086.206.147.483.3.739.1.231-.181.2-.441.11-.7-.235-.705-.233-.708.421-1.088.125-.073.272-.111.387-.194.177-.129.284-.1.385.09a1.394,1.394,0,0,0,.246.32c.191.2.413.417.7.288.251-.113.27-.4.271-.66,0-.075,0-.15,0-.255-.13-.348.064-.481.4-.513.073-.007.141-.053.214-.067a2.185,2.185,0,0,1,.7-.11c.28.044.179.4.326.578s.262.465.575.427.383-.311.469-.543c.071-.192.034-.526.146-.578a1.9,1.9,0,0,1,.749-.041c.089,0,.179.033.268.031.356-.007.557.107.484.517a.793.793,0,0,0,.087.389c.184.472.506.521.845.135.04-.045.068-.1.109-.143.151-.165.138-.513.337-.538a1.826,1.826,0,0,1,.714.214c.14.048.275.118.418.153.2.05.266.158.19.351a.853.853,0,0,0-.016.088c-.093.356-.2.766.2.961s.675-.153.9-.423c.162-.2.268-.209.447-.059.114.1.247.168.37.254.366.255.8.485.321,1.015-.061.068-.055.2-.075.3a.417.417,0,0,0,.159.478c.171.106.321.042.492-.06.8-.481.625-.323,1.163.273.02.022.034.05.053.073.277.333.467.638-.014.99a.54.54,0,0,0-.167.727.659.659,0,0,0,.74.165c.6-.141.6-.131.764.456a1.23,1.23,0,0,0,.063.168c.176.4.3.753-.279.968a.534.534,0,0,0-.375.638c.092.316.4.354.657.346.4-.011.627.1.58.548a1.575,1.575,0,0,0,.057.4c.064.391.035.684-.482.73-.263.024-.582.15-.588.513C-717.345,176-717.092,176.152-716.828,176.224Z" transform="translate(738.57 -162.897)" /><path fill="#077EE6" d="M-639.5,247.6a.671.671,0,0,1-.142.429,16.925,16.925,0,0,0-1.469,1.988c-.486.7-1.044,1.347-1.525,2.049-.424.619-.908,1.191-1.319,1.821-.479.734-1.018,1.43-1.557,2.123a.809.809,0,0,1-1.471-.132.505.505,0,0,1,.029-.563c.629-1.079,1.473-2,2.187-3.011s1.432-2.043,2.2-3.022c.435-.553.75-1.187,1.234-1.7.137-.146.207-.353.337-.508a.811.811,0,0,1,.978-.239A.823.823,0,0,1-639.5,247.6Z" transform="translate(655.318 -239.183)" /><path fill="#077EE6" d="M-670.426,240.788a2.444,2.444,0,0,1,3.027-2.6,2.657,2.657,0,0,1,1.77,2.006,3.2,3.2,0,0,1-.415,2.4c-.293.542-.869.677-1.373.932a1.538,1.538,0,0,1-1.649-.122,2.827,2.827,0,0,1-1.36-2.252C-670.43,241.028-670.426,240.908-670.426,240.788Zm3.442.065a1.428,1.428,0,0,0-.153-.659c-.453-.889-1.063-.818-1.537-.274a1.573,1.573,0,0,0,.05,1.992.753.753,0,0,0,1.045.16A1.531,1.531,0,0,0-666.984,240.852Z" transform="translate(676.581 -231.292)" /><path fill="#077EE6" d="M-588.1,297.143a2.509,2.509,0,0,1,2.314,2.058,3.193,3.193,0,0,1-.35,2.178,2.523,2.523,0,0,1-1.61,1.2,2.322,2.322,0,0,1-2.685-1.59,3.042,3.042,0,0,1,.364-2.854A2.09,2.09,0,0,1-588.1,297.143Zm.924,2.719a1.878,1.878,0,0,0-.02-.314,1.212,1.212,0,0,0-.794-.984.738.738,0,0,0-.86.317,1.825,1.825,0,0,0-.012,2.026.9.9,0,0,0,.758.353A1.3,1.3,0,0,0-587.179,299.861Z" transform="translate(603.987 -285.018)" /></svg>
                                </div>

                                <Form.Group controlId="formFullName" className="mx-3 mb-0 w-100">
                                    <Form.Control
                                        placeholder=""
                                        type="text"
                                        name="coupnid"
                                        value={this.state.coupnid}
                                        onChange={this.handleInputChange}
                                        autoComplete="off"
                                    />
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.formErrors.coupnid}
                                    </Form.Text>
                                    <Form.Text className="form-text text-danger">
                                        {this.props.stateData.couponob.desc}
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="link p-0 text-dark text-decoration-none"
                                    onClick={(e) => this.props.coupnValidation(e, this.state.coupnid)}>Apply</Button>
                            </li>
                            {/* <SubcriptionDetails
                                validateReferralCodeData={validateReferralCodeData}
                                stateData={this.props.stateData} /> */}
                            <li className="d-flex align-items-center justify-content-between">
                                <p className="text-muted"> Subscription</p>
                                <p className="text-muted">₹

                                {this.props.stateData.planData != undefined ? this.props.stateData.planData.amount : '0'}/-</p>
                            </li>
                            {/* <li className="d-flex align-items-center justify-content-between">
                                <p className="text-muted"> CGST + SGST ( 5% + 5%)</p>
                                <p className="text-muted">₹1000/-</p>
                            </li> */}
                            {/* <li className="d-flex align-items-center justify-content-between">
                                <p className="text-dark"> Bill Total</p>
                                <p className="text-dark">₹{validateReferralCodeData.}/-</p>
                            </li> */}
                            <li className="d-flex align-items-center justify-content-between">
                                <p className="text-warning">Coupon</p>
                                <p className="text-warning">₹{this.props.stateData.couponob != "" ? this.props.stateData.couponob.applied_amount : '0'}/-</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p className="text-dark">Grand Total</p>
                                <p className="text-dark">₹{grand}/-</p>
                            </li>
                            <li className="p-3 d-flex align-items-center">
                                
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="customRadioType2"
                                        value="paytm"
                                        name="paymenttype"
                                        className="custom-control-input"
                                        onChange={this.props.handleInputChange}
                                        defaultChecked={true}
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customRadioType2"
                                    >
                                        <Image src={'https://bfsi.eletsonline.com/wp-content/uploads/2016/12/paytm.png'} width="50" alt="paytm-payment" />
                                    </label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input

                                        type="radio"
                                        id="customRadioType1"
                                        value="atom"
                                        name="paymenttype"
                                        className="custom-control-input"
                                        onChange={this.props.handleInputChange}

                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customRadioType1"
                                    >
                                        <Image src={'https://upload.wikimedia.org/wikipedia/commons/0/0c/Atom_Logo.png'} width="50" alt="atom-payment" />
                                    </label>
                                </div>

                            </li>
                        </ul>
                    </Card>
                </Col>
                {/* <Col xl={4} lg={4} md={12} sm={12} className="my-2">
                    <Nav className="flex-column aside-status">
                        <Nav.Item>
                            <Nav.Link className="active" to="#"><i className="mr-3 fas fa-check-circle" />Order Summary</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to="#"><i className="mr-3 fas fa-check-circle" />Payment</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col> */}
            </Row>
        )
    }
}

export default (StepThree);
