import {
  EditTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Radio, Row, Spin, Tooltip, Modal } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { stripLeadingZeros } from "../Context/helpers";
import { SearchBox } from "../SearchBox";

export const NotificationsDeviceList = ({
  handleNext,
  handleDeviceSelection,
  ctx,
  data,
  setData,
  query,
  handleEquipmentSearch,
  selectedDevice,
  setQuery,
  setNotifactionData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateNotification, setIsCreateNotification] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const columns = [
    {
      title: "  ",
      dataIndex: "",
      key: "Id",
      type: DataTypes.CUSTOM,
      width: "2vw",
      render: (text, record) => {
        const handleCheckBox = (e, id) => {
            console.log("inside handleCheckBox text ", text);
          handleDeviceSelection(record);
          setNotifactionData(record);
          console.log("inside handleCheckBox data ", data);
          let tempData = data.filter((item) => {
            if (item.Id === id) {
              item.isActive = true;
            } else {
              item.isActive = false;
            }
            return item;
          });
          
          setData(tempData);
        };
        return (
          <div>
            <Radio
              className="radiobox"
              checked={record.isActive}
              onChange={(e) => handleCheckBox(e.target.checked, record.Id)}
            />
          </div>
        );
      },
    },

    {
      title: "Admin No",
      dataIndex: "AdminNo",
      key: "AdminNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
      sorter : true,
    },
    {
      title: "Equipment",
      dataIndex: "EquipmentNo",
      key: "EquipmentNo",
      type: DataTypes.CUSTOM,
      width: "5vw",
      sorter : true,
      render: (text, record) => {
        return `${stripLeadingZeros(record.EquipmentNo)}`;
      },
    },
    {
      title: "Model No",
      dataIndex: "ModelNo",
      key: "ModelNo",
      type: DataTypes.CUSTOM,
      width: "6vw",
      sorter : true,
    },

    {
      title: "Serial No",
      dataIndex: "SerialNo",
      key: "SerialNo",
      type: DataTypes.CUSTOM,
      width: "5vw",
      sorter : true,
    },

    {
      title: "Oper Status",
      dataIndex: "OperStatus",
      key: "OperStatusName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.OperStatus ? (
              <Tooltip placement="topLeft" title={record.OperStatusName}>
                <img
                  src={`/images/icons/api-notifications-icon-${record.OperStatusIcon}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.OperStatusIcon}
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.OperStatusIcon}</span>
          </div>
        );
      },
    },
    {
      title: "Tech Status",
      dataIndex: "TechStatusName",
      key: "TechStatusName",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter : true,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "6vw",
    },
  ];
  
  const resp = [
    {
      key: 1,
      Id : 601,
      Priority : "High",
      Type: "M1",
      DocumentNo: "AG00100",
      CreatedOn : "2020-01-01",
      OperStatus : " - ",
      TechStatus : " sanctioned ",
      AdminNo: "AD00900",
      Description: "desc101",
      Notification: "notif 002",
      TechStatusName: "pending",
      EquipmentNumber: "EQ00100",
      SerialNo: "02",
      SyncCode: "waiting",
    },
    {
      key: 2,
      Priority : "Medium",
      Id : 402,
      Type: "M2",
      CreatedOn : "2018-06-04",
      DocumentNo: "AG00109",
      TechStatus : " rejected ",
      OperStatus : " - ",
      AdminNo: "AD00901",
      Description: "desc121",
      Notification: "notif 010",
      TechStatusName: "aprooved",
      EquipmentNumber: "EQ00153",
      SerialNo: "01",
      SyncCode: "approved",
    },
    {
      key: 3,
      Id : 303,
      Type: "M3",
      Priority : "High",
      CreatedOn : "2003-09-28",
      TechStatus : " sanctioned ",
      DocumentNo: "AG00139",
      OperStatus : " - ",
      AdminNo: "AD00938",
      Description: "desc101",
      Notification: "notif 002",
      TechStatusName: "pending",
      EquipmentNumber: "EQ00100",
      SerialNo: "01",
      SyncCode: "approved",
    },
    {
      key: 4,
      Id : 404,
      Type: "M4",
      Priority : "critical",
      CreatedOn : "2020-12-21",
      DocumentNo: "AG00216",
      OperStatus : " - ",
      TechStatus : " declined ",
      AdminNo: "AD00763",
      Description: "desc244",
      Notification: "notif 209",
      TechStatusName: "aprooved",
      EquipmentNumber: "EQ00287",
      SerialNo: "01",
      SyncCode: "approved",
    },
    {
      key: 5,
      Id : 505,
      Type: "M5",
      DocumentNo: "AG00236",
      CreatedOn : "2022-03-19",
      Priority : "Low",
      OperStatus : " - ",
      TechStatus : " sanctioned ",
      AdminNo: "AD00712",
      Description: "desc237",
      Notification: "notif 269",
      TechStatusName: "pending",
      EquipmentNumber: "EQ00258",
      SerialNo: "02",
      SyncCode: "pending",
    },
    {
      key: 6,
      Id : 606,
      Type: "M6",
      DocumentNo: "AG00583",
      CreatedOn : "2014-07-10",
      Priority : "High",
      TechStatus : " rejected ",
      OperStatus : " - ",
      AdminNo: "AD00478",
      Description: "desc004",
      Notification: "notif 562",
      TechStatusName: "approved",
      EquipmentNumber: "EQ00012",
      SerialNo: "01",
      SyncCode: "approved",
    },
    {
      key: 7,
      Id : 707,
      Type: "M7",
      OperStatus : " - ",
      CreatedOn : "2016-10-31",
      DocumentNo: "AG00547",
      TechStatus : " declined ",
      Priority : "High",
      AdminNo: "AD00493",
      Description: "desc087",
      Notification: "notif 523",
      TechStatusName: "pending",
      EquipmentNumber: "EQ00411",
      SerialNo: "02",
      SyncCode: "pending",
    },
  ];
  const onNext = () => {
    handleNext();
  };

  const handleCheckedUser = () => {
      console.log("checked user ",selectedDevice);
    if (Object.keys(selectedDevice).length) {
        console.log("inside handleCheckedUser ", selectedDevice.id);
      setData(
        data.filter((item) => {
          if (item.Id === selectedDevice.id) {
            item.isActive = true;
          }
          return item;
        })
      );
    }
  };

  const getQueryData = async (val) => {
    setIsLoading(true);
    try {
      const res = resp
      if (res) {
        setIsLoading(false);
        console.log("inside getQuerydata res ", res);
        res.forEach((element) => (element.isActive = false));
        setData(res);
        handleCheckedUser();
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  const debounceFunction = (func) => {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(...args);
      }, 700);
    };
  };

  const debounceOptimized = useCallback(debounceFunction(getQueryData), []);
  console.log("printing selectedDevice is ", selectedDevice);
  return (
    <>
      <div
        style={{ background: "#F3F5F8" }}
        className="content  flex-grow pt-10"
      >
        <div className="container px-7">
        <Row className="">
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <div className="notification-form-left">
                    <div className="form-item">
                      <div className="my-5">
                        <div className="flex flex-col custom-search">
                        <SearchBox
                            value={query}
                            placeholder="Search by Admin No. Serial No. or Description"
                            onChange={(val) => {
                              if (!val) {
                                setData([]);
                                setQuery(null);
                              } else {
                                debounceOptimized(val);
                                handleEquipmentSearch(val);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          {isLoading && ""}
          {data.length > 0 && !isLoading && (
            <DataTable
              // className="bg-transparent deviceListTable "
              columns={columns}
              dataSource={data}
              showActionButton={false}
              onActionButtonClick={(record) => console.log("inside onActionButtonClick record : ",record)}
              actionButtonItemClick={(clickedItem) =>
                setIsCreateNotification(true)
              }
              pagination={false}
              rowKey={"Id"}
            />
          )}
        </div>
      </div>
      <Row
        className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
      >
        <Button
          className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
          // className="bg-blue-text border-0 text-white text-center "
          onClick={() => onNext()}
          disabled={!data.filter((item) => item.isActive).length}
        >
          Next
        </Button>
      </Row>
    </>
  );
};
