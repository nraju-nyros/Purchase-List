import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { WizardTemp } from "../Wizard/WizardTemp";
import { NotificationsDeviceList } from "./NotificationsDeviceList";
import { SearchBox } from "../SearchBox";
import {Wizard} from "../Wizard/Wizard";
import {NotificationsCreateRequest} from "./NotificationsCreateRequest";
export const NotificationCreateFlow = ({
    handleClose,
    handleCreate,
    showModal,
    handleDeviceSelection,
    onClose,
    List,
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
  