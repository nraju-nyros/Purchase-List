import {
    EditTwoTone,
    LoadingOutlined,
    WarningTwoTone,
  } from "@ant-design/icons";
  import { Button, Card, Col, Radio, Row, Spin, Tooltip, Modal } from "antd";
  import React, { useEffect, useState, useCallback } from "react";
  import { DataTable, DataTypes } from "../Stepper Form/DataTable";
  import { stripLeadingZeros } from "../Context/helpers";
  import { SearchBox } from "../SearchBox";

  export const NotificationsDeviceList = ({
    handleNext,
    handleDeviceSelection,
    ctx,
    data,
    setData,
    query,
    handleEquipmentSearch,
    selectedDevice,
    setQuery,
    List
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateNotification, setIsCreateNotification] = useState(false);
    //const [data, setData] = useState([]);
  
    useEffect(() => {
      document.body.style.overflow = "hidden";
    }, []);
  
    const handleCheckedUser = () => {
      if (Object.keys(selectedDevice).length) {
        setData(
          data.filter((item) => {
            if (item.Id === selectedDevice.id) {
              item.isActive = true;
            }
            return item;
          })
        );
      }
    };
  
    const getQueryData = async (val) => {
      setIsLoading(true);
      try {
        const res = List
        let ch = List.filter((item) => item.Id === val)
        console.log("printing ch ",ch)
        
        if (res) {
          setIsLoading(false);
          res.forEach((element) => (element.isActive = false));
          setData(res);
          handleCheckedUser();
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    const debounceFunction = (func) => {
      let timer;
      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func(...args);
        }, 900);
      };
    };
    const debounceOptimized = useCallback(debounceFunction(getQueryData), []);
    //let debounceTimeout = null;
  
    //useEffect(() => {
    //handleEquipmentSearch(query)
    // if (query) {
    //   if (debounceTimeout) {
    //     clearTimeout(debounceTimeout);
    //   }
  
    //   debounceTimeout = setTimeout(() => {
    //     getQueryData(query);
    //   }, 500);
    // }
    // }, [query]);
  
    const columns = [
      {
        title: "  ",
        dataIndex: "",
        key: "Id",
        type: DataTypes.CUSTOM,
        width: "2vw",
        render: (text, record) => {
          const handleCheckBox = (e, id) => {
            handleDeviceSelection(record);
            console.log("inside handlecheckbox record ", record)
            let tempData = data.filter((item) => {
              if (item.Id === id) {
                item.isActive = true;
                console.log("printing selected id in tempData ", item.Id)
              } else {
                item.isActive = false;
              }
              return item;
            });
  
            setData(tempData);
          };
          return (
            <div>
              <Radio
                className="radiobox"
                checked={record.isActive}
                onChange={(e) => handleCheckBox(e.target.checked, record.Id)}
              />
            </div>
          );
        },
      },
  
      {
        title: "Admin No",
        dataIndex: "AdminNo",
        key: "AdminNo",
        type: DataTypes.CUSTOM,
        width: "9vw",
        sorter: true,
      },
      {
        title: "Equipment",
        dataIndex: "EquipmentNo",
        key: "EquipmentNo",
        type: DataTypes.CUSTOM,
        width: "5vw",
        sorter: true,
        render: (text, record) => {
          return `${stripLeadingZeros(record.EquipmentNo)}`;
        },
      },
      {
        title: "Model No",
        dataIndex: "ModelNo",
        key: "ModelNo",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
      },
  
      {
        title: "Serial No",
        dataIndex: "SerialNo",
        key: "SerialNo",
        type: DataTypes.CUSTOM,
        width: "5vw",
        sorter: true,
      },
  
      {
        title: "Oper Status",
        dataIndex: "OperStatus",
        key: "OperStatusName",
        type: DataTypes.CUSTOM,
        width: "8vw",
        sorter: true,
        render: (text, record) => {
          return (
            <div className="flex">
              {record.OperStatus ? (
                <Tooltip placement="topLeft" title={record.OperStatusName}>
                  <img
                    src={`/images/icons/api-notifications-icon-${record.OperStatusIcon}.svg`}
                    className="w-1/6 mr-2"
                    alt={record.OperStatusIcon}
                  />
                </Tooltip>
              ) : (
                "-"
              )}
              <span>{record.OperStatusIcon}</span>
            </div>
          );
        },
      },
      {
        title: "Tech Status",
        dataIndex: "TechStatusName",
        key: "TechStatusName",
        type: DataTypes.CUSTOM,
        width: "7vw",
      },
      {
        title: "Description",
        dataIndex: "Description",
        key: "Description",
        type: DataTypes.CUSTOM,
        width: "6vw",
      },
    ];
  
    let actionButtonItems = [
      <span>
        <EditTwoTone /> Edit
      </span>,
      <span>
        <WarningTwoTone /> Delete
      </span>,
    ];
  
    const onNext = () => {
      handleNext();
    };
  
    const LoaderUi = () => {
      const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
      return (
        <div className="h-full flex justify-center items-center">
          <Spin indicator={antIcon} />
        </div>
      );
    };
  
    return (
      <>
        <div
          style={{ background: "#F3F5F8" }}
          className="content  flex-grow pt-10"
        >
          <div className="container px-7">
            <Row className="">
              <Col span={24}>
                <Row>
                  <Col span={6}>
                    <div className="notification-form-left">
                      <div className="form-item">
                        <div className="my-5">
                          <div className="flex flex-col custom-search">
                            <SearchBox
                              value={query}
                              placeholder="Search by Admin No. Serial No. or Description"
                              onChange={(val) => {
                                if (!val) {
                                  setData([]);
                                  setQuery(null);
                                } else {
                                  debounceOptimized(val);
                                  handleEquipmentSearch(val);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
  
            {isLoading && ""}
  
            {data.length > 0 && !isLoading && (
              <DataTable
                // className="bg-transparent deviceListTable "
                columns={columns}
                dataSource={data}
                showActionButton={false}
                onActionButtonClick={(record) => console.log("inside onAction button",record)}
                actionButtonItemClick={(clickedItem) =>
                  setIsCreateNotification(true)
                }
                pagination={false}
                rowKey={"Id"}
              />
            )}
          </div>
        </div>
  
        <Row
          className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
        >
          <Button
            className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
            // className="bg-blue-text border-0 text-white text-center "
            onClick={() => onNext()}
            disabled={!data.filter((item) => item.isActive).length}
          >
            Next
          </Button>
        </Row>
      </>
    );
  };
  
