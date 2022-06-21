import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Modal, Row, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { Layout } from "../Context/Layout";
import { AppContext } from "../Context/AppContext";
import { SideDrawer } from "../Wizard/SideDrawer";
import { SearchBox } from "../SearchBox";
import NotificationsExpandableView from "./NotificationsExpandableView";
import { WorkInProcessSearch } from "./WorkInProcessSearch";

export const WorkInProcessNotificationList = () => {
  const ctx = useContext(AppContext);
  const searchIcon = {
    backgroundImage:
      'url( {process.env.PUBLIC_URL + "/images/icons/search.svg"})',
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
  };
  // console.log(AppContext);
  const [notificationList, setNotificationList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalUpdate, setIsSuccessModalUpdate] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sortByValue, setSortByValue] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const [offsetValue, setOffsetValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [levelRecord, setLevelRecord] = useState([]);
  const [UpdateModel, setUpdateModel] = useState(false);
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [updateNotificationModel, setUpdateNotificationModel] = useState(false);
  const [updateStatus, seupdateStatus] = useState(0);
  const [notificationTypeList, setNotificationTypeList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortfilterStatus, setSortFilterStatus] = useState(false);
  const [newList, setNewList] = useState([]);
  const [advanceFilterData, setAdvanceFilterData] = useState({
    notificationNumber: "",
    material: "",
    includeCompletedNotifications: "",
    notificationType: "",
    last90Days: true,
    startDate: "",
    endDate: "",
  });
  let material = advanceFilterData?.material;
  let notificationNumber = advanceFilterData?.notificationNumber;
  let includeCompletedNotifications =
    advanceFilterData?.isCompletedNotification;
  let notificationType = advanceFilterData?.searchNotificationType;
  let startDate = advanceFilterData?.date && advanceFilterData.date[0];
  let endDate = advanceFilterData?.date && advanceFilterData.date[1];
  var search1 = searchValue ? searchValue : null;

  useEffect(() => {
    if (isFilterModalVisible === true) {
      setOffsetValue(1);
      setPage(1);
    }
    paginationOnAdvanceFilter();
  }, [
    searchValue,
    currentLevel,
    offsetValue,
    updateStatus,
    advanceFilterData,
    isFilterModalVisible,
  ]);

  useEffect(() => {
    if (!notificationTypeList.length) getNotificationsType();
  }, []);

  const list = [
    {
      AdminNo: "C21",
      Coding: "432",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "06/02/2022 21:58:27",
      DefectGroup: "ICC",
      DefectLocation: "CAB",
      Description: "Run through 2 - 6.2.22",
      EquipmentNo: "000000001011212081",
      Id: "50573f18-9a32-42e8-bf89-53e6a6afaf00",
      InProcess: 1,
      ModelNo: "M2A3",
      ParentId: "affaf38f-92f5-45ce-bbb8-1083fa6de559",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "remark2 6.2.22",
      SerialNo: "2AGR0683Y",
      Status: 1,
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0005",
      TechStatusIcon: "X",
      TechStatusName: "X-X-NMC",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-06-04 12:19:08",
      WorkOrderNo: "affaf38f-92f5-45ce-bbb8-1083",
      Notification: "656",
    },
    {
      AdminNo: "C21",
      Coding: "777",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "06/02/2022 21:53:39",
      DefectGroup: "BCP",
      DefectLocation: "10K",
      Description: "Notification desc Run through 6.2.22",
      EquipmentNo: "000000001011212081",
      Id: "788fd306-eac1-4b24-9c33-a83fa1913a79",
      InProcess: 1,
      Material: "014360005",
      ModelNo: "M2A3",
      NotifTime: "21:53:39",
      OrgCode: "WAH0C0",
      ParentId: "affaf38f-92f5-45ce-bbb8-1083fa6de559",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "Notification Remarks Run through 6.2.22",
      SerialNo: "2AGR0683Y",
      StartDate: "20220602",
      Status: 1,
      StorageLoc: "CEPA",
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0003",
      TechStatusIcon: "BIO",
      TechStatusName: "BIO-Biological Cont",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-06-04 12:18:49",
      WorkOrderNo: "affaf38f-92f5-45ce-bbb8-1083",
      Notification: "222",
    },
    {
      AdminNo: "C11",
      Coding: "680",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 05:33:09",
      DefectGroup: "AMG",
      DefectLocation: "AMH",
      Description: "steve class changes 5.9",
      EquipmentNo: "000000001011212104",
      Id: "a83e19f5-0ad9-43b3-a2fc-dab78190dbb4",
      InProcess: 1,
      Material: "014360005",
      ModelNo: "M2A3",
      NotifTime: "05:33:09",
      OrgCode: "WAH0C0",
      ParentId: "172514af-e10a-48bb-8432-01b07445b0b9",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 3,
      ProcessStatusName: "Completed",
      Remarks: "steve class changes 5.9 remarks",
      SerialNo: "2AGR0666Y",
      StartDate: "20220509",
      Status: 1,
      StorageLoc: "CEPB",
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0003",
      TechStatusIcon: "BIO",
      TechStatusName: "BIO-Biological Cont",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 05:36:38",
      WorkOrderNo: "172514af-e10a-48bb-8432-01b0",
      Notification: "116",
    },
    {
      AdminNo: "WAH0C0-",
      Coding: "777",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 04:47:55",
      DefectGroup: "AMG",
      DefectLocation: "DPM",
      Description: "steve test 5.8",
      EquipmentNo: "000000001011182894",
      Id: "1b9b62a1-6d9a-482b-9181-7ab38920556d",
      InProcess: 1,
      Material: "009739533",
      ModelNo: "24",
      NotifTime: "04:47:55",
      OrgCode: "WAH0C0",
      ParentId: "a2d5e68b-2fed-4385-bc55-a5cc7c39b85d",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "steve test 5.8 remarks",
      SerialNo: "356405U",
      StartDate: "20220509",
      Status: 1,
      StorageLoc: "CEP8",
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0007",
      TechStatusIcon: "CX",
      TechStatusName: "CX-Circle X",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-06-06 00:51:39",
      WorkOrderNo: "1234",
      Notification: "8100",
    },
    {
      AdminNo: "UIC   -",
      CauseCode: "115",
      Coding: "360",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 04:37:16",
      DefectGroup: "",
      DefectLocation: "",
      Description: "test",
      EquipmentNo: "000000001016587025",
      Id: "2f4c5032-aa12-4c43-a790-cf9435c1cefd",
      ModelNo: "",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "test",
      SerialNo: "010520",
      Status: 1,
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0006",
      TechStatusIcon: "E",
      TechStatusName: "E-Admin Deadline",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:37:43",
      Notification: "008",
    },
    {
      AdminNo: "WAH0C0-",
      CauseCode: "099",
      Coding: "777",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 03:19:26",
      DefectGroup: "",
      DefectLocation: "",
      Description: "tech statsus",
      EquipmentNo: "000000001011202839",
      Id: "9779c4f5-cac7-40fe-bc11-74b5af9cdaaa",
      ModelNo: "",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "tech statsus",
      SerialNo: "109516",
      Status: 1,
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0001",
      TechStatusIcon: "TICL",
      TechStatusName: "TICL-TI Cleared",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:36:17",
      Notification: "322",
    },
  ];

  const getNotificationList = async (
    searchBy = searchValue,
    sortBy = sortByValue,
    orderBy = orderByValue,
    offset = offsetValue,
    limit = pageSize
  ) => {
    let queryParams = {
      level: currentLevel,
      orgId: currentLevel === 1 ? null : levelRecord[currentLevel - 2].id,
      search: searchBy,
      sortBy: sortBy,
      orderBy: orderBy,
      offset: offset,
      limit: limit,
      UseAdvancedFilter: true,
      IncludeCompletedNotifications: true,
      NotificationNumber: advanceFilterData?.notificationNumber ? advanceFilterData.notificationNumber : null,
      Material: advanceFilterData?.material,
      NotificationType: advanceFilterData?.searchNotificationType,
      Last90Days: advanceFilterData?.dateRange,
      StartDate: `${
        advanceFilterData?.startDate && advanceFilterData.startDate
      }`,
      EndDate: `${advanceFilterData?.endDate && advanceFilterData.endDate}`,
    };
    // const response = list;
    // console.log("printing response in getNotificationList", response);
    // console.log("printing search1 inside getNotificationList ",search1)
    // var newList = response.filter((item) => {
    //   return item.Notification.indexOf(search1) > -1;
    // });

    // var newFilterList = response.filter((item)=>{
    //     return item.Notification.toLowerCase().indexOf(queryParams.NotificationNumber) > -1

    //   })
    //   console.log("printing queryParams.NotificationNumber ",notificationNumber)

    //   if (search1 === undefined && notificationNumber.length > 0 &&  response) {
    //       console.log("inside if condition ")
    //     console.log("printing newFilterList ", newFilterList);
    //     setNotificationList(newFilterList);
    //     setTotalNotifications(newFilterList.length);
    //   }
    //   else if(search1 !== undefined && notificationNumber.length === 0 && response ) {
    //     console.log("inside else if condition ")
    //     console.log("printing newList ", newList);
    //     setNotificationList(newList);
    //     setTotalNotifications(newList.length);
    //   }
    //   else{
    //     console.log("inside else condition ")
    //     setNotificationList( response);
    //     setTotalNotifications(response.length);
    //   }

    fetch( "https://62a17273cd2e8da9b0f16c3e.mockapi.io/search/notify")
      .then((res) => res.json())
      .then((data) => {
        // console.log("printing queryParams in getNotificationList ", queryParams);
        console.log("printing api data in getNotificationList ", data);
        setNewList(data);
      });
      console.log("printing newList in getNotificationList ", newList);

      var newData = newList.filter((item) => {
        return item.Notification.indexOf(search1) > -1;
      })

      console.log("printing queryParams.search in getNotificationList ", search1);
      if(search1 !== null && newList){
        console.log("inside if condition ")
        setNotificationList(newData);
        setTotalNotifications(newData.length);
      }
      else{
        console.log("inside else condition ")
        setNotificationList(newList);
        setTotalNotifications(newList.length);
      }
  };

  const paginationOnAdvanceFilter = () => {
    var filterStatus = false;
    if (
      (typeof material === "undefined" ||
        material === "" ||
        material === null) &&
      (typeof notificationNumber === "undefined" ||
        notificationNumber === "" ||
        notificationNumber === null) &&
      typeof includeCompletedNotifications === "undefined" &&
      typeof notificationType === "undefined" &&
      typeof startDate === "undefined" &&
      typeof endDate === "undefined"
    ) {
    } else if (
      startDate & endDate &&
      typeof (
        material === "undefined" ||
        material === "" ||
        material === null
      ) &&
      typeof (
        notificationNumber === "undefined" ||
        notificationNumber === "" ||
        notificationNumber === null
      ) &&
      typeof (
        includeCompletedNotifications === false ||
        typeof includeCompletedNotifications === "undefined"
      ) &&
      typeof (notificationType === "undefined")
    ) {
    } else if (
      typeof includeCompletedNotifications === "undefined" &&
      notificationType !== "" &&
      search1 !== ""
    ) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else if (
      includeCompletedNotifications === true &&
      notificationType !== "" &&
      search1 !== ""
    ) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else if (search1) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else {
      filterStatus = true;
      setSortFilterStatus(true);
    }
    getNotificationList(
      searchValue,
      sortByValue,
      orderByValue,
      offsetValue,
      pageSize,
      filterStatus
    );
  };

  const priorityObject = {
    1: <span className="opacity-border-red">High (X)</span>,
    2: <span className="opacity-border-orange">Medium</span>,
    3: <span className="opacity-border-green">Low</span>,
  };
  const syncStatusObj = {
    3: <span className="status-border-failed">Failed</span>,
    1: <span className=" status-border-process ">In process</span>,
    2: <span className=" status-border-success ">Success</span>,
  };
  const columns = [
    {
      title: "Equipment",
      dataIndex: "EquipmentNo",
      key: "EquipmentNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Notification",
      dataIndex: "Notification",
      key: "Notification",
      type: DataTypes.CUSTOM,
      width: "9vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      type: DataTypes.CUSTOM,
      width: "5vw",
      sorter: true,
      sortType: "Type",
      render: (text, record) => {
        return (
          <div>
            {record.TypeName ? (
              <Tooltip placement="topLeft" title={record.TypeName}>
                {record.Type}
              </Tooltip>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "10vw",
    },
    {
      title: "Main Work CTR",
      dataIndex: "ModelNo",
      key: "ModelNo",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: false,
    },
    {
      title: "Notif. Date",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      type: DataTypes.DATE,
      width: "8vw",
      sorter: false,
    },
    {
      title: "INSP No.",
      dataIndex: "TechStatus",
      key: "TechStatus",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "Order",
      dataIndex: "WorkOrderNo",
      key: "WorkOrderNo",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
  ];

  const clearFilter = () => {
    setIsFilterModalVisible(false);
    setAdvanceFilterData("");
    setSortByValue(false);
    setOffsetValue(1);
    setPage(1);
    setSortFilterStatus(false);
  };

  const cancel = () => {
    setIsFilterModalVisible(false);
    //setOffsetValue(1);
    //setPage(1);
  };

  const notificationtypelist = [
    {
      Id: "CE",
      Value: "CE-Controlled Exchange",
    },
    {
      Id: "M1",
      Value: "M1-Maintenance Request",
    },
    {
      Id: "ML",
      Value: "ML-MEL-MaintExpLimit",
    },
    {
      Id: "MW",
      Value: "MW-MWO Modification WO",
    },
    {
      Id: "O1",
      Value: "O1-Oil Sample Request",
    },
    {
      Id: "O2",
      Value: "O2-Oil Sample Action",
    },
    {
      Id: "PM",
      Value: "PM-Preventive Maint Due",
    },
    {
      Id: "Z1",
      Value: "Z1-copy w/ref",
    },
  ];
  const getNotificationsType = async () => {
    if (notificationTypeList.length) return notificationTypeList;

    const response = notificationtypelist;
    if (response) {
      console.log(response);
      setNotificationTypeList(response);
      return response;
    }
  };

  const notificationsInputs = [
    {
      label: "Notification No.",
      variable: "notificationNumber",
      type: "customInput",
    },
    {
      label: "Material",
      variable: "material",
      type: "customInput",
    },
    {
      label: "Notification Type",
      variable: "searchNotificationType",
      type: "selectDropDown",
      dropDownOptions: !notificationTypeList.length
        ? getNotificationsType()
        : notificationTypeList,
    },
    {
      label: "Date range",
      variable: "dateRange",
      type: "dateRange",
    },
  ];

  let history = useNavigate();

  useEffect(() => {
    if (
      history?.location?.state?.selectedEquipment ||
      history?.location?.state?.startFlow
    ) {
      setIsModalVisible(true);
    }
  }, []);

  const showFilterPopup = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    return (
      <WorkInProcessSearch
        advanceFilterData={advanceFilterData}
      ></WorkInProcessSearch>
    );
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <div style={searchIcon}>
          <div className="flex custom-search">
            <SearchBox
              placeholder={"Search"}
              searchOnModule={"Material"}
              onChange={(value) => {
                setSearchValue(value);
                getNotificationList();
              }}
              className="border border-red-800"
            />
          </div>
        </div>

        <div className="my-auto">
          <Button
            className="pl-2"
            onClick={(value) => {
              showFilterPopup(value);
            }}
            type="link"
          >
            <div className="flex">
              <img src={"/images/icons/filter.svg"} alt="filter" />
              <span className="text-h1 font-medium text-regent-gray ml-2">
                Filter
              </span>
            </div>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        dataSource={notificationList}
        showActionButton={false}
        rowKey={"Id"}
        showViewMoreExpandable={true}
        expandIconColumnIndex={8}
        expandableView={NotificationsExpandableView}
        pagination={false}
        totalRecords={totalNotifications}
        Checkbox={Checkbox}
        pageSize={pageSize}
        currentPage={page}
        onChange={(pageSizeOptions, filterOptions, sorterOptions) => {
          let sortOrderValue = "";
          if (sorterOptions && sorterOptions.order) {
            sortOrderValue = sorterOptions.order === "ascend" ? "ASC" : "DESC";
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
      {isFilterModalVisible && (
        <SideDrawer
          showModal={true}
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar custom-width-modal animate-right"
          hideCui={true}
          hideCancel={true}
        >
          <WorkInProcessSearch
            advanceFilterData={advanceFilterData}
            handleClose={clearFilter}
            cancel={cancel}
            setIsFilterModalVisible={setIsFilterModalVisible}
            setAdvanceFilterData={setAdvanceFilterData}
            inputs={notificationsInputs}
          />
        </SideDrawer>
      )}
    </>
  );
};
