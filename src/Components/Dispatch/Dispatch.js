import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Input } from "antd";
import { SearchOutlined , QuestionCircleOutlined} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { DispatchCreate } from "./DispatchCreate";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Context/Layout";
export const Dispatch = () => {
  let history = useNavigate();
    const coloumns = [
        {
          title: "Dispatch Id",
          dataIndex: "dispatch_id",
          key: "dispatch_id",
          sorter: {
            compare: (first, sec) => first.dispatch_id - sec.dispatch_id,
            multiple: 4,
          },
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Start Date",
          dataIndex: "start_date",
          key: "start_date",
          sorter: {
            compare: (first, sec) => first.start_date - sec.start_date,
            multiple: 4,
          },
        },
        {
          title: "Operators",
          dataIndex: "operators",
          key: "operators",
          sorter: {
            compare: (first, sec) => first.operators - sec.operators,
            multiple: 5,
          },
        },
        {
          title: "ORG Code",
          dataIndex: "org_code",
          key: "org_code",
        },
        {
          title: "Approval Requested",
          dataIndex: "approval_requested",
          key: "approval_requested",
         
        },
        {
          title: "Sync Text",
          dataIndex: "sync_text",
          key: "sync_text",
        },
        {
          title: "Process Status",
          dataIndex: "process_status",
          key: "process_status",
          sorter: {
            compare: (first, sec) => first.process_status - sec.process_status,
            multiple: 5,
          },
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record)=>{
              const buttonOnClick = ()=>{
                  console.log("inside action action")
                  history(
                     "/completedispatch"  
                );
              }
              return (
                <div className="flex">
                  <Button
                    type="link"
                    onClick={() => buttonOnClick()}
                    size="large"
                    className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3 mr-3"
                  >
                    <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                    Complete Dispatch
                    </div>
                  </Button>
                </div>
              );
          }
        },
      ];

      // const data = [
      //   {
      //     key: 1,
      //     dispatch_id: "AG00100",
      //     description: "desc101",
      //     start_date: "02/09/2008",
      //     operators: "operators 14",
      //     org_code: "WAHOC0",
      //     approval_requested: "yes",
      //     sync_text: "pending",
      //     process_status: "01",
      //     status: "Approved",
      //     action: "Complete Dispatch",
      //   },
      //   {
      //       key: 2,
      //       dispatch_id: "AG00325",
      //       description: "desc56",
      //       start_date: "06/12/2018",
      //       operators: "operators 29",
      //       org_code: "WAHOC32",
      //       approval_requested: "yes",
      //       sync_text: "checked",
      //       process_status: "03",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      //     {
      //       key: 3,
      //       dispatch_id: "AG00256",
      //       description: "desc479",
      //       start_date: "04/07/2009",
      //       operators: "operators 40",
      //       org_code: "WAHOC400",
      //       approval_requested: "no",
      //       sync_text: "rejected",
      //       process_status: "05",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      //     {
      //       key: 4,
      //       dispatch_id: "AG00420",
      //       description: "desc20",
      //       start_date: "31/02/2020",
      //       operators: "operators 232",
      //       org_code: "WAHOC023",
      //       approval_requested: "yes",
      //       sync_text: "pending",
      //       process_status: "02",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      //     {
      //       key: 5,
      //       dispatch_id: "AG00073",
      //       description: "desc07",
      //       start_date: "12/05/2015",
      //       operators: "operators 21",
      //       org_code: "WAHOC021",
      //       approval_requested: "no",
      //       sync_text: "pending",
      //       process_status: "03",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      //     {
      //       key: 6,
      //       dispatch_id: "AG00173",
      //       description: "desc16",
      //       start_date: "22/04/2016",
      //       operators: "operators 114",
      //       org_code: "WAHOC014",
      //       approval_requested: "yes",
      //       sync_text: "rejected",
      //       process_status: "04",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      //     {
      //       key: 7,
      //       dispatch_id: "AG00132",
      //       description: "desc89",
      //       start_date: "07/07/2017",
      //       operators: "operators 19",
      //       org_code: "WAHOC079",
      //       approval_requested: "yes",
      //       sync_text: "pending",
      //       process_status: "01",
      //       status: "Approved",
      //       action: "Complete Dispatch",
      //     },
      // ];

      useEffect(()=>{
        fetch( "https://62a17273cd2e8da9b0f16c3e.mockapi.io/search/dispatchlist")
        .then((res) => res.json())
        .then((data) => { 
          console.log("printing data inside fetch ",data[0].Data);
          setSearchList(data[0].Data);
          setFilterSearch(data[0].Data);
        })
      },[])
      
      const [searchList, setSearchList] = useState([])
  const [filterSearch, setFilterSearch] = useState([])
  console.log("printing data ", searchList)
  function onChange(pagination, filters, sorter, extra) {
    console.log("here is the params : ", pagination, filters, sorter, extra);
  }
  const handleSearch = (val)=>{
    const datas = val.target.value
    console.log("inside handle search function : ",datas)
    let querry = datas.toLowerCase()
    let result = []
    result = searchList.filter((item)=>{
      return(
        item.dispatch_id.toString().toLowerCase().indexOf(querry) >= 0
      )
    })
    setFilterSearch(result)
  }
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
            <Link to="/dispatchcreate">
              <Button className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3">
                <h3>+ Create Dispatch Notification</h3>
              </Button>
            </Link>
          </div>
        </Col>
        <Col
          span={4}
          pull={16}
          style={{ textAlign: "left", margin: "20px 0 20px 10px" }}
        >
          <h1 className="font-poppins leading-normal" style={{ color: "#8892A5", fontWeight: "400", fontSize: "21px" }}>
          Dispatch Notifications
          </h1>
          <h3 className="font-poppins text-h1 font-medium leading-normal" style={{ color: "#8892A5" }}>
            Manage Dispatch Notification here
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
            icon={<SearchOutlined/>}
            onChange = {handleSearch}
          />
        </Col>
        <Col style={{ textAlign: "center", margin: "20px", padding: "5px" }}>
          <div>
            <Table columns={coloumns} dataSource={filterSearch} onChange={onChange} />
          </div>
        </Col>
      </Row>
    </div>
  </div>
  </Layout>
  )
}
