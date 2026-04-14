import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class RegisterOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerStatus: false
        }
    }
    minutesTimer = (data) => {
        var date = new Date(data * 1000);
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var ss = date.getSeconds();
        if (hh < 10) { hh = "0" + hh; }
        if (mm < 10) { mm = "0" + mm; }
        if (ss < 10) { ss = "0" + ss; }
        //var t = hh + ":" + mm + ":" + ss;
        var t = mm + ":" + ss;
        return t;
    }


    render() {

        if (this.props.currentStep !== 2) {
            return null
        }

        return (
            <React.Fragment>
                <h5 className="title text-blue mb-3"> <small className="text-muted">Enter the OTP sent to your Registered mail address.</small></h5>
                <Form>
                    <Form.Group controlId="formBasicMobile">
                        {this.props.stateData.otpstatus == 1 ? (<Form.Text className="form-text text-danger">
                            OTP has sent successfully please check and enter
                        </Form.Text>) : ("")}
                        <Form.Control
                            type="phone"
                            placeholder="OTP Code"
                            name="verifymobemail"
                            onChange={this.props.ParenthandleInputChange}
                            autoComplete="off"
                        />


                        <Form.Text className="form-text text-danger">
                            {this.props.stateData.formErrors.verifymobemail}
                        </Form.Text>
                        <Form.Text className="form-text text-danger">
                            {this.minutesTimer(this.props.stateData.timer)}
                        </Form.Text>
                        {this.props.stateData.timerStatus == true ? (

                            <Button variant="success" className="float-right mb-2" onClick={this.props.PresendOtphandleFormSubmit}> Resend Otp </Button>

                        ) : ("")}
                    </Form.Group>
                    <div className="form_footer pt-2">
                        <Button onClick={this.props.ParenthandleFormSubmit} variant="primary" className="float-right w-100" type="submit">
                            Submit &amp; Next
                        </Button>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

export default RegisterOne
