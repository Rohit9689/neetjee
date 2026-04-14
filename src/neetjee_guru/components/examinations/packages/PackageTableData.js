import React from "react";
import { Button } from "react-bootstrap";

export const Data = [
  { id: 1, package: "IPL", exam: "JEE(Mains+Advanced)", created: "20-02-2020" },
  { id: 2, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 3,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 4, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 5, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 6, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  { id: 7, package: "IPL", exam: "JEE(Mains+Advanced)", created: "20-02-2020" },
  { id: 8, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 9,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 10, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 11, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 12, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  {
    id: 13,
    package: "IPL",
    exam: "JEE(Mains+Advanced)",
    created: "20-02-2020"
  },
  { id: 14, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 15,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 16, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 17, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 18, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  {
    id: 19,
    package: "IPL",
    exam: "JEE(Mains+Advanced)",
    created: "20-02-2020"
  },
  { id: 20, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 21,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 22, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 23, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 24, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  {
    id: 25,
    package: "IPL",
    exam: "JEE(Mains+Advanced)",
    created: "20-02-2020"
  },
  { id: 26, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 27,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 28, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 29, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 30, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  {
    id: 31,
    package: "IPL",
    exam: "JEE(Mains+Advanced)",
    created: "20-02-2020"
  },
  { id: 32, package: "China1", exam: "NEET", created: "20-02-2020" },
  {
    id: 33,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 34, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 35, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 36, package: "NPL", exam: "EAMCET", created: "20-02-2020" },
  {
    id: 37,
    package: "NEON.",
    exam: "JEE Mains And 10+2 board",
    created: "20-02-2020"
  },
  { id: 38, package: "ICON", exam: "JEE and IPE", created: "20-02-2020" },
  { id: 39, package: "LEO", exam: "JEE", created: "20-02-2020" },
  { id: 40, package: "NPL", exam: "EAMCET", created: "20-02-2020" }
];

export const Columns = [
  {
    dataField: "package_name",
    text: "Package Name",
    sort: true
  },
  {
    dataField: "exams_covered",
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
    formatter: actionsFormatter,
    headerAttrs: { width: 50 },
    headerAlign: "center",
    align: "center",
    attrs: { width: 50, className: "EditRow" }
  }
];

export const defaultSorted = [
  {
    dataField: "title",
    order: "desc"
  }
];

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div className="actions-buttons d-flex justify-content-center align-items-top">
      <Button variant="link" className="text-theme">
        <i className="far fa-edit" />
      </Button>
      <Button variant="link" className="text-danger">
        <i className="far fa-trash-alt" />
      </Button>
    </div>
  );
}
