import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Card, Radio, Checkbox, Tooltip, Spin } from "antd";
import {
  EditTwoTone,
  LoadingOutlined,
  WarningTwoTone,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory, useNavigate } from "react-router-dom";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { SearchBox } from "../SearchBox";
import { AppContext } from "../Context/AppContext";

export const WorkOrderAddNotification = ({
  selectedDevice,
  value,
  handlePrev,
  current,
  handleClose,
  getDeviceList,
  handleCreate,
  handleNext,
  handleSelectedNotification,
  selectedNotification,
  notificationList,
  setNotificationList,
  setSelectedRowKeys,
  selectedRowKeys,
}) => {
  const ctx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [offsetValue, setOffsetValue] = useState(1);
  const [currentRow, setCurrentRow] = useState(null);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const history = useNavigate();

  const initialValues = {
    ordCode: value?.OrgCode,
    adminNo: value?.AdminNo,
    description: "",
    type: null,
    modelNo: value?.ModelNo,
    serialNo: value?.SerialNo,
    equipmentNo: history?.location?.state?.equipmentId || value?.EquipmentNo,
    priority: null,
    operStatus: value?.OperStatus,
    techStatus: null,
    defectLocation: "",
    defectGroup: "",
    storageLoc: value?.StorageLoc,
    causeCode: null,
    inProgress: 0,
    remarks: "",
    material: value?.Material,
  };
  const priorityObject = {
    1: <span className="opacity-border-red">High (X)</span>,
    2: <span className="opacity-border-orange">Medium</span>,
    3: <span className="opacity-border-green">Low</span>,
  };
  console.log("printing selectedDevice AddNotification ", selectedDevice);
  const getNotificationList = async () => {
    let queryParams = {
      id: initialValues.equipmentNo,
      sortBy: sortByValue,
      orderBy: orderByValue,
      offset: offsetValue,
      search: searchValue,
      limit: pageSize,
    };
    setIsLoading(true);
    const response = resp
    console.log("inside getNotificationList response : ", response);
    if (response) {
      let notificationList =
        response &&
        response &&
        response.filter((n) => !n.ParentId).map((item, index) => {
          let notificationData = { ...item, key: item.Id };
          return notificationData;
        });
      setNotificationList(notificationList);
      setTotalNotifications(notificationList.length);
      setIsLoading(false);
      //handleCheckedUser();
    }
  };
  const resp = [
    {
      key: 1,
      Id : 1,
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
      EquipmentNo : 24400 ,
      SerialNo: "02",
      SyncCode: "waiting",
    },
    {
      key: 2,
      Priority : "Medium",
      Id : 2,
      Type: "M2",
      CreatedOn : "2018-06-04",
      EquipmentNo : 20844 ,
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
      Id : 3,
      Type: "M3",
      EquipmentNo : 877001 ,
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
      Id : 4,
      Type: "M4",
      Priority : "critical",
      EquipmentNo : 344900 ,
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
      Id : 5,
      Type: "M5",
      DocumentNo: "AG00236",
      EquipmentNo : 344900 ,
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
      Id : 6,
      Type: "M6",
      DocumentNo: "AG00583",
      EquipmentNo : 178000 ,
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
      Id : 7,
      Type: "M7",
      OperStatus : " - ",
      EquipmentNo : 123340 ,
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

  const columns = [
    {
      title: "NOTIFICATION",
      dataIndex: "DocumentNo",
      type: DataTypes.CUSTOM,
      width: "8vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "TYPE",
      dataIndex: "Type",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
    {
      title: "Oper Status",
      dataIndex: "OperStatus",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.OperStatus ? (
              <Tooltip placement="topLeft" title={record.OperStatusName}>
                <img
                  src={`/images/icons/api-notifications-icon-${record.OperStatus}.svg`}
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
      dataIndex: "TechStatus",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.TechStatus ? (
              <Tooltip placement="topLeft" title={record.TechStatusName}>
                <img
                  src={`/images/icons/api-notifications-icon-${record.TechStatusIcon}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.TechStatusIcon}
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.TechStatus}</span>
          </div>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => priorityObject[record.Priority],
    },
    {
      title: "DESCRIPTION",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "7vw",
    },
    {
      title: "START DATE",
      dataIndex: "CreatedOn",
      type: DataTypes.DATE,
      width: "9vw",
    },
    {
      title: "EQUIPMENT",
      dataIndex: "EquipmentNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
    },
  ];

  useEffect(() => {
    getNotificationList();
  }, []);

  const handleSelect = (record, selected) => {
    console.log(record, "record");
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.key]);
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const toggleSelectAll = () => {
    setSelectedRowKeys((keys) =>
      keys.length === notificationList.length
        ? []
        : notificationList.map((r) => r.key)
    );
  };
  console.log("printing selectedRowKeys AddNotification ", selectedRowKeys);
  handleSelectedNotification(selectedRowKeys);

  const headerCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length}
      indeterminate={
        selectedRowKeys.length > 0 &&
        selectedRowKeys.length < notificationList.length
      }
      onChange={toggleSelectAll}
    />
  );
  const rowSelection = {
    selectedRowKeys,
    type: "checkbox",
    fixed: true,
    onSelect: handleSelect,
    columnTitle: headerCheckbox,
  };

  const onNext = () => {
    handleNext();
  };
  const NotFoundContent = () => {
    return (
      <div className="m-40 text-center">
        {
          // <h6>No notification found</h6>
          // isLoading ? "Loading...": <h6>No notification found</h6>
          isLoading ? <Spin /> : <h6>No notification found</h6>
        }
      </div>
    );
  };
  return (
    <>
      <div
        style={{ background: "#F3F5F8" }}
        className="content  flex-grow pt-10"
      >
        <Row>
          <Col span={1}></Col>
          <Col span={20}>
            <div>
              <Card
                style={{ background: "#F3F5F8" }}
                className="p-0  modal-table-wrapper"
              >
                <DataTable
                  className=" "
                  rowSelection={{ ...rowSelection }}
                  rowKey={"Id"}
                  columns={columns}
                  dataSource={notificationList}
                  showActionButton={false}
                  onActionButtonClick={(record) => setCurrentRow(record.Id)}
                  pageSize={pageSize}
                  pagination={true}
                  totalRecords={totalNotifications}
                  currentPage={page}
                  Checkbox={Checkbox}
                  noDataFound={NotFoundContent}
                  onChange={(pageSizeOptions, filterOptions, sorterOptions) => {
                    let sortOrderValue = "";
                    if (sorterOptions && sorterOptions.order) {
                      sortOrderValue =
                        sorterOptions.order === "ascend" ? "ASC" : "DESC";
                      setOrderByValue(sortOrderValue);
                      setSortByValue(sorterOptions.columnKey);
                    }
                    setOffsetValue(pageSizeOptions.current);
                    setPage(pageSizeOptions.current);
                    setPageSize(pageSizeOptions.pageSize);
                    getNotificationList(
                      searchValue,
                      sorterOptions.columnKey,
                      sortOrderValue,
                      pageSizeOptions.current,
                      pageSizeOptions.pageSize
                    );
                  }}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Row
        className={`notification-footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
      >
        <Button
          className="p-5 flex items-center  border-regent-gray rounded-lg  botton_text_gray"
          type="link"
          onClick={() => handlePrev()}
        >
          Previous
        </Button>
        {notificationList.length > 0 && (
          <Button
            onClick={() => onNext()}
            disabled={selectedRowKeys.length === 0}
            className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 ml-28"
          >
            Next
          </Button>
        )}
      </Row>
    </>
  );
};
