import React, { Component } from "react";
import { Modal, Form, Row, Col, FormGroup, Button } from "react-bootstrap";
class BranchModalEdit extends Component {
  constructor(props) {
    super(props);
    console.log("constructor", this.props);
    this.state = {};
  }
  render() {
    console.log("globals", this.props.globals);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Branch</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {this.props.stateData.currentStep == 5 ? (
            <Form.Text className="form-text text-danger">
              Branch Saved successfully
            </Form.Text>
          ) : (
              <Form.Text className="form-text text-danger">
                {this.props.stateData.submitError}
              </Form.Text>
            )}
          <Form>
            <Row>
              <Col lg={8} md={12} sm={12}>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={6}
                    md={12}
                    sm={12}
                    controlId="SelectBranch"
                  >
                    <Form.Label className="text-uppercase">
                      Branch Name<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Branch Name"
                      onChange={this.props.ParenthandleInputChange}
                      autoComplete="off"
                      name="branch"
                      value={this.props.stateData.branch}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.branch}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg={6}
                    md={12}
                    sm={12}
                    controlId="SelectContact"
                  >
                    <Form.Label className="text-uppercase">
                      Contact No
                    </Form.Label>
                    <Form.Control
                      type="phone"
                      placeholder="Mobile No"
                      name="mobile"
                      onChange={this.props.ParenthandleInputChange}
                      autoComplete="off"
                      value={this.props.stateData.mobile}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.mobile}
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Form.Group controlId="SelectAddress" className="my-4">
                  <Form.Label className="text-uppercase">
                    Complete Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.address}
                  />
                </Form.Group>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={6}
                    md={12}
                    sm={12}
                    controlId="SelectState"
                  >
                    <Form.Label className="text-uppercase">State</Form.Label>
                    <Form.Control
                      as="select"
                      name="region"
                      onChange={this.props.ParenthandleInputChange}
                      value={this.props.stateData.region}
                    >
                      <option>--Select State--</option>
                      {this.props.globals.regions.map(regionsdata => (
                        <option value={regionsdata.id} key={regionsdata.id}>
                          {regionsdata.region}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg={6}
                    md={12}
                    sm={12}
                    controlId="SelectCity"
                  >
                    <Form.Label className="text-uppercase">City</Form.Label>
                    <Form.Control
                      as="select"
                      name="city_id"
                      onChange={this.props.ParenthandleInputChange}
                      value={this.props.stateData.city_id}
                    >
                      <option>--Select City--</option>
                      {this.props.globals.cities.map(citiesdata => {
                        if (this.props.stateData.region > 0) {
                          if (
                            this.props.stateData.region == citiesdata.region_id
                          )
                            return (
                              <option value={citiesdata.id} key={citiesdata.id}>
                                {citiesdata.city_name}
                              </option>
                            );
                          else return null;
                        } else {
                          return (
                            <option value={citiesdata.id} key={citiesdata.id}>
                              {citiesdata.city_name}
                            </option>
                          );
                        }
                      })}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={6}
                    md={12}
                    sm={12}
                    controlId="SelectState"
                  >
                    <Form.Label className="text-uppercase">
                      Organization Structure
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="organisation_structure_id"
                      onChange={this.props.ParenthandleInputChange}
                      value={this.props.stateData.organisation_structure_id}
                    >
                      <option>--Select Structure--</option>
                      {this.props.globals.organisationDropdown.map(data => (
                        <option value={data.id} key={data.id}>
                          {data.group_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>
              <Col lg={4} md={12} sm={12} className="border-left">
                <Form.Group controlId="InputAddress">
                  <Form.Label className="text-uppercase">HOD</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="hod"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.hod}
                  />
                </Form.Group>
                <Form.Group controlId="InputPhone1">
                  <Form.Control
                    type="phone"
                    placeholder="Mobile No"
                    name="hod_mobile"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.hod_mobile}
                  />
                </Form.Group>
                <Form.Group controlId="InputPriciple">
                  <Form.Label className="text-uppercase">principal<span className="text-danger">*</span> </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="principal"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.principal}
                  />
                </Form.Group>
                <Form.Group controlId="InputPhone2">
                  <Form.Control
                    type="phone"
                    placeholder="Mobile No"
                    name="principal_mobile"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.principal_mobile}
                  />
                </Form.Group>
                <Form.Group controlId="InputVicePriciple">
                  <Form.Label className="text-uppercase">
                    Vice principal
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="vice_principal"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.vice_principal}
                  />
                </Form.Group>
                <Form.Group controlId="InputPhone3">
                  <Form.Control
                    type="phone"
                    placeholder="Mobile No"
                    name="vice_principal_mobile"
                    onChange={this.props.ParenthandleInputChange}
                    autoComplete="off"
                    value={this.props.stateData.vice_principal_mobile}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer variant="white" className="px-4">
          <Button
            onClick={this.props.ParenthandleFormSubmit}
            className="btn btn-success text-uppercase"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BranchModalEdit;
