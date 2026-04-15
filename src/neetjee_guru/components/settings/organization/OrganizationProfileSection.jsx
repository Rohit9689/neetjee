import React, { Component } from "react";
import { components } from "react-select";
import { Row, Col, Image, Form, Card, Modal, Button } from "react-bootstrap";
import BreadcrumbHeading from "../../breadcrumbs/BreadcrumbHeading";
import SelectDropDown from "../../selectdropdown/SelectDropDown";
import axios from "axios";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";

const ADDEDIT_ORGANIZATION_PROFILE = gql`
  mutation($params: addEditOrganisationProfile) {
    addEditOrganisationProfile(params: $params)
  }
`;

class SettingSection extends Component {
  constructor(props) {
    super(props);

    let organisation_name,
      address,
      mobile,
      hodmobile,
      principal,
      vice_principal,
      principlemobile,
      viceprinciplemobile,
      chairman,
      logo,
      hod = "";
    let organisation_nameValid,
      addressValid,
      formValid,
      mobileValid,
      principlemobileValid,
      hodmobileValid,

      viceprinciplemobileValid = false;

    if (props.getOrganisationProfile != null) {
      if (props.getOrganisationProfile.organisation_name != "") {
        organisation_name = props.getOrganisationProfile.organisation_name;
        organisation_nameValid = true;
      }

      if (props.getOrganisationProfile.principal != "") {
        principal = props.getOrganisationProfile.principal;

      }
      if (props.getOrganisationProfile.vice_principal != "") {
        vice_principal = props.getOrganisationProfile.vice_principal;

      }

      if (props.getOrganisationProfile.complete_address != "") {
        address = props.getOrganisationProfile.complete_address;
        addressValid = true;
      }

      if (
        (props.getOrganisationProfile.organisation_name != "") &
        (props.getOrganisationProfile.complete_address != "")
      ) {
        formValid = true;
      }

      if (props.getOrganisationProfile.contact_no != "") {
        mobile = props.getOrganisationProfile.contact_no;
        mobileValid = true;
      }

      if (props.getOrganisationProfile.hod_mobile != "") {
        hodmobile = props.getOrganisationProfile.hod_mobile;
        hodmobileValid = true;
      }

      if (props.getOrganisationProfile.principal_mobile != "") {
        principlemobile = props.getOrganisationProfile.principal_mobile;
        principlemobileValid = true;
      }

      if (props.getOrganisationProfile.vice_principal_mobile != "") {
        viceprinciplemobile =
          props.getOrganisationProfile.vice_principal_mobile;
        viceprinciplemobileValid = true;
      }
      if (props.getOrganisationProfile.chairman != "") {
        chairman = props.getOrganisationProfile.chairman;
      }

      if (props.getOrganisationProfile.logo != "") {
        logo = props.getOrganisationProfile.logo;
      }
      if (props.getOrganisationProfile.hod != "") {
        hod = props.getOrganisationProfile.hod;
      }
    }

    this.state = {
      breadcrumbsData: {
        Title: "Organization Profile",
      },
      modalShow: false,
      //form fields
      organizationname: organisation_name,
      organizationnamevalue: "",
      chairmenname: chairman,
      mobile: mobile,
      address: address,
      logo: logo,
      logo_filename: "Choose File",
      hod: hod,
      hodmobile: hodmobile,
      principle: principal,
      principlemobile: principlemobile,
      viceprinciple: vice_principal,
      viceprinciplemobile: viceprinciplemobile,
      formErrors: {
        organizationname: "",
        address: "",
        mobile: "",
        hodmobile: "",
        principlemobile: "",
        viceprinciplemobile: "",
      },
      organizationnameValid: organisation_nameValid,
      addressValid: addressValid,
      mobileValid: mobileValid,
      hodmobileValid: hodmobileValid,
      principlemobileValid: principlemobileValid,
      viceprinciplemobileValid: viceprinciplemobileValid,
      currentStep: 1,
      formValid: formValid,
      submitError: "",
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Cookies2", Cookies.get("institutename"));
    console.log("institutionid2", Cookies.get("institutionid"));

    if (this.state.formValid) {
      let addEditOrganisationProfile = "";
      addEditOrganisationProfile = {
        organisation_name: this.state.organizationname,
        chairman: this.state.chairmenname,
        contact_no: this.state.mobile,
        complete_address: this.state.address,
        logo: this.state.logo,
        hod: this.state.hod,
        hod_mobile: this.state.hodmobile,
        principal: this.state.principle,
        principal_mobile: this.state.principlemobile,
        vice_principal: this.state.viceprinciple,
        vice_principal_mobile: this.state.viceprinciplemobile,
        institution_id: parseInt(Cookies.get("institutionid")),
        username: Cookies.get("username"),
      };
      this.addeditorg(addEditOrganisationProfile).catch((error) => {
        console.log("catch if error");
        console.log(error);
        this.setState({
          submitError: error.graphQLErrors.map((x) => x.message),
        });
        console.error(
          "ERR =>",
          error.graphQLErrors.map((x) => x.message)
        );
      });
    } else {
      this.setState({ submitError: "Please fill all the values to proceed" });
    }
  };
  addeditorg = async (params) => {
    await this.props.addeditorg({
      variables: {
        params,
      },
      update: (store, { data }) => {
        if (data.addEditOrganisationProfile) {
          this.setState({
            //currentStep: 5
            modalShow: true,
          });

          setTimeout(() => {
            this.SetpageLoad();
          }, 1500);
        }
      },
    });
  };
  SetpageLoad = () => {
    console.log("setTimeout");
    this.setState({
      //currentStep: 1,
      modalShow: false,
    });
    window.location.reload(true);
  };
  fileUpload(file, stream) {
    console.log("fileupload", file);

    const url = "http://34.100.238.121:81/neetjee-dataadmin/mobile.php?uploadImage=true";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("stream", stream);
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    return axios.post(url, formData, config);
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "logo") {
      var file = e.target.files[0];
      let fileread = new FileReader();
      this.setState({
        logo_filename: "Uploading...",
      });

      fileread.readAsDataURL(file);
      fileread.onload = async (e) => {
        console.log("Target", e.target);

        let fobj = {
          stream: e.target.result,
          filename: file.name,
          mimetype: file.type,
        };

        const upload = await this.fileUpload(file, fobj.stream);
        console.log("file uploaded", upload);

        if (upload.data.result == "success") {
          this.setState({ logo: upload.data.filename });

          this.setState({
            logo_filename: file.name,
          });
        }
      };
    } else {
      this.setState({ [name]: value }, () => {
        this.validateField(name, value);
      });
    }
  };
  selecthandleInputChange = (ename, evalue) => {
    console.log("selecthandleInputChange", this.props);
    const name = ename;
    const value = evalue;
    if (name == "organizationname") {
      this.setState({
        organizationnamevalue: { value: value, labl: "" },
      });
    }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let organizationnameValid = this.state.organizationnameValid;
    let addressValid = this.state.addressValid;
    let mobileValid = this.state.mobileValid;
    let hodmobileValid = this.state.hodmobileValid;
    let principlemobileValid = this.state.principlemobileValid;
    let viceprinciplemobileValid = this.state.viceprinciplemobileValid;

    switch (fieldName) {
      case "organizationname":
        if (value.length == "") {
          organizationnameValid = false;
          fieldValidationErrors.organizationname =
            "organization Name Cannot Be Empty";
        } else {
          organizationnameValid = true;
          fieldValidationErrors.organizationname = "";
        }

        break;

      case "address":
        if (value.length == "") {
          addressValid = false;
          fieldValidationErrors.address = "Address Name Cannot Be Empty";
        } else {
          addressValid = true;
          fieldValidationErrors.address = "";
        }

        break;

      case "mobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");
        if (!pattern.test(value)) {
          mobileValid = false;
          fieldValidationErrors.mobile = "Invalid mobile";
        } else {
          mobileValid = true;
          fieldValidationErrors.mobile = "";
        }

        break;

      case "hodmobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");
        if (!pattern.test(value)) {
          hodmobileValid = false;
          fieldValidationErrors.hodmobile = "Invalid mobile";
        } else {
          hodmobileValid = true;
          fieldValidationErrors.hodmobile = "";
        }

        break;

      case "principlemobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");
        if (!pattern.test(value)) {
          principlemobileValid = false;
          fieldValidationErrors.principlemobile = "Invalid mobile";
        } else {
          principlemobileValid = true;
          fieldValidationErrors.principlemobile = "";
        }

        break;

      case "viceprinciplemobile":
        var pattern = new RegExp("^[6-9][0-9]{9}$");
        if (!pattern.test(value)) {
          viceprinciplemobileValid = false;
          fieldValidationErrors.viceprinciplemobile = "Invalid mobile";
        } else {
          viceprinciplemobileValid = true;
          fieldValidationErrors.viceprinciplemobile = "";
        }

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        organizationnameValid: organizationnameValid,
        addressValid: addressValid,
        mobileValid: mobileValid,
        hodmobileValid: hodmobileValid,
        principlemobileValid: principlemobileValid,
        viceprinciplemobileValid: viceprinciplemobileValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        (this.state.organizationnameValid && this.state.addressValid) ||
        this.state.mobileValid ||
        this.state.hodmobileValid ||
        this.state.principlemobileValid ||
        this.state.viceprinciplemobileValid,
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" });
    }
  }

  render() {
    console.log("getOrganisationProfile", this.props.getOrganisationProfile);
    // Locations
    const Locations = [
      { value: 1, label: "Telangana" },
      { value: 2, label: "Andhra Pradesh" },
      { value: 3, label: "Chennai" },
    ];

    // Regions
    const Regions = [
      { value: 1, label: "Regions-1" },
      { value: 2, label: "Regions-2" },
      { value: 3, label: "Regions-3" },
      { value: 4, label: "Regions-4" },
    ];

    const DropdownIndicator = (props) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-6q0nyr-Svg"
            >
              <path
                fill="currentColor"
                d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
              ></path>
            </svg>
          </components.DropdownIndicator>
        )
      );
    };

    return (
      <section className="settings">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbHeading breadcrumbs={this.state.breadcrumbsData} />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <Card as={Card.Body} className="border-0 shadow-sm">
              {this.state.currentStep == 5 ? (
                <Form.Text className="form-text text-danger">
                  User Saved successfully
                </Form.Text>
              ) : (
                <Form.Text className="form-text text-danger">
                  {this.state.submitError}
                </Form.Text>
              )}
              <Form>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={4}
                    md={12}
                    sm={12}
                    controlId="SelectBranch"
                  >
                    <Form.Label className="text-uppercase">
                      Organization Name<span className="text-danger">*</span>
                    </Form.Label>
                    {/* <SelectDropDown
                                            stateData={this.state.organizationnamevalue}
                                            handleChange={this.selecthandleInputChange}
                                            name="organizationname"
                                            options={Locations}
                                            placeholderName={'Locations'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        /> */}
                    <Form.Control
                      type="text"
                      placeholder="Organization Name"
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      name="organizationname"
                      value={this.state.organizationname}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.state.formErrors.organizationname}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg={4}
                    md={12}
                    sm={12}
                    controlId="SelectPrinciple"
                  >
                    <Form.Label className="text-uppercase">Chairmen</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Chairmen"
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      name="chairmenname"
                      value={this.state.chairmenname}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.state.formErrors.chairmenname}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg={4}
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
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      name="mobile"
                      value={this.state.mobile}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.state.formErrors.mobile}
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={8}
                    md={12}
                    sm={12}
                    controlId="SelectBranch"
                  >
                    <Form.Label className="text-uppercase">
                      Complete Address-Main Branch
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      name="address"
                      value={this.state.address}
                    />
                    <Form.Text className="form-text text-danger">
                      {this.state.formErrors.address}
                    </Form.Text>
                  </Form.Group>
                  {/* <Form.Group as={Col} lg={4} md={12} sm={12} controlId="SelectRegion">
                                        <Form.Label className="text-uppercase">Region</Form.Label>
                                        <SelectDropDown
                                            stateData={this.state.regionvalue}
                                            handleChange={this.selecthandleInputChange}
                                            name="region"
                                            options={Regions}
                                            placeholderName={'Region'}
                                            dropdownIndicator={{ DropdownIndicator }}
                                        />
                                    </Form.Group> */}
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    lg={4}
                    md={12}
                    sm={12}
                    controlId="SelectBranch"
                  >
                    <Form.Label
                      for="exampleFormControlFile1"
                      className="text-uppercase"
                    >
                      Upload Logo
                    </Form.Label>
                    <div className="form-control">
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={this.handleInputChange}
                        class="form-control-file"
                        id="exampleFormControlFile1"
                      />
                    </div>
                    <Form.Label className="text-uppercase">
                      {this.state.logo_filename}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group
                    as={Col} className="d-flex flex-column"
                    lg={{ span: 3, offset: 1 }}
                    md={12}
                    sm={12}
                  >
                    <Form.Label className="text-uppercase">Preview Image</Form.Label>
                    <Image
                      src={`https://admin.rizee.in/files/${this.state.logo}`}

                      width="60" height="60" alt="preview-img" />
                  </Form.Group>
                </Row>
                <Row className="mt-5">
                  <Col lg={4} md={6} sm={12}>
                    <Form.Group controlId="HodName">
                      <Form.Label className="text-uppercase">Hod</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Hod"
                        name="hod"
                        value={this.state.hod}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="form-text text-danger">
                        {this.state.formErrors.hod}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="HodMobile">
                      <Form.Control
                        type="text"
                        placeholder="Mobile"
                        name="hodmobile"
                        value={this.state.hodmobile}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="form-text text-danger">
                        {this.state.formErrors.hodmobile}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={6} sm={12}>
                    <Form.Group controlId="PrincipleName">
                      <Form.Label className="text-uppercase">
                        Principle
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Principle"
                        name="principle"
                        value={this.state.principle}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="form-text text-danger">
                        {this.state.formErrors.principle}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="PrincipleMobile">
                      <Form.Control
                        type="text"
                        placeholder="Principle Mobile"
                        name="principlemobile"
                        value={this.state.principlemobile}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="form-text text-danger">
                        {this.state.formErrors.principlemobile}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={6} sm={12}>
                    <Form.Group controlId="VicePrincipleName">
                      <Form.Label className="text-uppercase">
                        vice Principle
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="vice Principle"
                        name="viceprinciple"
                        value={this.state.viceprinciple}
                        onChange={this.handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="VicePrincipleMobile">
                      <Form.Control
                        type="text"
                        placeholder="Mobile"
                        name="viceprinciplemobile"
                        value={this.state.viceprinciplemobile}
                        onChange={this.handleInputChange}
                      />
                      <Form.Text className="form-text text-danger">
                        {this.state.formErrors.viceprinciplemobile}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} className="text-right mt-5">
            <Button
              className="btn btn-success text-uppercase px-5"
              onClick={this.handleFormSubmit}
            >
              Save
            </Button>
          </Col>
        </Row>
        <Modal
          {...this.props}
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          size="md"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Status</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row className="text-center">
              <Col xl={12} lg={12} md={12}>
                <i className="fal fa-check-circle fa-4x mb-3 text-success" />
                <h6>
                  Saved
                  <br /> Successfully
                </h6>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </section>
    );
  }
}
export default withRouter(
  compose(
    graphql(ADDEDIT_ORGANIZATION_PROFILE, {
      name: "addeditorg",
    })
  )(SettingSection)
);
