import { Button, Card, Col, Modal, Row, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppContext } from "../Context/AppContext";
import { CustomInput } from "../Customs/CustomInput";
import { SelectDropdown } from "../Customs/SelectDropdown";
import { CustomSwitchToggle } from "../Customs/CustomSwitchToggle";
import { CustomTextarea } from "../Customs/CustomTextarea";
import padIso10126 from "crypto-js/pad-iso10126";

export const WorkOrderAddHeader = ({
  handleClose,
  selectedDevice,
  handlePrev,
  value,
  setIsModalVisible,
  selectedRowKeys,
  selectedNotification,
}) => {
  const ctx = useContext(AppContext);
  const history = useNavigate();
  let location = useLocation();
  const [tempValues, setTempValues] = useState(0);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [workorderPayload, setWorkOrderPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [newWorkOrderId, setNewWorkOrderId] = useState();
  const [workOrderTypeFromNotification, setWorkOrderTypeFromNotification] =
    useState("");

  const initialValues = {
    modelName: "",
    modelData: "",
    id: "",
    orgCode: "",
    documentNo: "",
    workOrderType: workOrderTypeFromNotification || "",
    equipmentNumber: "",
    description: "",
    workCenter: "",
    commit: "",
    plant: "",
    storageLocation: "",
    systemCondition: "",
    projectCode: "",
    cfc: "",
    orderPriority: "",
    startDate: "",
    endDate: "",
    priority: "",
    priorityName: "",
    createdBy: "",
    createdOn: "",
    notificationIds: selectedRowKeys,
    parentId: "",
    syncText: "",
    syncCode: 0,
    releasedFlag: "",
    technicallyComplete: "",
    status: 0,
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Description is required")
      .max(40, "Only 40 characters are allowed"),
    priority: Yup.string().nullable().required("Priority is required"),
    // orgCode: Yup.string().nullable().required("OrgCode is required"),
    systemCondition: Yup.string()
      .nullable()
      .required("System Condition is required"),
  });
  
  const handlePostWorkOrder = async () => {
    setIsLoading(true);
    try {
      const response = true;
      console.log("response of hnadlePostWorkOrder", response);
      if (response) {
        setIsLoading(false);
        setWorkOrderPayload(response.data);
        setNewWorkOrderId(response.id);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
      } else {
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setWorkOrderPayload(null);
      }
    } catch (err) {}
  };

  const onSubmit = (val) => {
    setWorkOrderPayload(val);
    setIsConfirmModalVisible(true);
  };

  const [systemCondition, setSystemCondition] = useState([]);
  const [workOrderTypes, setWorkOrderTypes] = useState([]);
  const [priorityTypes, setPriorityTypes] = useState([]);
  const [orderPriorities, setOrderPriorities] = useState([]);
  const [workOrderEquipment, setWorkOrderEquipment] = useState();
  const [workOrderCfcs, setWorkOrderCfcs] = useState([]);
  const [workOrderProjectCodes, setWorkOrderProjectCodes] = useState([]);
  const [restrictOrderPriorities, setRestrictOrderPriorities] = useState(false);

  const SystemCondition = [
    {
      Id: 1,
      Value: "condition 1",
    },
    {
      Id: 2,
      Value: "condition 2",
    },
    {
      Id: 3,
      Value: "condition 3",
    },
    {
      Id: 4,
      Value: "condition 4",
    },
    {
      Id: 5,
      Value: "condition 5",
    },
  ];
  const PriorityTypes = [
    {
      Id: "p1",
      Value: "Priority 1",
    },
    {
      Id: "p2",
      Value: "Priority 2",
    },
    {
      Id: "p3",
      Value: "Priority 3",
    },
    {
      Id: "p4",
      Value: "Priority 4",
    },
  ];
  const OrderPriorities = [
    {
      Id: "op1",
      Value: "Order Priority 1",
    },
    {
      Id: "op2",
      Value: "Order Priority 2",
    },
    {
      Id: "op3",
      Value: "Order Priority 3",
    },
    {
      Id: "op4",
      Value: "Order Priority 4",
    },
  ];
  const WorkOrderCfcs = [
    {
      Id: "wc1",
      Value: "Work Order Cfc 1",
    },
    {
      Id: "wc2",
      Value: "Work Order Cfc 2",
    },
    {
      Id: "wc3",
      Value: "Work Order Cfc 3",
    },
    {
      Id: "wc4",
      Value: "Work Order Cfc 4",
    },
  ];
  const WorkOrderProjectCodes = [
      {
        Id : "wpc1",
        Value : "Work Order Project Code 1",
      },
      {
        Id : "wpc2",
        Value : "Work Order Project Code 2",
      },
      {
        Id : "wpc3",
        Value : "Work Order Project Code 3",
      },
      {
        Id : "wpc4",
        Value : "Work Order Project Code 4",
      },
  ]
  const getWorkOrderSystemCondition = async () => {
    const response = SystemCondition;
    if (response) {
      setSystemCondition(response);
    }
  };
  const getWorkOrderTypes = async () => {
    const response = "empty";
    if (response) {
      setWorkOrderTypes(response);
    }
  };
  const getWorkOrderPriorityTypes = async () => {
    const response = PriorityTypes;
    if (response) {
      setPriorityTypes(response);
    }
  };

  const getWorkOrderOrderPriorities = async () => {
    const response = OrderPriorities;
    if (response) {
      setOrderPriorities(response);
    }
  };

//   const getWorkOrderEquipment = async () => {
//     const response = await ctx.HttpGet("/WorkOrder/equipment", {
//       search: history.location.state,
//     });
//     if (response) {
//       setWorkOrderEquipment(response);
//     }
//   };

  const getWorkOrderCfcs = async () => {
    const response = WorkOrderCfcs
    if (response) {
      setWorkOrderCfcs(response);
    }
  };

  const getWorkOrderProjectCodes = async () => {
    const response = WorkOrderProjectCodes
    if (response) {
      setWorkOrderProjectCodes(response);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    getWorkOrderSystemCondition();
    getWorkOrderTypes();
    getWorkOrderPriorityTypes();
    getWorkOrderOrderPriorities();
    //getWorkOrderEquipment();
    getWorkOrderCfcs();
    getWorkOrderProjectCodes();
    return () => {
      setErrors({});
    };

    if (selectedDevice?.systemConditionValue) {
      setSystemCondition(selectedDevice?.systemConditionValue);
    }
  }, [selectedDevice?.systemConditionValue]);

  const renderStepBar = (tab) => {
    return (
      <Row>
        <Col sm={24} className="bg-regent-gray py-2 text-white text-left px-7 ">
          <p> Work Order Creation </p>
        </Col>
      </Row>
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const {
    touched,
    errors,
    handleSubmit,
    values,
    setFieldValue,
    setErrors,
    setTouched,
  } = formik;

  const restrictedOrderProrities = [
    { Id: "999", Value: "999" },
    { Id: "N01", Value: "N01" },
  ];

  // TODO: this should all go away once API enforces these rules

  // useEffect(() => {
  //   if (
  //     selectedNotification.techStatus &&
  //     (selectedNotification.techStatus.includes("CX") ||
  //       selectedNotification.techStatus.includes("X"))
  //   ) {
  //     setRestrictOrderPriorities(true);
  //   }
  //   if (selectedNotification.notificationType) {
  //     if (selectedNotification.notificationType === "M1") {
  //       setWorkOrderTypeFromNotification("PM01");
  //     } else if (selectedNotification.notificationType === "PM") {
  //       setWorkOrderTypeFromNotification("PM02");
  //     }
  //   }
  // }, []);
  // TODO: this should all go away once API enforces these rules

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col"
      >
        <div style={{ background: "#F3F5F8" }} className="content  flex-grow">
          <div className="container">
            <div className="content rounded-lg  flex-grow mt-10">
              <Card className="rounded-2xl pb-10 mb-10">
                <div className="px-8">
                  <Row gutter={50}>
                    <Col span={24}>
                      <div className="mt-4 mb1   input_text_color ">
                        <CustomTextarea
                          id="workOrderDescription"
                          rows={4}
                          label="Description"
                          inputValue={values.description}
                          Placeholder="Description"
                          requiredField={true}
                          onChange={(val) => setFieldValue("description", val)}
                          error={
                            touched.description &&
                            errors.description &&
                            errors.description
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Divider dashed className="mt-4 mb-4" />
                <div className="px-8 mb-10">
                  <Row gutter={30}>
                    <Col span={12}>
                      <div className="mt-4 mb1  input_text_color ">
                        <SelectDropdown
                          dataList={values.systemCondition}
                          style={{ background: "#E9E9F8" }}
                          optionsList={systemCondition}
                          mode="single"
                          optionKeyName="Id"
                          optionValueName="systemCondition"
                          className="border dropdown_blue_text border-white-lilac colorFix"
                          optionDisplayName="Value"
                          onChange={(val, key) =>
                            setFieldValue("systemCondition", key["key"])
                          }
                          label="System Condition"
                          Placeholder="System Condition"
                          requiredField={true}
                          error={
                            touched.systemCondition &&
                            errors.systemCondition &&
                            errors.systemCondition
                          }
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-4 input_text_color ">
                        <CustomInput
                          className="ml-8 "
                          inputValue={values.orgCode}
                          disabled={true}
                          label={"Work Main. center"}
                          Placeholder="Work Main. center"
                          requiredField={true}
                          onChange={(val) => setFieldValue("orgCode", val)}
                          error={
                            touched.systemCondition &&
                            errors.orgCode &&
                            errors.orgCode
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={50} className="mt-4">
                    <Col span={12}>
                      <div className=" mb1 input_text_color">
                        <SelectDropdown
                          dataList={values.priority}
                          optionKeyName="Id"
                          optionValueName="Value"
                          className="border dropdown_blue_text border-white-lilac colorFix"
                          optionDisplayName="Value"
                          mode="single"
                          optionsList={priorityTypes}
                          onChange={(val, key) => {
                            setTouched({});
                            setFieldValue("priority", key["key"]);
                            // setFieldValue(
                            //   "priorityName",
                            //   priorityTypes.find((pt) => pt.Id === val).Value
                            // );
                          }}
                          label="Priority"
                          Placeholder="Priority"
                          requiredField={true}
                          error={
                            touched.priority &&
                            errors.priority &&
                            errors.priority
                          }
                        />
                      </div>
                    </Col>

                    <Col span={12}>
                      <div className="mt-1 progressCenter">
                        <h4 className="font-semibold text-daisy-bush text-h1 mb-2">
                          Release Work Order{" "}
                        </h4>
                        <CustomSwitchToggle
                          className="flex-row-reverse mt-2"
                          switchValue={values.releasedFlag}
                          onText="Yes"
                          offText="No"
                          onChange={(val) =>
                            setFieldValue("releasedFlag", val ? "X" : "")
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Divider dashed className="mt-4 mb-4" />
                <div className="px-8">
                  <Row gutter={50}>
                    <Col span={12}>
                      <div className="pt-4">
                        {/* TODO: verify field name, value, & dataList */}
                        <SelectDropdown
                          dataList={values.projectCode}
                          style={{ background: "#E9E9F8" }}
                          optionsList={workOrderProjectCodes}
                          mode="single"
                          optionKeyName="Id"
                          optionValueName="Value"
                          className="border dropdown_blue_text border-white-lilac colorFix my-2"
                          // className="border dropdown_blue_text border-white-lilac colorFix"
                          optionDisplayName="Value"
                          onChange={(val, key) =>
                            setFieldValue("projectCode", key["key"])
                          }
                          label="Project Code"
                          error={
                            touched.projectCode &&
                            errors.projectCode &&
                            errors.projectCode
                          }
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="pt-4">
                        {/* TODO: verify field name, value, & dataList */}
                        <SelectDropdown
                          dataList={values.cfc}
                          mode="single"
                          optionKeyName="Id"
                          // value={values.techStatus}
                          optionValueName="Value"
                          className="border dropdown_blue_text  border-white-lilac colorFix"
                          optionDisplayName="Value"
                          onChange={(val, key) =>
                            setFieldValue("cfc", key["key"])
                          }
                          optionsList={workOrderCfcs}
                          label="CFC"
                          error={touched.cfc && errors.cfc && errors.cfc}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={50}>
                    <Col span={12}>
                      <div className="pt-4">
                        <SelectDropdown
                          dataList={values.orderPriority}
                          optionKeyName="Id"
                          optionValueName="Value"
                          className="border dropdown_blue_text border-white-lilac colorFix"
                          optionDisplayName="Value"
                          mode="single"
                          optionsList={
                            restrictOrderPriorities
                              ? restrictedOrderProrities
                              : orderPriorities
                          }
                          onChange={(val, key) =>
                            setFieldValue("orderPriority", key["key"])
                          }
                          label="Order Priority"
                          error={
                            touched.orderPriority &&
                            errors.orderPriority &&
                            errors.orderPriority
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>

            <Row
              className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
            >
              <Button
                className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
                type="link"
                onClick={() => handlePrev()}
              >
                Previous
              </Button>

              <Button
                className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
                htmlType="submit"
              >
                Create
              </Button>
            </Row>
          </div>
          <Modal
            title={null}
            visible={isConfirmModalVisible}
            wrapClassName="rounded confirm-modal-layout notification-custom-modal isModalVisible"
            closeIcon=" "
            centered={true}
            footer={null}
          >
            <div>
              <h6 className="font-bold mb-2">Create Work Order</h6>
              <p>Are you sure you want to create this Work Order?</p>
            </div>
            <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
              <Button
                className="mx-2 ant-btn-primary rounded-lg"
                onClick={() => {
                  setIsConfirmModalVisible(false);
                  setWorkOrderPayload(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className=" ant-btn rounded-lg"
                //TODO: fix onClick
                onClick={() => handlePostWorkOrder()}
              >
                {isLoading ? "Loading..." : "Create"}
              </Button>
            </div>
          </Modal>
          <Modal
            title={null}
            visible={isSuccessModalVisible}
            wrapClassName="rounded confirm-modal-layout notification-custom-modal"
            closeIcon=" "
            centered={true}
            footer={null}
          >
            <div>
              <CheckOutlined
                style={{ color: "rgb(133,212,156)" }}
                className="text-2xl"
              />
              <h6 className="font-bold mt-1"> Work Order Created</h6>
              <p>{workorderPayload}</p>
            </div>

            <div className="flex justify-end mt-4 ant-modal-footer px-0 border-t-0">
              <Button
                className="mx-4 rounded-lg px-4 bg-white border border-daisy-bush"
                onClick={() => {
                  setIsSuccessModalVisible(false);
                  setIsModalVisible(false);
                  history({
                    pathname: "/",
                    state: { id: value?.Id },
                  });
                  handleClose();
                }}
                type="primary"
              >
                <div className="text-daisy-bush">Back to Dashboard</div>
              </Button>
              <Button
                className=" ant-btn rounded-lg"
                onClick={() => {
                  history({
                    pathname: "/completedispatch",
                    id: newWorkOrderId,
                  });
                }}
              >
                {isLoading ? "Loading..." : "View Order"}
              </Button>
            </div>
          </Modal>
        </div>
      </Form>
    </FormikProvider>
  );
};
