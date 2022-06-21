import { Button, Checkbox, Col, Modal, Row, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { AppContext } from "../Context/AppContext";
import { SideDrawer } from "../Wizard/SideDrawer";
import { WorkInProcessSearch } from "./WorkInProcessSearch";
import { SearchBox } from "../SearchBox";
import WorkOrdersExpandableView from "./WorkOrdersExpandableView";

export const WorkInProcessWorkOrderList = () => {
  const ctx = useContext(AppContext);
  const searchIcon = {
    backgroundImage:
      'url( {process.env.PUBLIC_URL + "/images/icons/search.svg"})',
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
  };

  const [workOrderList, setWorkOrderList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSuccessModalUpdate, setIsSuccessModalUpdate] = useState(false);
  const [isSuccessModalDelete, setIsSuccessModalDelete] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [totalWorkOrders, setTotalWorkOrders] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sortByValue, setSortByValue] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const [offsetValue, setOffsetValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [levelRecord, setLevelRecord] = useState([]);
  const [isDeleteModal, setisDeleteModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [error, setError] = useState(null);
  const [UpdateModel, setUpdateModel] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("0");

  const [workOrderPayload, setWorkOrderPayload] = useState(null);
  const [editeVlues, setEditValues] = useState([]);
  const [updateWorkOrderModel, setUpdateWorkOrderModel] = useState(false);
  const [updateStatus, seupdateStatus] = useState(0);
  const [workOrderTypeList, setWorkOrderTypeList] = useState([]);

  const [page, setPage] = useState(1);
  const [sortfilterStatus, setSortFilterStatus] = useState(false);
  const [newList , setNewList] = useState([]);
  const [advanceFilterData, setAdvanceFilterData] = useState({
    workOrderNumber: "",
    material: "",
    includeCompletedWorkOrders: "",
    workOrderType: "",
    last90Days: true,
    startDate: "",
    endDate: "",
  });

  let material = advanceFilterData?.material;
  let workOrderNumber = advanceFilterData?.workOrderNumber;
  let includeCompletedWorkOrders = advanceFilterData?.isCompletedWorkorder;
  let workOrderType = advanceFilterData?.searchWorkOrderType;
  let startDate = advanceFilterData?.date && advanceFilterData.date[0];
  let endDate = advanceFilterData?.date && advanceFilterData.date[1];
  var search1 = searchValue && searchValue;

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
    setPage(1);
    setOffsetValue(1);
    getWorkOrderList();
  }, [sortByValue, orderByValue]);

  const list = [
    {
      AdminNo: "WAH0C0-C14M500",
      CFC: "",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "06/03/2022 10:28:40",
      Description: "Test 5.4.22 03",
      DocumentNo: "CFT-110",
      EquipmentNumber: "000000001011180617",
      Id: "35d3626d-0916-4f73-b469-f3a28db9ab00",
      NotificationIds: ["f4d26cea-d17e-43bc-b1c8-ae66551875bf"],
      OperStatusIcon: "NMCM",
      OperStatusName: "NMCM-NMC-Maint",
      OrderPriority: "",
      OrgCode: "WAH0C0",
      ParentId: "",
      Plant: "",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "",
      ReleasedFlag: "",
      SerialNo: "T342272",
      StartDate: "20220603",
      Status: 1,
      StorageLocation: "CEP8",
      SyncCode: 2,
      SyncText: "Pending",
      SystemCondition: "6",
      TechStatusIcon: "",
      TechStatusName: "",
      TechnicallyComplete: "",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-06-03 10:28:40",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
    {
      AdminNo: "C21",
      CFC: "E6",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "06/02/2022 22:04:05",
      Description: "Notification desc Run through 6.2.22",
      DocumentNo: "TSP-080",
      EquipmentNumber: "000000001011212081",
      FinishDate: "",
      Id: "affaf38f-92f5-45ce-bbb8-1083fa6de559",
      NotificationIds: (2)[
        ("50573f18-9a32-42e8-bf89-53e6a6afaf00",
        "788fd306-eac1-4b24-9c33-a83fa1913a79")
      ],
      OperStatusIcon: "NMCM",
      OperStatusName: "NMCM-NMC-Maint",
      OrderPriority: "E07",
      OrgCode: "WAH0C0",
      Plant: "",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "04C",
      SerialNo: "2AGR0683Y",
      StartDate: "20220602",
      Status: 1,
      StorageLocation: "CEPA",
      SyncCode: 2,
      SyncText: "Pending",
      SystemCondition: "3",
      TechStatusIcon: "",
      TechStatusName: "",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-06-03 01:50:05",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
    {
      AdminNo: "C11",
      CFC: "B6",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 05:33:45",
      Description: "test notif",
      DocumentNo: "NPC-899",
      EquipmentNumber: "000000001011212104",
      FinishDate: "",
      Id: "172514af-e10a-48bb-8432-01b07445b0b9",
      NotificationIds: (3)[
        ("3617f441-6263-4c3c-ba88-07420f1628a0",
        "41fb748f-ffe9-4134-8f1e-e3e305c36a07",
        "a83e19f5-0ad9-43b3-a2fc-dab78190dbb4")
      ],
      OperStatusIcon: "NMCS",
      OperStatusName: "NMCS-NMC-Supply",
      OrderPriority: "E21",
      OrgCode: "WAH0C0",
      Plant: "",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "04F",
      SerialNo: "2AGR0666Y",
      StartDate: "20220509",
      Status: 1,
      StorageLocation: "CEPB",
      SyncCode: 2,
      SyncText: "Pending",
      SystemCondition: "S",
      TechStatusIcon: "",
      TechStatusName: "",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 12:27:56",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
    {
      AdminNo: "WAH0C0-",
      CFC: "E6",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/09/2022 04:48:39",
      Description: "steve test 5.8",
      DocumentNo: "CAT-339",
      EquipmentNumber: "000000001011182894",
      Id: "a2d5e68b-2fed-4385-bc55-a5cc7c39b85d",
      NotificationIds: ["1b9b62a1-6d9a-482b-9181-7ab38920556d"],
      OperStatusIcon: "NMCM",
      OperStatusName: "NMCM-NMC-Maint",
      OrderPriority: "N01",
      OrgCode: "WAH0C0",
      ParentId: "",
      Plant: "",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "04G",
      ReleasedFlag: "",
      SerialNo: "356405U",
      StartDate: "20220509",
      Status: 1,
      StorageLocation: "CEP8",
      SyncCode: 2,
      SyncText: "Pending",
      SystemCondition: "1",
      TechStatusIcon: "",
      TechStatusName: "",
      TechnicallyComplete: "",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:48:39",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
    {
      AdminNo: "T502",
      CFC: "H1",
      CreatedBy: "SapService",
      CreatedOn: "05/05/2022 00:00:00",
      Description: "Need Tires",
      DocumentNo: "AFSPA-100",
      EquipmentNumber: "000000001033488918",
      FinishDate: "0000-00-00",
      Id: "9c33be04-719e-4c1c-99e9-3b720efbd5b5",
      NotificationIds: [],
      OperStatusIcon: "NMCM",
      OperStatusName: "NMCM-NMC-Maint",
      OrderPriority: "N01",
      OrgCode: "WAH0C0",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "",
      ReleasedFlag: "0",
      SerialNo: "DISCOPS02",
      StartDate: "2022-05-05",
      Status: 1,
      SyncCode: 3,
      SystemCondition: "A",
      TechStatusIcon: "",
      TechStatusName: "",
      TechnicallyComplete: "0",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:31:47",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
    {
      AdminNo: "C22",
      CFC: "H1",
      CreatedBy: "SapService",
      CreatedOn: "05/02/2022 00:00:00",
      Description: "Unserviceable track pads",
      DocumentNo: "AFSPA-454",
      EquipmentNumber: "000000001011212034",
      FinishDate: "2022-05-03",
      Id: "84202d0c-fd4b-4a72-a892-6b2b491eeeb9",
      NotificationIds: [],
      OperStatusIcon: "FMC",
      OperStatusName: "FMC-Fully Mission Capable",
      OrderPriority: "",
      OrgCode: "WAH0C0",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProjectCode: "",
      ReleasedFlag: "1",
      SerialNo: "2AGR0651Y",
      StartDate: "2022-05-03",
      Status: 1,
      SyncCode: 3,
      SystemCondition: "A",
      TechStatusIcon: "",
      TechStatusName: "",
      TechnicallyComplete: "0",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:31:29",
      WorkCenter: "WAH0C0",
      WorkOrderType: "PM01",
    },
  ];
  const workordertypelist = [
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

  const getWorkOrderList = async (
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
      WorkOrderNumber: advanceFilterData?.workOrderNumber,
      Material: advanceFilterData?.material,
      WorkOrderType: advanceFilterData?.workOrderType,
      // Last90Days: advanceFilterData?.dateRange,
      StartDate: `${advanceFilterData?.date && advanceFilterData.date[0]}`,
      EndDate: `${advanceFilterData?.date && advanceFilterData.date[1]}`,
    };
    fetch("https://62a17273cd2e8da9b0f16c3e.mockapi.io/search/notify")
    .then(res => res.json())
    .then(data => { 
      setNewList(data);
      // setWorkOrderList(data);
      // setTotalWorkOrders(data.length);
      console.log("printing api data in getWorkOrderList", data);
    })

    var newData = newList.filter((item) => {
      return item.DocumentNo.indexOf(search1) > -1;
    })
   
    if(search1 !== undefined &&  newList){
      setWorkOrderList(newData);
      setTotalWorkOrders(newData.length);
    }
    else{
      console.log("inside else condition ")
      setWorkOrderList(newList);
      setTotalWorkOrders(newList.length);
    }

  };

  const paginationOnAdvanceFilter = () => {
    var filterStatus = false;
    if (
      (typeof material === "undefined" ||
        material === "" ||
        material === null) &&
      (typeof workOrderNumber === "undefined" ||
        workOrderNumber === "" ||
        workOrderNumber === null) &&
      typeof includeCompletedWorkOrders === "undefined" &&
      typeof workOrderType === "undefined" &&
      typeof startDate === "undefined" &&
      typeof endDate === "undefined"
    ) {
    } else if (
      typeof includeCompletedWorkOrders === "undefined" &&
      typeof workOrderType === "undefined"
    ) {
    } else if (
      typeof includeCompletedWorkOrders === "undefined" &&
      workOrderType !== "" &&
      search1 !== ""
    ) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else if (
      includeCompletedWorkOrders === true &&
      workOrderType !== "" &&
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
    getWorkOrderList(
      searchValue,
      sortByValue,
      orderByValue,
      offsetValue,
      pageSize,
      filterStatus
    );
  };

  const deleteModel = async (clickedItem) => {
    try {
      if (clickedItem.props.children.match("Close")) {
        await setisDeleteModal(true);
      }
      if (clickedItem.props.children.match("Change")) {
        setUpdateModel(true);
        const editiData1 = workOrderList.filter((n) => {
          return n.Id === currentRow;
        });
        const editiData = editiData1.map((Item) => {
          return { ...Item, id: currentRow };
        });
        setEditValues(editiData);
        history({
          pathname: "/workOrder/details",
          state: history.location.state,
          id: editiData[0].Id,
        });
      }
    } catch (err) {}
  };

  const deleteWorkOrder = async () => {
    let id = currentRow && currentRow;
    if (id) {
      try {
        setIsLoading(true);
        const response = await ctx.HttpDelete("/workOrder", { id });
        if (response) {
          setIsLoading(false);
          setisDeleteModal(false);
          setWorkOrderPayload(response);
          if (updateStatus === 1) {
            seupdateStatus(0);
          } else {
            seupdateStatus(1);
          }
          setIsSuccessModalDelete(true);
        } else {
          setIsLoading(false);
          setWorkOrderPayload(null);
          setIsSuccessModalDelete(true);
        }
      } catch (err) {}
    } else {
      // setWorkOrderPayload(null);
      setisDeleteModal(false);
    }
  };

  const priorityObject = {
    1: <span className="opacity-border-red">High (X)</span>,
    2: <span className="opacity-border-orange">Medium</span>,
    3: <span className="opacity-border-green">Low</span>,
  };
  const operObject = {
    FMC: "/images/icons/api-notifications-icon-fmc.svg",
    NMCM: "/images/icons/api-notifications-icon-nmcm.svg",
    NMCS: "/images/icons/api-notifications-icon-nmcs.svg",
  };
  const syncStatusObj = {
    3: <span className="status-border-failed">Failed</span>,
    1: <span className=" status-border-process ">In process</span>,
    2: <span className=" status-border-success ">Success</span>,
  };

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

  const columns = [
    {
      title: "Order No.",
      dataIndex: "DocumentNo",
      key: "DocumentNo",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
    {
      title: "Order Type",
      dataIndex: "AdminNo",
      key: "AdminNo",
      type: DataTypes.CUSTOM,
      width: "7vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Order Desc.",
      dataIndex: "OperStatus",
      key: "OperStatusName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.OperStatus ? (
              <Tooltip placement="topLeft" title={record.OperStatus}>
                <img
                  src={operObject[record.OperStatus]}
                  className="w-1/6 mr-2"
                  alt="record.OperStatus"
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.OperStatus}</span>
          </div>
        );
      },
    },
    {
      title: "material no.",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "SYNC STATUS",
      dataIndex: "InProgress",
      key: "InProgress",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.InProgress ? syncStatusObj[record.InProgress] : "-"}
          </div>
        );
      },
    },
    {
      title: "PRIORITY",
      dataIndex: "Priority",
      key: "PriorityName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => priorityObject[record.Priority],
    },
    {
      title: "PRIORITY type",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: " Equip work ctr",
      dataIndex: "SerialNo",
      key: "SerialNo",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "Equipment no.",
      dataIndex: "EquipmentNumber",
      key: "EquipmentNumber",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
    {
      title: "Model no. no.",
      dataIndex: "EquipmentNumber",
      key: "EquipmentNumber",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
  ];

  let actionButtonItems = [
    <span className="p-2">Change</span>,
    <span className="p-2">Close</span>,
  ];
  const handleWorkOrderUpdate = async (payload) => {
    if (workOrderPayload) {
      setIsLoading(true);
      try {
        const response = await ctx.HttpPut("/WorkOrder", workOrderPayload);
        if (response) {
          setIsLoading(false);
          //setUpdateModel(false);
          setUpdateWorkOrderModel(false);
          setWorkOrderPayload(response);
          setIsSuccessModalUpdate(true);
          if (updateStatus === 1) {
            seupdateStatus(0);
          } else {
            seupdateStatus(1);
          }
        } else {
          setIsLoading(false);
          setUpdateModel(false);
          setUpdateWorkOrderModel(false);
          setWorkOrderPayload(null);
        }
      } catch (err) {}
    } else {
      setWorkOrderPayload(payload);
      setUpdateModel(true);
    }
  };

  const NotFoundContent = () => {
    return (
      <div className="m-40 text-center">
        <h6>No equipment has been added yet</h6>
        <Button
          className="ant-btn ant-btn-link ant-btn-lg py-0 inline-flex items-center border border-daisy-bush bg-athens-gray rounded-md px-3 m-2"
          onClick={() => history("/workOrder/EquipmentAdd")}
        >
          <PlusOutlined />
          Create Work Order
        </Button>
      </div>
    );
  };

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
  };
  const showFilterPopup = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    setSortFilterStatus(!sortfilterStatus);
    return (
      <WorkInProcessSearch
        advanceFilterData={advanceFilterData}
      ></WorkInProcessSearch>
    );
  };

  let history = useNavigate();

  const getWorkOrderType = async () => {
    if (workOrderTypeList.length) return workOrderTypeList;

    const response = workordertypelist;
    if (response) {
      console.log("printing response inside getWorkOrderType ", response);
      setWorkOrderTypeList(response);
      return response;
    }
  };

  const WorkOrdersInputs = [
    {
      label: "Work Order No.",
      variable: "workOrderNumber",
      type: "customInput",
    },
    {
      label: "Type",
      variable: "workOrderType",
      type: "selectDropDown",
      dropDownOptions: !workOrderTypeList.length
        ? getWorkOrderType()
        : workOrderTypeList,
    },
    {
      label: "Main Work Center",
      variable: "mainWorkCenter",
      type: "selectDropDown",
      dropDownOptions: !workOrderTypeList.length
        ? getWorkOrderType()
        : workOrderTypeList,
    },
    {
      label: "Date range",
      variable: "dateRange",
      type: "dateRange",
    },
  ];

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
                getWorkOrderList();
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
        dataSource={workOrderList}
        showActionButton={false}
        rowKey={"Id"}
        showViewMoreExpandable={true}
        expandIconColumnIndex={10}
        expandableView={WorkOrdersExpandableView}
        actionButtonItems={actionButtonItems}
        pagination={false}
        totalRecords={totalWorkOrders}
        Checkbox={Checkbox}
        pageSize={pageSize}
        currentPage={page}
        noDataFound={NotFoundContent}
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
          getWorkOrderList(
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
            inputs={WorkOrdersInputs}
          />
        </SideDrawer>
      )}
    </>
  );
};
