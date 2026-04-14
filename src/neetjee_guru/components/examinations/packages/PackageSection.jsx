import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import PackageModal from "./PackageModal";
import PackageModalEdit from "./PackageModalEdit";

//import { Data, Columns, defaultSorted } from "./PackageTableData";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import moment from 'moment';
const GET_GLOBALS = gql`
 query($institution_id: Int!) {
          globals(institution_id: $institution_id) {
           exams{
              id
              exam
            }
          }
        }
`;

const GETDATA = gql`
  query($institution_id: Int!) {
    getPackages(institution_id: $institution_id) {
      id
      package_name
      exams_covered
      timestamp
    }
  }
`;

const DELETE_QUERY = gql`
  mutation($id: ID) {
    deletePackage(id: $id)
  }
`;
class PackageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BreadcrumbData: {
        Title: "Package",
        btnName: "Add Package"
      },
      tableHeaderData: {
        Title: "Package"
      },
      modalShow: false,
      modalShow1: false,
      status: 1,
    };
  }

  getPackages(data) {
    let packages = Array();

    for (let i = 0; i < data.length; i++) {
      packages.push({
        id: data.id,
        package: data.package_name,
        exam: data.exams_covered,
        created: data.timestamp
      });
    }

    return packages;
  }

  actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" className="text-theme">
          <i className="far fa-edit" />
        </Button>
      </div>
    );
  }

  actionsFormatter2(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="actions-buttons d-flex justify-content-center align-items-top">
        <Button variant="link" className="text-danger">
          <i className="far fa-trash-alt" />
        </Button>
      </div>
    );
  }

  handleEditFunction = async (e, cell, row, rowIndex, formatExtraData) => {
    console.log("handleedit", row, rowIndex);
    this.setState({
      modalShow1: true,
      editRow: rowIndex
    });
  };
  handleDeleteFunction = async (e, cell, row, rowIndex, formatExtraData) => {
    console.log("Delete Student Parent", rowIndex.id);

    await this.props.deletedata({
      variables: {
        id: parseInt(rowIndex.id)
      },
      update: (store, { data }) => {
        console.log("data", data);
        const data1 = store.readQuery({
          query: GETDATA,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("rowIndex.id", rowIndex.id);

        data1.getPackages = data1.getPackages.filter(x => x.id != rowIndex.id);

        try {
          store.writeQuery({
            query: GETDATA,
            variables: {
              institution_id: parseInt(Cookies.get("institutionid"))
            },
            data: data1
          });
        } catch (e) {
          console.log("Exception", e);
        }

        const data2 = store.readQuery({
          query: GETDATA,
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          }
        });

        console.log("deleted data", data2);
        data1.getPackages = data2;

        //this.props.getPackages = data2.getPackages;

        if (data.deletePackage) {
          this.setState({
            status: 2
          });

          setTimeout(() => {
            this.DeleteSetpageLoad();
          }, 1000);
        }
      }
    });
  };
  DeleteSetpageLoad = () => {
    console.log("setTimeout");
    this.setState({ status: 1 });
  };

  onHide = () => {
    console.log("OnHide", "calling parent");
    this.setState({ modalShow1: false });
  };

  Columns = [
    {
      dataField: "package_name",
      text: "Package Name",
      sort: true
    },
    {
      dataField: "exam_value",
      text: "Exam",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    {
      dataField: "timestamp",
      text: "Created On",
      sort: true
    },
    {
      dataField: "actions",
      text: "Actions",
      sort: true,
      formatter: this.actionsFormatter,
      headerAttrs: { width: 50 },
      headerAlign: "center",
      align: "center",
      attrs: { width: 50, className: "EditRow" },
      events: {
        onClick: this.handleEditFunction
      }
    },
    {
      dataField: "dactions",
      text: "",
      sort: true,
      formatter: this.actionsFormatter2,
      headerAttrs: { width: 50 },
      headerAlign: "center",
      align: "center",
      attrs: { width: 50, className: "DeleteRow" },
      events: {
        onClick: this.handleDeleteFunction
      }
    }
  ];

  defaultSorted = [
    {
      dataField: "title",
      order: "desc"
    }
  ];

  // handleWindow = e => {
  //   console.log("Window Event", e);

  //   //alert("hello: " + e.type);
  // };

  // componentDidMount() {
  //   console.log("Window Obj", window, this.props);

  //   // if (this.props.history.action === "POP") {
  //   //   console.log("Pressed Back Button.");
  //   // }

  //   //window.addEventListener("click", this.handleWindow);

  //   window.addEventListener("beforeunload", e => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //     console.log("Before unload");
  //     alert("Window closed");
  //   });

  //   const _isMounted = true;
  //   window.onpopstate = e => {
  //     const { hash } = this.props.history.location;

  //     console.log("hash:", hash, e);
  //     if (!window.confirm("Are you sure to Leave this exam?")) {
  //       console.log("Popstate confirm denied");
  //       e.preventDefault();
  //     }
  //   };

  //   window.addEventListener("keydown", this.handleWindow);
  //   window.addEventListener("cancel", this.handleWindow);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handleWindow);
  //   window.removeEventListener("cancel", this.handleWindow);
  //   window.removeEventListener("beforeunload", this.handleWindow);
  // }
  tableData(data, globals) {
    console.log("tableData", data);
    let getData = [];
    data.map((mapdata) => {
      let time = moment.unix(mapdata.timestamp).format("YYYY/MM/DD")


      let getexam = globals.exams.find((a) => a.id == mapdata.exams_covered);
      let examval = "";
      if (getexam != undefined) {
        examval = getexam.exam;

      }

      console.log("getexam", globals, getexam, mapdata.exams_covered);
      const newObj = {
        id: mapdata.id,
        package_name: mapdata.package_name,
        exams_covered: mapdata.exams_covered,
        exam_value: examval,
        timestamp: time,
      }
      getData.push(newObj);

    })

    return getData;

  }

  render() {
    console.log("parent packages", this.state);

    if (this.props.getPackages.loading) return null;

    const packages = this.props.getPackages.getPackages;

    console.log("state", this.state, this.props);
    const globals = this.props.globals;
    const loading1 = globals.loading;
    const error1 = globals.error;

    if (loading1) return null;
    if (error1 !== undefined) {
      alert("Server Error. " + error1.message);
      return null;
    }

    return (
      <section className="package_section">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <BreadcrumbsSection
              onClick={() => this.setState({ modalShow: true })}
              breadcrumbs={this.state.BreadcrumbData}
            />
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <Row className="mb-4">
              <Col xl={3} lg={3} md={6} sm={12}>
                <Card as={Card.Body} className="border-0 p-3">
                  <p>Package</p>
                  <h4>{packages.length}</h4>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Package deleted successfully" : ""}
            </div>
            <DataTableWithOutSearch
              parentData={this.tableData(packages, globals.globals)}
              particlecolumns={this.Columns}
              //defaultSorted={this.defaultSorted}
              tableHeading={this.state.tableHeaderData}
              renderAgain={this.state.modalShow1}
            />
          </Col>
          <PackageModal
            globals={globals.globals}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <PackageModalEdit
            globals={globals.globals}
            show={this.state.modalShow1}
            packages={packages}
            editRow={this.state.editRow}
            onHide={this.onHide}
          />
        </Row>
      </section>
    );
  }
}

export default withRouter(
  compose(
    graphql(GETDATA, {
      options: props => ({
        variables: {
          institution_id: parseInt(Cookies.get("institutionid"))
        }
        ,
        fetchPolicy: 'cache-and-network'
      }),
      name: "getPackages"
    }),
    graphql(
      GET_GLOBALS,
      {
        options: props => ({
          variables: {
            institution_id: parseInt(Cookies.get("institutionid"))
          },
          fetchPolicy: 'cache-and-network'
        }),
        name: "globals"
      }
    ),

    graphql(DELETE_QUERY, {
      name: "deletedata"
    })
  )(PackageSection)
);
