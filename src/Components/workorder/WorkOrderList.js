import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Input, Tooltip } from "antd";
import { SearchOutlined , QuestionCircleOutlined} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { DispatchCreate } from "../Dispatch/DispatchCreate";
import { useNavigate } from "react-router-dom";
import { stripLeadingZeros } from "../Context/helpers";
import {SideDrawer} from "../Wizard/SideDrawer";
import WorkOrderCreateFlow from "./WorkOrderCreateFlow";
import { Layout } from "../Context/Layout";
export const WorkOrderList = () => {
  let history = useNavigate();

  const techStatus = {
    BIO: "/images/icons/api-notifications-icon-bio.svg",
    CHEM: "/images/icons/api-notifications-icon-chem.svg",
    CX: "/images/icons/api-notifications-icon-cx.svg",
    DA: "/images/icons/api-notifications-icon-da.svg",
    DI: "/images/icons/api-notifications-icon-di.svg",
    E: "/images/icons/api-notifications-icon-e.svg",
    NUKE: "/images/icons/api-notifications-icon-nuke.svg",
    TICL: "/images/icons/api-notifications-icon-ticl.svg",
    CLR: "/images/icons/api-notifications-icon-ticl.svg",
    X: "/images/icons/api-notifications-icon-x.svg",
  };

  const syncStatusObj = {
    0: <span className=" status-border-process ">Created</span>,
    1: <span className=" status-border-process ">Sent</span>,
    2: <span className=" status-border-process ">Pending</span>,
    3: <span className=" status-border-success ">Processed</span>,
    4: <span className="status-border-failed">Error</span>,
  };
  const [data , setData ] = useState([]);
  
  const coloumns = [
    {
      title: "Work Order No.",
      dataIndex: "DocumentNo",
      key: "DocumentNo",
      width: "9vw",
      sorter: true,
    },
    {
      title: "Admin No",
      dataIndex: "AdminNo",
      key: "AdminNo",
      width: "9vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Tech Status",
      dataIndex: "TechStatusName",
      key: "TechStatusName",
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {techStatus[record.TechStatusIcon] ? (
              <Tooltip placement="topLeft" title={record.TechStatusName}>
                <img
                  src={techStatus[record.TechStatusIcon]}
                  className="w-1/6 mr-2"
                  alt="record.OperStatus"
                />
              </Tooltip>
            ) : (
              <div>{record.TechStatusIcon}</div>
            )}
            <span>{record.TechStatusName}</span>
          </div>
        );
      },
    },
    {
      title: "Sync Status",
      dataIndex: "SyncCode",
      key: "SyncCode",
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            <Tooltip placement="topLeft" title={record.SyncText}>
              {record.SyncCode ? syncStatusObj[record.SyncCode] : "-"}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: "8vw",
      sorter: true,
    },
    {
      title: " Serial No.",
      dataIndex: "SerialNo",
      key: "SerialNo",
      width: "8vw",
      sorter: true,
    },
    {
      title: "Equipment",
      dataIndex: "EquipmentNumber",
      key: "EquipmentNumber",
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return `${stripLeadingZeros(record.EquipmentNumber)}`;
      },
    },
  ];
useEffect(() => {
  const response = fetch( "https://62a17273cd2e8da9b0f16c3e.mockapi.io/search/note")
  .then((res) => res.json())
  .then((resp) => {
      setData(resp[0].Data)
      setSearchList(resp[0].Data)
      setFilterSearch(resp[0].Data)
      console.log("printing resp ", resp[0].Data)
  });
}
, [])
 
console.log("printing data ", data)
  
  const [updateNotificationModel, setUpdateNotificationModel] = useState(false);
  const [searchList, setSearchList] = useState(data);
  const [filterSearch, setFilterSearch] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("printing data ", searchList);
  function onChange(pagination, filters, sorter, extra) {
    console.log("here is the params : ", pagination);
  }
  const handleSearch = (val) => {
    const datas = val.target.value;
    console.log("inside handle search function : ", datas);
    let querry = datas.toLowerCase();
    let result = [];
    result = searchList.filter((item) => {
      return item.DocumentNo.toString().toLowerCase().indexOf(querry) >= 0;
    });
    setFilterSearch(result);
  };
  return (
<Layout  
 showHelp={true}
 helpText={"Help"}
 helpIcon={<QuestionCircleOutlined />}

>
    <div>
      <div>
        <Row>
          <Col
            span={16}
            push={7}
            style={{ textAlign: "right", margin: "20px 0 20px 10px" }}
          >
            <div>
              {/* <Link to="/dispatchcreate"> */}
                <Button className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3"
                onClick={() => setIsModalVisible(true)}
                >
                  <h3>+ Create Work Order</h3>
                </Button>
              {/* </Link> */}
            </div>
          </Col>
          <Col
            span={4}
            pull={16}
            style={{ textAlign: "left", margin: "20px 0 20px 10px" }}
          >
            <h1
              className="font-poppins leading-normal"
              style={{ color: "#8892A5", fontWeight: "400", fontSize: "21px" }}
            >
              Work Orders
            </h1>
            <h3
              className="font-poppins text-h1 font-medium leading-normal"
              style={{ color: "#8892A5" }}
            >
              Manage Work Orders here
            </h3>
          </Col>
          <br />
        </Row>
        <Row>
          <Col span={6}>
            {/* <Col span={6} style={{ textAlign: "left", margin: "0 0 20px 10px" }}> */}
            <Input
              id="searching"
              type="search"
              placeholder="Search document no"
              className="font-poppins font-medium text-xs rounded-lg leading-normal"
              style={{
                height: "45px",
                color: "#383A65",
                backgroundColor: "#fff",
                cursor: "text",
                textAlign: "left",
                margin: "0 0 20px 10px",
              }}
              icon={<SearchOutlined />}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          <Col
            style={{ textAlign: "center", margin: "20px", padding: "5px" }}
            span={22}
          >
            {filterSearch.length > 0 ? (
              <Table
                columns={coloumns}
                dataSource={filterSearch}
                onChange={onChange}
              />
            ) : (
              <div
                style={{ textAlign: "center", margin: "20px", padding: "5px" }}
              >
                No eqipment has been added yet
                <br />
                <br />
                <Link to="/dispatchcreate">
                  <Button className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3">
                    <h3>+ Create Work Order</h3>
                  </Button>
                </Link>
              </div>
            )}
          </Col>
          <Col span={2} />
        </Row>
        {isModalVisible && ( 
          <SideDrawer
          showModal={isModalVisible}
          title="Create Work Order"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => {
            setIsModalVisible(false);
            document.body.classList.remove("no-body-scroll");
          }}
          >
            <WorkOrderCreateFlow 
            resp = {data}
            showModal={() => setUpdateNotificationModel(true)}
            onClose={() => setIsModalVisible(false)}
            />
          </SideDrawer>
        )}


      </div>
    </div>
    </Layout>
  );
};
