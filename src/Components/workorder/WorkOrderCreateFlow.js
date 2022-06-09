import { useEffect, useMemo } from "react";
import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Wizard } from "../Wizard/Wizard";
import { useNavigate, useHistory} from "react-router-dom";
import { NotificationsDeviceList } from "./NotificationsDeviceList";
import { WorkOrderAddNotification } from "./WorkOrderAddNotification";
import { WorkOrderAddHeader } from "./WorkOrderAddHeader";
import { Layout } from "../Context/Layout";
import {
  QuestionCircleOutlined
} from "@ant-design/icons";
const WorkOrderCreateFlow = (props) => { 
    const history = useNavigate();
  const ctx = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortByValue, setSortByValue] = useState("name");
  const [orderByValue, setOrderByValue] = useState("ASC");
  const [offsetValue, setOffsetValue] = useState(0);
  const [searchValue, setSearchValue] = useState("dev");
  const [current, setCurrent] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [selectedNotification, setSelectedNotification] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [notificationList, setNotificationList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [notifactionData , setNotifactionData] = useState([]);

//   useEffect(async () => {
//     if (history?.location?.state?.equipmentSerialNo) {
//       const response = await ctx.HttpGet("/WorkOrder/equipment", {
//         search: `${history.location.state.equipmentSerialNo}`,
//       });
//       setSelectedDevice(response);
//       setCurrent(1);
//       history.push({
//         state: { ...history.location.state, equipmentSerialNo: undefined },
//       });
//     } else if (history?.location?.state?.selectedEquipment) {
//       setSelectedDevice(history.location.state.selectedEquipment);
//       setCurrent(1);
//       history.push({
//         state: { ...history.location.state, selectedEquipment: null },
//       });
//     }
//   }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
    document.body.classList.add("no-body-scroll");
  };

  const handleCloseModal = (value) => {
    setIsModalVisible(value);
  };

  const handleSelectedNotification = (value) => {
    setSelectedNotification(value);
  };

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
    const response = await ctx.HttpGetList("/notification/list", queryParams);
    if (response) {
      setDeviceList(response.Data);
    }
  };

  const getQueryData = async (val) => {
    setIsLoading(true);
    try {
      const res = await ctx.HttpGetList(
        `/notification/equipments?search=${val}`
      );
      if (res) {
        setIsLoading(false);
        res?.Data.forEach((element) => (element.isActive = false));
        setData(res.Data);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  const onClose=() => setIsModalVisible(false) // i have added this function extra,remember to delete it

  const selectedNotificationTechStatus = useMemo(() => {
    if (selectedNotification.length >= 1) {
      let arr = [];
      let notifType;
      selectedNotification.map((nId) => {
        const fullSelectedNotif = notificationList.find((n) => n.Id === nId);
        arr.push(fullSelectedNotif.TechStatus);
        notifType = fullSelectedNotif.Type;
      });
      return { techStatus: arr, notificationType: notifType };
    }
  }, [selectedNotification]);

  const steps = [
    {
      title: "Select Equipment",
      content: (
        <NotificationsDeviceList
          handlePrev={prev}
          current={current}
          handleNext={next}
          data={data}
          setData={setData}
          ctx={ctx}
          selectedDevice={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          query={query}
          handleEquipmentSearch={(val) => setQuery(val)}
          setQuery={setQuery}
          setNotifactionData={setNotifactionData}
        />
      ),
    },
    {
      title: "Select Notification",
      content: (
        <WorkOrderAddNotification
          handlePrev={prev}
          current={current}
          value={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          handleClose={handleCloseModal}
          getDeviceList={getDeviceList}
          handleNext={next}
          selectedNotification={selectedNotification}
          handleSelectedNotification={(val) => setSelectedNotification(val)}
          handleEquipmentSearch={(val) => setQuery(val)}
          selectedDevice={selectedDevice}
          notificationList={notificationList}
          setNotificationList={setNotificationList}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setNotifactionData={setNotifactionData}
          notifactionData={notifactionData}
          
        />
        
      ),
    },
    {
      title: "Create Work Order",
      content: (
        <WorkOrderAddHeader
          current={current}
          handleNext={next}
          deviceList={deviceList}
          selectedDevice={selectedDevice}
          value={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          handleEquipmentSearch={(val) => setQuery(val)}
          handlePrev={prev}
          selectedNotification={selectedNotificationTechStatus}
          handleSelectedNotification={(val) => setSelectedNotification(val)}
          handleClose={onClose}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isConfirmModalVisible={isConfirmModalVisible}
          setIsConfirmModalVisible={setIsConfirmModalVisible}
        />
       
      ),
    },
  ];

  return (
    // <Layout 
    // showHelp={true}
    // helpText={"Help"}
    // helpIcon={<QuestionCircleOutlined />}
    // >
      <Wizard steps={steps} current={current} classes="wizard-header" />
    // </Layout>  
    
    );
}

export default WorkOrderCreateFlow;

