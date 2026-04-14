import React, { Component } from "react";
import { Form } from "react-bootstrap";
import moment from "moment";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";

class DateBlock extends Component {
    constructor(props) {
        super(props);
        // let start = moment(new Date())
        //     .subtract(5, "days");
        let start = moment(new Date()).subtract(1, "week");
        if(props.type=="student"){
            start=moment(new Date()).subtract(1, "month");
        }
        

        let end = moment(new Date());
        this.state = {
            start: start,
            end: end
        };

        this.onClick = this.onClick.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate) {
        this.setState({
            start: startDate,
            end: endDate
        });
        this.props.applyCallback(startDate, endDate);
    }

    rangeCallback(index, value) {
        // console.log(index, value);
    }

    onClick() {
        let newStart = moment(this.state.start).subtract(3, "days");
        // console.log("On Click Callback");
        // console.log(newStart.format("DD-MM-YYYY HH:mm"));
        this.setState({ start: newStart });
    }

    renderGridPickerNoMobileMode(ranges, local, maxDate) {
        let disabled = false;
        let value = `${this.state.start.format(
            "DD-MM-YYYY"
        )} - ${this.state.end.format("DD-MM-YYYY")}`;

        return (

            <Form.Group className="customDaterange mb-0" id="DateTimeRangeContainerNoMobileMode" style={{ width: 230 }}>
                <DateTimeRangeContainer
                    ranges={ranges}
                    start={this.state.start}
                    end={this.state.end}
                    local={local}
                    applyCallback={this.applyCallback}
                    smartMode
                    noMobileMode
                    leftMode
                >
                    <i className="far fa-calendar-day" />
                    <Form.Control
                        className="form-control-custom"
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        style={{ cursor: "pointer" }}
                        disabled={disabled}
                        value={value}
                    //onChange={this.props.datefunction}
                    />
                </DateTimeRangeContainer>
            </Form.Group>
        );
    }

    render() {
        let now = new Date();
        let start = moment(
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        );
        let end = moment(start)
            .add(1, "days")
            .subtract(1, "seconds");
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [
                moment(start).subtract(1, "days"),
                moment(end).subtract(1, "days")
            ],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)],
            "5 Days": [moment(start).subtract(5, "days"), moment(end)],
            "1 Week": [moment(start).subtract(7, "days"), moment(end)],
            "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
            "1 Month": [moment(start).subtract(1, "months"), moment(end)],
            // "1st August 18": [moment("2018-08-01"), moment("2018-08-02")],
            "1 Year": [moment(start).subtract(1, "years"), moment(end)]
        };
        let local = {
            format: "DD-MM-YYYY",
            sundayFirst: false
        };
        let maxDate = moment(end).add(24, "hour");
        return (
            <React.Fragment>
                {this.renderGridPickerNoMobileMode(ranges, local, maxDate)}
            </React.Fragment>
        );
    }
}
export default DateBlock;
