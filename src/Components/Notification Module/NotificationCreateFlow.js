import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { WizardTemp } from "../Wizard/WizardTemp";
import { NotificationsDeviceList } from "./NotificationsDeviceList";
import { SearchBox } from "../SearchBox";
import {Wizard} from "../Wizard/Wizard";
import {NotificationsCreateRequest} from "./NotificationsCreateRequest";
import { Layout } from "../Context/Layout";
import {
  QuestionCircleOutlined
} from "@ant-design/icons";

export const NotificationCreateFlow = ({
    handleClose,
    handleCreate,
    showModal,
    handleDeviceSelection,
    onClose,
    
  }) => {
    const ctx = useContext(AppContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [sortByValue, setSortByValue] = useState("name");
    const [orderByValue, setOrderByValue] = useState("ASC");
    const [offsetValue, setOffsetValue] = useState(0);
    const [searchValue, setSearchValue] = useState("dev");
    const [current, setCurrent] = useState(0);
    const [selectedDevice, setSelectedDevice] = useState({});
    const [deviceList, setDeviceList] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState(null);

    const List = [
      {
        AdminNo: "C11",
        Coding: "680",
        CreatedBy: "DEVUSER1@shipcomwireless.com",
        CreatedOn: "05/23/2022 05:33:09",
        DefectGroup: "AMG",
        DefectLocation: "AMH",
        Description: "steve class changes 5.9",
        DocumentNo: "103",
        EquipmentNo: "000000001011212104",
        Id: "a83e19f5-0ad9-43b3-a2fc-dab78190dbb4",
        InProcess: 1,
        Material: "014360005",
        ModelNo: "M2A3",
        NotifTime: "05:33:09",
        OperStatus: "OperStatus 001",
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
        WorkOrderNo: "WORK-688",
      },
      {
        AdminNo: "WAH0C0-",
        CauseCode: "068",
        Coding: "777",
        CreatedBy: "DEVUSER1@shipcomwireless.com",
        CreatedOn: "08/04/1998 04:47:55",
        DefectGroup: "AMG",
        DefectLocation: "DPM",
        DocumentNo: "199",
        Description: "steve test 5.8",
        EquipmentNo: "000000001011182894",
        Id: "1b9b62a1-6d9a-482b-9181-7ab38920556d",
        InProcess: 1,
        Material: "009739533",
        ModelNo: "",
        NotifTime: "04:47:55",
        OperStatus: "OperStatus 403",
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
        UpdatedOn: "2022-05-09 04:48:39",
        WorkOrderNo: "WORK-676",
      },
      {
        AdminNo: "UIC   -",
        CauseCode: "115",
        Coding: "360",
        CreatedBy: "DEVUSER1@shipcomwireless.com",
        CreatedOn: "05/05/1997 04:37:16",
        DocumentNo: "129",
        DefectGroup: "",
        DefectLocation: "",
        Description: "test",
        EquipmentNo: "000000001016587025",
        Id: "2f4c5032-aa12-4c43-a790-cf9435c1cefd",
        ModelNo: "",
        OperStatus: "OperStatus 333",
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
        WorkOrderNo: "WORK-199",
      },
      {
        AdminNo: "WAH0C0-",
        CauseCode: "099",
        Coding: "777",
        CreatedBy: "DEVUSER1@shipcomwireless.com",
        CreatedOn: "10/04/2014 03:19:26",
        DocumentNo: "181",
        DefectGroup: "",
        DefectLocation: "",
        Description: "tech statsus",
        EquipmentNo: "000000001011202839",
        Id: "9779c4f5-cac7-40fe-bc11-74b5af9cdaaa",
        ModelNo: "",
        OperStatus: "OperStatus 223",
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
        WorkOrderNo: "WORK-123",
      },
    ];
  
    const getDeviceList = async (
      searchBy = searchValue,
      sortBy = sortByValue,
      orderBy = orderByValue,
      offset = offsetValue,
      limit = pageSize
    ) => {
      let queryParams = {
        search: searchBy,
        sortBy: sortBy,
        orderBy: orderBy,
        offset: offset,
        limit: limit,
      };
      const response = List
      if (response) {
        setDeviceList(response);
      }
    };
  
    const next = () => {
      setCurrent(current + 1);
    };
    const prev = () => {
      setCurrent(current - 1);
    };
    let history = useNavigate();
    const handleCloseModal = () => {
      // setCurrent(0);
      // setSelectedDevice("");
      // handleClose();
      // history.push("/notifications");
    };
    // const getQueryData = async (val) => {
    //   setIsLoading(true);
    //   try {
    //     const res = await ctx.HttpGetList(
    //       `/notification/equipments?search=${val}`
    //     );
    //     if (res) {
    //       setIsLoading(false);
    //       res?.Data.forEach((element) => (element.isActive = false));
    //       setData(res.Data);
    //     }
    //   } catch (err) {
    //     setIsLoading(false);
    //   }
    // };
  
    useEffect(() => {
      if (history?.location?.state?.selectedEquipment) {
        setSelectedDevice(history.location.state.selectedEquipment);
        setCurrent(1);
        history({
          state: { ...history.location.state, selectedEquipment: null },
        });
      }
    }, []);
  console.log("printing selectedDevice in NotificationCreateFlow ", selectedDevice);
    const steps = [
      {
        title: "Select Equipment",
        content: (
          <NotificationsDeviceList
            current={current}
            handleNext={next}
            data={data}
            List = {List}
            setData={setData}
            ctx={ctx}
            handleClose={handleCloseModal}
            selectedDevice={selectedDevice}
            handleDeviceSelection={(value) => setSelectedDevice(value)}
            query={query}
            handleEquipmentSearch={(val) => setQuery(val)}
            setQuery={setQuery}
          />
        ),
      },
      {
        title: "Create Notification",
        content: (
          <NotificationsCreateRequest
            current={current}
            value={selectedDevice}
            selectedDevice={selectedDevice}
            handlePrev={prev}
            onClose={onClose}
            getDeviceList={getDeviceList}
            handleCreate={handleCreate}
          />    
        ),
      },
    ];
  
    return (
     
        <Wizard
        steps={steps}
        current={current}
        classes="wizard-header"
        helpTemplate
      />
     
      
    );
  };
  