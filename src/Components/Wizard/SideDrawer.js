import React, { useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../Context/AppContext";

export const SideDrawer = (props) => {
    const ctx = React.useContext(AppContext);
    const [helpWidth, setHelpWidth] = useState(15);
  
    const { hideCancel, hideCui, showHelp, onHelpClick, setShowHelp, helpTemplate } = props;
    return (
      <Modal
        visible={props.showModal}
        closable={false}
        transitionName={false}
        wrapClassName={props.wrapperClassName}
        footer={props.isFooterVisible}>
        <Row className="h-full">
        <Col  style={{width: `${showHelp ? (100 - helpWidth) : 100}%`}}  className="flex flex-col h-full">
        <div className="flex flex-col h-full	">
          <div className="drawer-header sticky z-10 top-0 bg-white z-10">
            {/* {ctx.pageInfo?.HomeTitle && !hideCui ? (
              <Row style={{ backgroundColor: "green", color: "white" }}>
                <div className="text-center w-full">
                  {ctx.pageInfo?.HomeTitle}
                </div>
              </Row>
            ) : (
              ""
            )} */}
            <div className="flex justify-between items-center	">
              {props.title && (
                <h1 className=" text-xl py-2 px-7 ">{props.title}</h1>
              )}
              {!hideCancel && (
                <div>
                  <Button
                    onClick={props.onClose}
                    className="mr-5 text-regent-gray border-0 text-h1 font-semibold cancelColor">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            <Row>
              <Col span={2} offset={22}>
                  <Button
                    type="link"
                    onClick={() => {setShowHelp ? setShowHelp(!showHelp) : console.log()}}
                    size="medium"
                    className="py-0 inline-flex items-center border border-daisy-bush bg-white rounded-md px-3 leaflet-zone-name"
                  >
                    <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                      <div className="m-auto">{<QuestionCircleOutlined />}</div>
                      <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal ml-2" />
                      Help
                    </div>
                  </Button>
              </Col>
            </Row>
          </div>
          {props.children}
        </div>
        </Col>
        {/* from here we have removed showHelp  */}
        </Row>
      </Modal>
    );
  };

