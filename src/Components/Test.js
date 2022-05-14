import React from "react";
import { Table, Row, Col, Button, Tooltip,Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export const Test = () => {
  const coloumns = [
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      sorter: {
        compare: (first, sec) => first.document - sec.document,
        multiple: 5,
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "FSCC",
      dataIndex: "fscc",
      key: "fscc",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      sorter: {
        compare: (first, sec) => first.qty - sec.qty,
        multiple: 4,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Col",
      dataIndex: "col",
      key: "col",
      sorter: {
        compare: (first, sec) => first.col - sec.col,
        multiple: 3,
      },
    },
    {
      title: "R Strategy",
      dataIndex: "r_strategy",
      key: "r_strategy",
    },
    {
      title: "R Status",
      dataIndex: "r_status",
      key: "r_status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "M Status",
      dataIndex: "m_status",
      key: "m_status",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Date",
      dataIndex: "d_date",
      key: "d_date",
      sorter: {
        compare: (first, sec) => first.d_date - sec.d_date,
        multiple: 3,
      },
    },
  ];

  const data = [
    {
      key: 1,
      document: "AG00100",
      type: "Damaged",
      fscc: "FD00112",
      material: "Tyres",
      qty: "12",
      description: "Replacement",
      col: "14",
      r_strategy: "Sanctioned",
      location: "Boston",
      r_status: "Test 1",
      priority: "Immediate",
      m_status: "Aproved",
      value: "DB00203",
      d_date: "14/05/2022",
    },
    {
      key: 2,
      document: "AG00123",
      type: "dismantle",
      fscc: "FD00145",
      material: "Trunk",
      qty: "4",
      location: "DotHill",
      description: "Dead",
      col: "56",
      r_strategy: "Testing",
      r_status: "Test 14",
      priority: "Need",
      m_status: "Testing",
      value: "DB00288",
      d_date: "10/01/2019",
    },
    {
      key: 3,
      document: "AG00156",
      type: "Repairing",
      fscc: "FD00303",
      material: "Clock Gear",
      qty: "115",
      description: "Repairement",
      col: "30",
      location: "Sanfranscisco",
      r_strategy: "Supervision",
      r_status: "Test 78",
      priority: "Urgent",
      m_status: "Pending",
      value: "DB00404",
      d_date: "16/03/2022",
    },
    {
      key: 4,
      document: "AG00312",
      type: "New",
      fscc: "FD00201",
      material: "6x Scope",
      qty: "409",
      description: "New Order",
      col: "178",
      r_strategy: "Controlled",
      r_status: "Test 56",
      priority: "Fullfiled",
      m_status: "Received",
      value: "DB00514",
      d_date: "23/06/2008",
      location: "New York",
    },
    {
      key: 5,
      document: "AG00132",
      location: "Boston",
      type: "Repairing",
      fscc: "FD00302",
      material: "Gear Box",
      qty: "978",
      description: "Repairement",
      col: "05",
      r_strategy: "Supervision",
      r_status: "Test 12",
      priority: "Immediate",
      m_status: "Aproved",
      value: "DB00343",
      d_date: "21/08/2019",
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log("here is the params : ", pagination, filters, sorter, extra);
  }

  const { Search } = Input;
  return (
    <div>
      <div>
        <Row>
          <Col
            span={16}
            push={7}
            style={{ textAlign: "right", margin: "20px 0 20px 10px" }}
          >
            <Button type="primary" shape="round" size={"middle"}>
              <h3>+ Create Purchase Requisition</h3>
            </Button>
          </Col>
          <Col
            span={4}
            pull={16}
            style={{ textAlign: "left", margin: "20px 0 20px 10px" }}
          >
            <h1 className="font-bold" style={{ fontSize: "19px" }}>
              Purchasing
            </h1>
            <h3 className="font-bold" style={{ fontSize: "14px" }}>
              Manage Purchasing here
            </h3>
          </Col>
          <br />
        </Row>
        <Row>
          <Col span={6} style={{ textAlign: "left", margin: "0 0 20px 10px" }}>
            <Button type="primary" shape="round" icon={<SearchOutlined />}>
              Search Document No
            </Button>
          </Col>
          <Col style={{ textAlign: "center", margin: "20px", padding: "5px" }}>
            <div>
              <Table columns={coloumns} dataSource={data} onChange={onChange} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
