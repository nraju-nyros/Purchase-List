import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { DispatchEquipment } from "../Stepper Form/DispatchEquipment";
// import { DispatchNotification } from '../Stepper Form/DispatchNotification'
import { DispatchNotification1 } from "../Stepper Form/DispatchNotification1";
import AddOperator from "../Stepper Form/AddOperator";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Wizard } from "../Wizard/Wizard";
import { AppContext } from "../Context/AppContext";
import {
  QuestionCircleOutlined
} from "@ant-design/icons";
import { Layout } from "../Context/Layout";

export const DispatchCreate = (props) => {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const ctx = useContext(AppContext);
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [operatorList, setOperatorList] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Select Equipment",
      content: (
        <DispatchEquipment
          current={current}
          handleNext={next}
          data={data}
          setData={setData}
          selectedDevice={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          query={query}
          handleEquipmentSearch={(val) => setQuery(val)}
          setQuery={setQuery}
          ctx={ctx}
        />
      ),
    },
    {
      title: "Create Dispatch Notification",
      content: (
        <DispatchNotification1
          handlePrev={prev}
          handleNext={next}
          handleClose={props.onClose}
          value={selectedDevice}
          selectedDevice={selectedDevice}
          notificationPayload={notificationPayload}
          setNotificationPayload={setNotificationPayload}
        />
      ),
    },
    {
      title: "Add Operator",
      content: (
        <AddOperator
          current={current}
          handlePrev={prev}
          handleClose={props.onClose}
          setIsConfirmModalVisible={setIsConfirmModalVisible}
          notificationPayload={notificationPayload}
          setNotificationPayload={setNotificationPayload}
          isConfirmModalVisible={isConfirmModalVisible}
          operatorList={operatorList}
        />
      ),
    },
  ];
  return (
    <Layout 
    showHelp={true}
    helpText={"Help"}
    helpIcon={<QuestionCircleOutlined />}
    >
        <Wizard
        steps={steps}
        current={current}
        className="step-width"
        classes="wizard-header"
      />
    </Layout>
    
  );
};
