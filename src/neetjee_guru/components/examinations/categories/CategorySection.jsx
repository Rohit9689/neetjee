import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BreadcrumbsSection from "../../breadcrumbs/BreadcrumbsSection";
import DataTableWithOutSearch from "../../datatables/DataTableWithOutSearch";
import CategoryModal from "./CategoryModal";
import CategoryModalEdit from "./CategoryModalEdit";

//import { Data, Columns, defaultSorted } from "./CategoryTableData";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import * as Cookies from "es-cookie";
import * as compose from "lodash.flowright";
import { withRouter } from "react-router-dom";
import moment from 'moment';

const GETDATA = gql`
  query($institution_id: Int!) {
    getCategories(institution_id: $institution_id) {
      id
      category_name
      package_id
      package_name
      # exams_covered
      high_difficult
      difficult
      moderate
      easy
      timestamp
    }
  }
`;

const DELETE_QUERY = gql`
  mutation($category_id: ID) {
    deleteCategory(category_id: $category_id)
  }
`;

class CategorySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BreadcrumbData: {
        Title: "Category",
        btnName: "Add Category"
      },
      tableHeaderData: {
        Title: "Category"
      },
      modalShow: false,
      modalShow1: false,
      status: "1"
    };
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
  handleDelete = async (e, cell, row, rowIndex, formatExtraData) => {
    // console.log("Delete Student Parent", rowIndex);

    await this.props.deletedata({
      variables: {
        category_id: rowIndex.id
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

        data1.getCategories = data1.getCategories.filter(x => x.id != rowIndex.id);

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

        data1.getCategories = data2;

        if (data.deleteCategory) {
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
      dataField: "category_name",
      text: "Category",
      sort: true
    },
    {
      dataField: "high_difficult",
      text: "High Difficulty",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    {
      dataField: "difficult",
      text: "Difficulty",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    {
      dataField: "moderate",
      text: "Moderate",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    {
      dataField: "easy",
      text: "Easy",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    {
      dataField: "package_name",
      text: "Package Name",
      sort: true,
      headerAlign: "left",
      align: "left"
    },
    // {
    //   dataField: "exams_covered",
    //   text: "Exam",
    //   sort: true,
    //   headerAlign: "left",
    //   align: "left"
    // },
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
        onClick: this.handleDelete
      }
    }
  ];

  defaultSorted = [
    {
      dataField: "title",
      order: "desc"
    }
  ];
  render() {


    if (this.props.getCategories.loading) return null;
    let categories = [];
    this.props.getCategories.getCategories.map((citem) => {
      if (citem != undefined) {
        const newObj = {
          id: citem.id,
          category_name: citem.category_name,
          package_id: citem.package_id,
          package_name: citem.package_name,

          high_difficult: citem.high_difficult,
          difficult: citem.difficult,
          moderate: citem.moderate,
          easy: citem.easy,
          timestamp: moment.unix(citem.timestamp).format("YYYY/MM/DD")
        }
        categories.push(newObj);
      }

    });

    //const categories = this.props.getCategories.getCategories;
    console.log("parent categories", categories);

    return (
      <section className="category_section">
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
                  <p>Categories</p>
                  <h4>{categories.length}</h4>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12}>
            <div className="card-title mb-0 text-danger">
              {this.state.status == 2 ? "Category deleted successfully" : ""}
            </div>
            <DataTableWithOutSearch
              parentData={categories}
              particlecolumns={this.Columns}
              defaultSorted={this.defaultSorted}
              tableHeading={this.state.tableHeaderData}
            />
          </Col>
          <CategoryModal
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <CategoryModalEdit
            show={this.state.modalShow1}
            categories={categories}
            editRow={this.state.editRow}
            onHide={this.onHide}
          />
        </Row>
      </section>
    );
  }
}

export default compose(
  graphql(GETDATA, {
    options: props => ({
      variables: {
        institution_id: parseInt(Cookies.get("institutionid"))
      },
      fetchPolicy: 'network-only'


    }),
    name: "getCategories"
  }),

  graphql(DELETE_QUERY, {
    name: "deletedata"
  })
)(CategorySection);
