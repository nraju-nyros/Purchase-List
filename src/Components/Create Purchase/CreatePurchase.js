import React from "react";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  useFormik,
  FormikProvider,
} from "formik";
import * as yup from "yup";
import "antd/dist/antd.css";
import { CustomError } from "./CustomError";
import { Button, Card, Col, Row } from "antd";
import "./Purchase.css";
import "../../App.css"
import {Link , useHistory } from 'react-router-dom'
import { Layout } from "../Context/Layout";

export const CreatePurchase = () => {
  const validationSchema = yup.object().shape({
    materialDetails: yup.array().of(
      yup.object().shape({
        material: yup.string().required("name field is required"),
        storage_location: yup
          .string()
          .required("storage_location field is required"),
        quantity: yup.string().required("quantity field is required"),
        plant: yup.string().required("plant field is required"),
        account_assignment: yup
          .string()
          .required("account_assignment field is required"),
        uom: yup.number().required("uom field is required"),
        item: yup.string().required("kindly provide integer only"),
      })
    ),
  });

  const handleMaterial = () => {
    console.log("add material button is clicked");
  };

  const onSubmit = (val) => {
    console.log("inside onSubmit function : ",val);
    // console.log(val);
  };
  const initialValues = {
    materialDetails : [{
      material: "",
      storage_location: "",
      quantity: "",
      plant: "",
      account_assignment: "",
      item: "",
      uom: "",
    }]
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const { touched, errors, handleSubmit, values, setFieldValue, setErrors } =
    formik;

  return (
    <div>
      <Layout>
          
        <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col"
        >
          <div style={{ background: "#F3F5F8" }} className="content flex-grow ">
            <div className="container">
              <div className="content rounded-lg  flex-grow">
                <div
                  className="px-4 pt-36 pb-5 text-left"
                  style={{ padding: "30px 0 30px 20px" }}
                >
                  <h1 className="uppercase text-sub0 font-semibold">
                    Create Purchasing Requisition{" "}
                  </h1>
                </div>
                <Card className=" rounded-2xl" >
                  <FieldArray name="materialDetails">
                    {({ push, remove }) => (
                      <div>
                        {values.materialDetails.map((materialDetail, i) => {
                          return (
                            <>
                            <div key={i}>   
                              <div className="px-8 pt-8">
                                <Row gutter={50}>
                                  <Col span={12}>
                                    <div className="mt-4 mb1  input_text_color ">
                                      <label>Material</label>
                                      <br />
                                      <Field
                                        name={`materialDetails.${i}.material`}
                                        type="text"
                                        placeholder="Enter Material Id"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                       
                                        style={{
                                          height: "45px",
                                          color:  "#383A65",
                                          backgroundColor:  "#fff",
                                          cursor:  "text",
                                        }}
                                       
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.material`}
                                      />
                                    </div>
                                  </Col>

                                  <Col span={12}>
                                    <div className="mt-4 mb1 input_text_color ">
                                      <label>Storage Location</label> <br />
                                      <Field
                                        name={`materialDetails.${i}.storage_location`}
                                        type="text"
                                        placeholder="Enter Storage Location"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        size="large"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor:  "text",
                                        }}
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.storage_location`}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="px-8 pt-8">
                                <Row gutter={50}>
                                  <Col span={12}>
                                    <div className="mt-4 mb1  input_text_color ">
                                      <label>Quantity</label> <br />
                                      <Field
                                        name={`materialDetails.${i}.quantity`}
                                        type="text"
                                        placeholder="Enter Quantity"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        size="large"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor: "text",
                                        }}
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.quantity`}
                                      />
                                    </div>
                                  </Col>

                                  <Col span={12}>
                                    <div className="mt-4    input_text_color ">
                                      <label>Plant</label> <br />
                                      <Field
                                        name={`materialDetails.${i}.plant`}
                                        type="text"
                                        placeholder="Enter Plant"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        size="large"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor: "text",
                                        }}
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.plant`}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="px-8 pt-8">
                                <Row gutter={50}>
                                  <Col span={12}>
                                    <div className="mt-4 mb1  input_text_color ">
                                      <label>Account Assignment</label>
                                      <br />
                                      <Field
                                        name={`materialDetails.${i}.account_assignment`}
                                        type="text"
                                        placeholder="Enter Account Assignment"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        size="large"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor: "text",
                                        }}
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.account_assignment`}
                                      />
                                    </div>
                                  </Col>

                                  <Col span={12}>
                                    <div className="mt-4    input_text_color ">
                                      <label>Item</label>
                                      <br />
                                      <Field
                                        name={`materialDetails.${i}.item`}
                                        as="select"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor: "text",
                                        }}
                                      >
                                        <option value="" disabled >
                                          Select any
                                        </option>
                                        <option value="Item1" >Item1</option>
                                        <option value="Item2" >Item2</option>
                                        <option value="Item3" >Item3</option>
                                        <option value="Item4" >Item4</option>
                                        <option value="Item5" >Item5</option>
                                      </Field>
                                      <CustomError
                                        name={`materialDetails.${i}.item`}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="px-8 pt-8">
                                <Row gutter={50}>
                                  <Col span={12}>
                                    <div className="mt-4 mb1  input_text_color ">
                                      <label>UOM</label>
                                      <br />
                                      <Field
                                        name={`materialDetails.${i}.uom`}
                                        type="text"
                                        placeholder="Enter UOM"
                                        className="font-poppins font-medium input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
                                        size="large"
                                        style={{
                                          height: "45px",
                                          color: "#383A65",
                                          backgroundColor: "#fff",
                                          cursor:  "text",
                                        }}
                                      />
                                      <CustomError
                                        name={`materialDetails.${i}.uom`}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="dotted_border"></div>
                              </div>
                            </>
                          );
                        })}

                        <div className="px-8 pb-8 mt-4 text-right">
                          <Row className="px-1 items-center">
                            <Col span={20}></Col>
                            <Col span={4} className="text-right">
                              <Button
                                size="large"
                                className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3"
                                shape="round"
                                onClick={() =>
                                  push({
                                    material: "",
                                    storage_location: "",
                                    quantity: "",
                                    plant: "",
                                    account_assignment: "",
                                    item: "",
                                    uom: "",
                                  })
                                }
                              >
                                + Add Material
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Card>
              </div>
            </div>
          </div>
          <Row
            className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-5  justify-center items-end`}
          >
             <Link to="/">
             <Button
              type="link"  
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              // style={{ color: "rgb(133,212,156)" }}
            >
              Cancel
            </Button>
             </Link>

            <Button
              htmlType="submit"
              className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
              // style={{ color: "rgb(133,212,156)" }} 
            >
              Submit
            </Button>
          </Row>
        </Form>
      </FormikProvider>
      </Layout>   
    </div>
  );
};
