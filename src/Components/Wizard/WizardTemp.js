import { Button, Col, Row, Steps } from "antd";
import React, { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Step } = Steps;

export const WizardTemp = ({ steps, current, classes, helpTemplate }) => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div className={`${helpTemplate ? "-mt-2" : ""} flex-grow h-full w-full`}>
      <Row>
        {helpTemplate && (
          <Col span={2} offset={22}>
            <Button
              type="link"
              onClick={() => setShowHelp(!showHelp)}
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
        )}
      </Row>
      <Row className="max-h-full flex" style={{ height: "100vh" }}>
        <Col
          span={showHelp ? 19 : 24}
          className={`flex flex-col ${helpTemplate ? "-mt-2" : ""}`}
        >
          <Steps className={`px-7 pb-2 test ${classes}`} current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content flex-grow flex flex-col">
            {steps[current].content}
          </div>
        </Col>
        {showHelp && (
          <Col
            span={5}
            className="flex flex-col overflow-y-scroll px-2 border-l border-iron h-full flex-grow bg-white pb-20"
          >
            {helpTemplate}
          </Col>
        )}
      </Row>
    </div>
  );
};
