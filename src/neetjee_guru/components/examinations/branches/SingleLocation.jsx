import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class SingleLocation extends Component {
  render() {
    return (
      <React.Fragment>
        <Col xl={3} lg={3} md={6} sm={6} xs={6}>
          <Card as={Card.Body} className="border-0 shadow-sm">
            <p className="location_name mb-2">Total Branches</p>
            <h4 className="counts font-weight-bold">
              {this.props.branchData.total_count == null
                ? "0"
                : this.props.branchData.total_count}
            </h4>
          </Card>
        </Col>
        {this.props.branchData.branch_data.map(Data => (
          <Col xl={3} lg={3} md={6} sm={6} xs={6} key={Data.region}>
            <Card as={Card.Body} className="border-0 shadow-sm">
              <p className="location_name mb-2">{Data.region}</p>
              <h4 className="counts font-weight-bold">{Data.count}</h4>
            </Card>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}

export default withRouter(SingleLocation);
