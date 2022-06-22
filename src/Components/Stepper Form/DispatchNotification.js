import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Modal, DatePicker } from "antd";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import {CustomTextarea} from "../Customs/CustomTextarea"
import {CustomSwitchToggle} from "../Customs/CustomSwitchToggle"
import { CheckOutlined } from "@ant-design/icons";
import {SelectDropdown} from "../Customs/SelectDropdown"
import moment from "moment";
import * as Yup from "yup";

export const DispatchNotification = ({
  handlePrev,
  handleNext,
}) => {
  const ctx = useContext(AppContext);
  let history = useNavigate();
  const [operationPayload, setOperationPayload] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [current, setCurrent] = useState(0);

  const initialValues = {
    id: "",
    modelName: "",
    modelData: "",
    orgCode: "",
    parentId: "",
    documentNo: "",
    activity: "",
    workNumber: "",
    workUnit: "H",
    numberOfPeople: "",
    workCenter: history.location?.WorkCenter,
    description: "",
    plant: "",
    action: "",
    notification: "",
    projectedWorkHours: "",
    createdBy: "",
    createdOn: "",
  };

  const handlePostOperation = async () => {
    setIsLoading(true);
    try {
      const response = await ctx.HttpPost("/WorkOrder/operation", values);
      if (response) {
        setIsLoading(false);
        setOperationPayload(response);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
      } else {
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setOperationPayload(null);
      }
    } catch (err) {}
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Description is required")
      .max(40, "Only 40 characters are allowed"),
    workCenter: Yup.string().nullable().required("Work center is required"),
    numberOfPeople: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Number of People is only number required"),
    projectedWorkHours: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Projected work hours is number required"),
  });

  const onSubmit = (val) => {
    setOperationPayload(val);
    setIsConfirmModalVisible(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });
  const renderStepBar = (tab) => {
    return (
      <Row>
        <Col sm={12} md={24} className="bg-regent-gray py-3 text-white  px-7 ">
          <p> Create Dispatch Notification</p>
        </Col>
        {/* <Col
          sm={12}
          md={18}
          className={`py-3 ${tab === 1 ? "bg-regent-gray text-white" : "bg-catskill-white"
            }`}
        >
          <p className="ml-10">2. Add Operator</p>
        </Col> */}
      </Row>
    );
  };
  const { touched, errors, handleSubmit, values, setFieldValue } = formik;
  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col"
      >
        {/* <div className="flex flex-col h-full	">
          <div className="drawer-header sticky top-0 bg-white z-10">
            {renderStepBar(current)}
          </div>
        </div>  */}

        <div
          style={{ background: "#F3F5F8" }}
          className="flex-grow flex flex-col"
        >
         {/* <div
            className="px-44 pt-10 pb-5 text-pickled-bluewood font-semibold"
            style={{ fontSize: "0.8125rem" }}
          >
            1.Create Dispatch Notification
          </div> */}
          <br />

          <div className="content rounded-lg px-40 flex-grow pb-10">
            <Card className=" rounded-2xl">
              <div className="px-8 pt-8 pb-10">
                <Row className="mt-4 ">
                  <Col span={24}>
                    <div className="mt-4 mb1  textareaLayoutFix">
                      <CustomTextarea
                        inputValue={values.description}
                        rows={4}
                        label={"Description"}
                        Placeholder="Enter description"
                        requiredField={true}
                        onChange={(val) => setFieldValue("description", val)}
                        error={
                          touched.description &&
                          errors.description &&
                          errors.description
                        }
                      />
                    </div>
                    <div class="dotted_border"></div>
                  </Col>
                </Row>
                <br />

                <Row gutter={50}>
                  <Col span={12}>
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                      Start Date
                    </h6>

                    <div className="notification-form-right rounded">
                      <DatePicker
                        className={`ant-select-selector 
                            custom-placeholder alert-filter-open-time-dropdown 
                            rounded-lg font-poppins text-xs font-medium 
                            leading-normal text-daisy-bush w-full dateRangeBox`}
                        style={{
                          height: "40px",
                          width: "100%",
                          background: "#E9E9F8",
                        }}
                        placeholder=""
                        allowClear={false}
                        bordered={true}
                        suffixIcon={
                          <img
                            src="/images/icons/tickDropdown.svg"
                            alt="dropdownimage"
                          />
                        }
                        floatingLabel={false}
                        value={values.startDate ? moment(values.startDate) : ""}
                        onChange={(_date) => {
                          setFieldValue(
                            "startDate",
                            moment(_date._d).format("L")
                          );
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                      End Date
                    </h6>

                    <div className="notification-form-right rounded">
                      <DatePicker
                        className={`ant-select-selector 
                            custom-placeholder alert-filter-open-time-dropdown 
                            rounded-lg font-poppins text-xs font-medium 
                            leading-normal text-daisy-bush w-full dateRangeBox`}
                        style={{
                          height: "40px",
                          width: "100%",
                          background: "#E9E9F8",
                        }}
                        placeholder=""
                        allowClear={false}
                        bordered={true}
                        suffixIcon={
                          <img
                            src="/images/icons/tickDropdown.svg"
                            alt="dropdownimage"
                          />
                        }
                        floatingLabel={false}
                        value={values.startDate ? moment(values.startDate) : ""}
                        onChange={(_date) => {
                          setFieldValue(
                            "startDate",
                            moment(_date._d).format("L")
                          );
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <br />

                <br />

                <Row gutter={50}>
                  <Col span={12}>
                    <h6
                      style={{ marginBottom: "-20px" }}
                      class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood"
                    >
                      Training Event
                    </h6>
                    <div className="  input_text_color ">
                      <SelectDropdown
                        //   value={values.getSystemConditions}
                        //   dataList={values.SystemConditions}
                        //   optionsList={systemConditions}
                        mode="single"
                        optionKeyName="Id"
                        optionValueName="Value"
                        className="border dropdown_blue_text  border-white-lilac colorFix"
                        optionDisplayName="Value"
                        onChange={(val, key) => {
                          setFieldValue("systemconditions", val);
                        }}
                        label="&nbsp;"
                        placeholder=""
                        error={
                          touched.systemconditions &&
                          errors.systemconditions &&
                          errors.systemconditions
                        }
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <h6
                      style={{ marginBottom: "-20px" }}
                      class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood"
                    >
                      Training Level
                    </h6>
                    <div className="mt-0 input_text_color ">
                      <SelectDropdown
                        //   value={values.getSystemConditions}
                        //   dataList={values.SystemConditions}
                        //   optionsList={systemConditions}
                        mode="single"
                        optionKeyName="Id"
                        optionValueName="Value"
                        className="border dropdown_blue_text  border-white-lilac colorFix"
                        optionDisplayName="Value"
                        onChange={(val, key) => {
                          setFieldValue("systemconditions", val);
                        }}
                        label="&nbsp;"
                        Placeholder=""
                        error={
                          touched.systemconditions &&
                          errors.systemconditions &&
                          errors.systemconditions
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row gutter={50}>
                  <Col span={6}>
                    <div className="mt-4 mb1 input_text_color">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Extended Dispatch
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.releasedFlag1}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("releasedFlag1", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mt-4 mb1   input_text_color ">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Off Post Dispatch
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.inProcess}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("inProcess", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row gutter={50}>
                  <Col span={6}>
                    <div className="mt-4 mb1 input_text_color">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Approval Requested
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.releasedFlag}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("releasedFlag", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
          <Row
            className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
          >
            <Button
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              type="link"
              // onClick={handleClose}
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button
              className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
              onClick={handleNext}
              // onClick={() => {
              //   history.push("/dispatch/addoperator");
              // }}
            >
              Next
            </Button>
          </Row>
        </div>
      </Form>
      <Modal
        title={null}
        visible={isConfirmModalVisible}
        wrapClassName="rounded notification-custom-modal"
        closeIcon=" "
        centered={true}
        footer={null}
      >
        <div>
          <h6 className="font-bold mt-1"> Add Operation </h6>
        </div>
        <div className="mt-3">
          <p>Are you sure you want to add this Operation?</p>
        </div>
        <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-2 ant-btn-primary rounded-lg"
            onClick={() => {
              setIsConfirmModalVisible(false);
              setOperationPayload(null);
              history("/workOrder/details");
            }}
          >
            Cancel
          </Button>
          <Button className=" ant-btn rounded-lg" onClick={handlePostOperation}>
            {isLoading ? "Loading..." : "Add"}
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
          <h6 className="font-bold mt-1"> Operation added </h6>
          <p>{operationPayload}</p>
        </div>

        <div className="flex justify-end mt-4 ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-4   rounded-lg px-8"
            onClick={() => {
              setOperationPayload(null);
              setIsSuccessModalVisible(false);
              history("/workOrder/details");
            }}
          >
            Okay
          </Button>
        </div>
      </Modal>
    </FormikProvider>
  );
};

export default DispatchNotification ;
