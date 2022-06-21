import {Layout} from "../Context/Layout";
import moment from "moment";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  RightOutlined,
  CarOutlined,
  BellOutlined,
  BarsOutlined,
  Loading3QuartersOutlined,
  LeftOutlined,
  UserOutlined,
  PlusOutlined,
  DesktopOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { AppContext } from "../Context/AppContext";
import { useHistory, Link, useNavigate } from "react-router-dom";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { FormatDateLocal } from "../Context/helpers";
import { Button, Checkbox, Radio, Row, Tooltip } from "antd";
import { SearchBox } from "../SearchBox";
import { SideDrawer } from "../Wizard/SideDrawer";
import { DiscopsHeaderCard } from "./DiscopsHeaderCard";
import { MaintenanceExpandableView } from "./MaintenanceExpandable";
import { stripLeadingZeros } from "../Context/helpers";
import WorkOrderCreateFlow from "../workorder/WorkOrderCreateFlow";
import { NotificationCreateFlow } from "../Notification Module/NotificationCreateFlow";
import { DispatchCreate } from "../Dispatch/DispatchCreate";

export const DiscopsMaintenanceDashboard = () => { 

    const ctx = useContext(AppContext);
    const history = useNavigate();
    // const [user, setUser] = useState(ctx.userInfo);
    const [syncInfo, setSyncInfo] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [workOrderList, setWorkOrderList] = useState([]);
    const [notificationList, setNotificationList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState();
    const [searchFilter, setSearchFilter] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notificationBoxData, setNotificationBoxData] = useState({});
    const [workOrderBoxData, setWorkOrderBoxData] = useState({});
    const [dispatchBoxData, setDispatchBoxData] = useState({});
    const [showHelpModal, setShowHelpModal] = useState(false);
    // const accessObject = ctx.userInfo.UserAccess;
    const list = [
      {
        AdminNo: "C11",
        LinNo : "N0014",
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
        StatusStrctDesc :"Available",
        StorageLoc: "CEPB",
        SyncCode: 2,
        SyncText: "Pending",
        TechStatus: "Diagonal",
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
        LinNo : "L2020",
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
        ModelNo: "888119",
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
        StatusStrctDesc :"Available",
        Status: 1,
        StorageLoc: "CEP8",
        SyncCode: 2,
        SyncText: "Pending",
        TechStatus: "Dash",
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
        LinNo : "M0066",
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
        ModelNo: "29299",
        OperStatus: "OperStatus 333",
        Priority: "2",
        PriorityName: "2-Medium",
        ProcessStatus: 2,
        ProcessStatusName: "InProcess",
        Remarks: "test",
        SerialNo: "010520",
        StatusStrctDesc :"Dispatced",
        Status: 1,
        SyncCode: 2,
        SyncText: "Pending",
        TechStatus: "CX",
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
        LinNo : "L0011",
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
        ModelNo: "20056",
        OperStatus: "OperStatus 223",
        Priority: "2",
        PriorityName: "2-Medium",
        ProcessStatus: 2,
        ProcessStatusName: "InProcess",
        Remarks: "tech statsus",
        SerialNo: "109516",
        Status: 1,
        SyncCode: 2,
        StatusStrctDesc :"Available",
        SyncText: "Pending",
        TechStatus: "X",
        TechStatusIcon: "TICL",
        TechStatusName: "TICL-TI Cleared",
        Type: "M1",
        TypeName: "M1-Maintenance Request",
        UpdatedBy: "DEVUSER1@shipcomwireless.com",
        UpdatedOn: "2022-05-09 04:36:17",
        WorkOrderNo: "WORK-123",
      },
    ];
    const getSyncInfo = async () => {
      const syncList = {
        LastSyncedOn : "07-06-2022",
        OrgStatus : "CP9NAST - 2022-06-07 07:00:00",
        OrgName : "WAHAOCO ",
      }
      const response = syncList
      console.log("priting response inside getSyncInfo function ",response);
      if (response) {
          setSyncInfo(response);
      }
    };

    const getEquipmentList = async () => {
      const queryParams = {
        search: searchFilter || undefined,
      };
      const response = list
      console.log("priting response inside getEquipmentList function ",response);
      var newList = response.filter((item)=>{
        return item.AdminNo.toLowerCase().indexOf(queryParams.search) > -1;
      })
     
      if (queryParams.search === undefined && response) {
        console.log("printing inside if condition of getEquipmentList function ");
        setEquipmentList(response);
        let dispBoxData = {
          Total: response.length,
          Available: 0,
          Dispatched: 0,
        };
        response.forEach((eq) => {
          if (eq.StatusStrctDesc === "Available") {
            dispBoxData.Available = dispBoxData.Available + 1;
          } else if (eq.StatusStrctDesc === "Dispatced") {
            dispBoxData.Dispatched = dispBoxData.Dispatched + 1;
          }
        });
        setDispatchBoxData(dispBoxData);
      }
      else{
        console.log("printing inside if condition of getEquipmentList function ");
        setEquipmentList(newList);
        let dispBoxData = {
          Total: newList.length,
          Available: 0,
          Dispatched: 0,
        };
        newList.forEach((eq) => {
          if (eq.StatusStrctDesc === "Available") {
            dispBoxData.Available = dispBoxData.Available + 1;
          } else if (eq.StatusStrctDesc === "Dispatced") {
            dispBoxData.Dispatched = dispBoxData.Dispatched + 1;
          }
        });
        setDispatchBoxData(dispBoxData);
      }
    };
    const getWorkOrderList = async () => {
      const queryParams = {
        search: searchFilter || undefined,
      };
      const response = list
      if (response) {
        setWorkOrderList(response);
      }
    };
    const getNotificationsList = async () => {
      const response = list
      if (response) {
        setNotificationList(response);
  
        let notifBoxData = {
          Total: response.length,
          X: 0,
          CX: 0,
          Dash: 0,
          Diagonal: 0,
        };
  
        response.forEach((notif) => {
          if (notif.TechStatus === "X") {
            notifBoxData.X = notifBoxData.X + 1;
          } else if (notif.TechStatus === "CX") {
            notifBoxData.CX = notifBoxData.CX + 1;
          } else if (notif.TechStatus === "Dash") {
            notifBoxData.Dash = notifBoxData.Dash + 1;
          } else if (notif.TechStatus === "Diagonal") {
            notifBoxData.Diagonal = notifBoxData.Diagonal + 1;
          }
          // notifBoxData.Total + 1;
        });
        setNotificationBoxData(notifBoxData);
      }
    };
  
    const handleCheckBox = (checked, id) => {
      if (checked === true) {
        setSelectedEquipment(id);
      } else {
        setSelectedEquipment(null);
      }
    };
  
    useEffect(() => {
      getSyncInfo();
      getEquipmentList();
      getWorkOrderList();
      getNotificationsList();
    }, []);
  
    useEffect(() => {
      getEquipmentList();
    }, [searchFilter]);
  
    // const onDispatchClick = () => {
    //   // setIsModalVisible(true);
    //   if (!selectedEquipment) {
    //     history({
    //         pathname:"/dispatchcreate",
    //         state: { startFlow: true },
    //       });
    //   } else {
    //     history({
    //       pathname: "/dispatchcreate",
    //       state: { selectedEquipment: selectedEquipment },
    //     });
    //   }
    // };
  
    // const onNotificationClick = () => {
    //   if (!selectedEquipment) {
    //     history({
    //       pathname: "/notification",
    //       state: { startFlow: true },
    //     });
    //   } else {
    //     console.log("printing selectedEquipment in onNotificationClick function ",selectedEquipment);
    //     history({
    //       pathname: "/notification",
    //       state: { selectedEquipment: selectedEquipment },
    //     });
    //   }
    // };
  
    // TODO: finish this

    // const onWorkOrderClick = () => {
    //   if (!selectedEquipment) {
    //     history({
    //       pathname: "/workorder",
    //       state: { startFlow: true },
    //     });
    //   } else {
    //     // setIsModalVisible(true);
    //     history({
    //       pathname: "/workorder",
    //       state: { selectedEquipment: selectedEquipment },
         
    //     });
    //   }
    // };
  
    // const onTempHomeClick = () => {
    //   history.push("/tempHome");
    // };
  
    const techStatusObj = {
      BIO: "/images/icons/api-notifications-icon-bio.svg",
      CHEM: "/images/icons/api-notifications-icon-chem.svg",
      CX: "/images/icons/api-notifications-icon-cx.svg",
      DA: "/images/icons/api-notifications-icon-da.svg",
      DI: "/images/icons/api-notifications-icon-di.svg",
      E: "/images/icons/api-notifications-icon-e.svg",
      NUKE: "/images/icons/api-notifications-icon-nuke.svg",
      TICL: "/images/icons/api-notifications-icon-ticl.svg",
      CLR: "/images/icons/api-notifications-icon-ticl.svg",
      X: "/images/icons/api-notifications-icon-x.svg",
    };
  
    const columns = [
      {
        title: "  ",
        dataIndex: "",
        key: "Id",
        type: DataTypes.CUSTOM,
        width: "2vw",
        render: (text, record) => {
          return (
            <div>
              <Checkbox
                className="radiobox focus:border-iron"
                checked={selectedEquipment === record}
                onChange={(e) => handleCheckBox(e.target.checked, record)}
              />
            </div>
          );
        },
      },
      {
        title: "LIN NO.",
        dataIndex: "LinNo",
        key: "LinNo",
        type: DataTypes.CUSTOM,
        width: "4vw",
        sorter: true,
      },
      {
        title: "ADMIN NO.",
        dataIndex: "AdminNo",
        key: "AdminNo",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
      },
      {
        title: "EQUIPMENT DESC.",
        dataIndex: "Description",
        key: "Description",
        type: DataTypes.CUSTOM,
        width: "8vw",
        sorter: true,
      },
      {
        title: "MODEL NO.",
        dataIndex: "ModelNo",
        key: "ModelNo",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
      },
      {
        title: "OPER STATUS",
        dataIndex: "OperStatus",
        key: "OperStatus",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
        render: (text, record) => {
          return (
            <div>
              <Tooltip
                placement="topLeft"
                title={record.OperStatusName}
                className="flex flex-row items-center"
              >
                {record.OperStatus ? (
                  <img
                    src={`/images/icons/api-notifications-icon-${record.OperStatus}.svg`}
                    className="w-1/6 mr-2"
                    alt={record.OperStatusIcon}
                  />
                ) : (
                  "-"
                )}
                <span>{record.OperStatusIcon}</span>
              </Tooltip>
            </div>
          );
        },
      },
  
      {
        title: "TECH STATUS",
        dataIndex: "TechStatus",
        key: "TechStatus",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
        render: (text, record) => {
          return (
            <div className="flex">
              <Tooltip
                placement="topLeft"
                title={record.TechStatusName}
                className="flex flex-row items-center"
              >
                {record.TechStatus ? (
                  <img
                    src={`/images/icons/api-notifications-icon-${record.TechStatus}.svg`}
                    className="w-1/6 mr-2"
                    alt={record.TechStatusIcon}
                  />
                ) : (
                  ""
                )}
                <span>{record.TechStatus}</span>
              </Tooltip>
            </div>
          );
        },
      },
  
      {
        title: "STATUS STRCT DES.",
        dataIndex: "StatusStrctDesc",
        key: "StatusStrctDesc",
        type: DataTypes.CUSTOM,
        width: "9vw",
        sorter: true,
        render: (text, record) => {
          return (
            <>
              {record.StatusStrctDesc ? (
                <div
                  className={`text-center rounded-full border text-xs px-1 w-32 ${
                    record.StatusStrctDesc === "Available"
                      ? "text-success-text border-success-text"
                      : ""
                  }`}
                >
                  {record.StatusStrctDesc}
                </div>
              ) : (
                <div>-</div>
              )}
            </>
          );
        },
      },
      {
        title: "EQUIPMENT NO.",
        dataIndex: "EquipmentNo",
        key: "EquipmentNo",
        type: DataTypes.CUSTOM,
        width: "9vw",
        sorter: true,
        render: (text, record) => {
          return `${stripLeadingZeros(record.EquipmentNo)}`;
        },
      },
    ];

    return (
        <Layout
        showHelp={true}
        helpText={"Help"}
        helpIcon={<QuestionCircleOutlined />}
        // onHelpClick={() => toggleHelp()}
        // helpToggle={showHelpModal}
        // helpTemplate={<DiscopsDashboardHelp />}
      >
           {/* DATE & NAME */}
      <div className="px-3">
        <div className="w-full flex flex-row items-end space-x-4 mb-4">
          <img
            src="/images/logo.png"
            alt="logo"
            className="my-auto h-auto w-35"
            style={{ width: "220px" }}
            // onClick={() => onTempHomeClick()}
          />
          <div className="flex-grow" />
          <div className="rounded-md bg-white p-3 text-center border-iron w-52 flex flex-row items-center h-14 flex-grow">
            <div className="text-daisy-bush font-semibold text-center w-full">
                Last Synced: {FormatDateLocal(syncInfo.LastSyncedOn, "Not Available")}
                {/* Last Synced: 07-June-2022 */}
            </div>
          </div>

          <div className="rounded-md bg-white p-3 text-center border-iron w-52 flex flex-row items-center h-14 flex-grow">
            <div className="text-daisy-bush font-semibold text-center w-full">
                          {syncInfo.OrgName} : {syncInfo.OrgStatus}
                          {/* WAHAOCO : Anish Shipcom Dashboard */}
            </div>
          </div>
        </div>

        {/* SUMMARY BAR */}
        <div className="flex flex-row w-full space-x-4">
          <DiscopsHeaderCard
            icon={<CarOutlined />}
            mainTitle="Dispatch"
            iconBgColor="dash-purple-light"
            iconColor="dash-purple-dark"
            mainValue={dispatchBoxData.Total || 0}
            subTitleOne="Available"
            subValueOne={dispatchBoxData.Available || 0}
            subTitleTwo="Dispatched"
            subValueTwo={dispatchBoxData.Dispatched || 0}
            onCardClick={() => history("/home/dispatch")}
          />
          <DiscopsHeaderCard
            icon={<BellOutlined />}
            mainTitle="Notifications"
            iconBgColor="dash-peach-light"
            iconColor="dash-peach-dark"
            mainValue={notificationList.length || 0}
            subTitleOne="X"
            subValueOne={notificationBoxData.X || 0}
            subTitleTwo="CX"
            subValueTwo={notificationBoxData.CX || 0}
            subTitleThree="Dash"
            subValueThree={notificationBoxData.Dash || 0}
            subTitleFour="Diagonal"
            subValueFour={notificationBoxData.Diagonal || 0}
            onCardClick={() => history("/home/notifications")}
          />
          <DiscopsHeaderCard
            icon={<BarsOutlined />}
            mainTitle="Work Orders"
            iconBgColor="dash-green-light"
            iconColor="dash-green-dark"
            mainValue={workOrderList.length || 0}
            subTitleOne="NMCM"
            subValueOne="1"
            subTitleTwo="NMCS"
            subValueTwo="0"
            subTitleThree="PMCM"
            subValueThree="1"
            subTitleFour="PMCS"
            subValueFour="0"
            onCardClick={() => history("/home/workorder")}
          />

          <DiscopsHeaderCard
            icon={<BarsOutlined />}
            mainTitle="Work In Process"
            iconBgColor="dash-green-light"
            iconColor="dash-green-dark"
            mainValue={workOrderList.length || 0}
            subTitleOne="NMCM"
            subValueOne="1"
            subTitleTwo="NMCS"
            subValueTwo="0"
            subTitleThree="PMCM"
            subValueThree="1"
            subTitleFour="PMCS"
            subValueFour="0"
            onCardClick={() => history("/home/workorderinprocess")}
          />

          <DiscopsHeaderCard
            icon={<Loading3QuartersOutlined />}
            mainTitle="Parts Status"
            iconBgColor="dash-blue-light"
            iconColor="dash-blue-dark"
            mainValue="108"
            subTitleOne="Allocated"
            subValueOne="70"
            subTitleTwo="Shortage"
            subValueTwo="23"
            onCardClick={() => console.log("todo")}
          />
        </div>

        {/* BODY HEADER */}
        <Row className="bg-white px-8 py-6 mt-6 rounded-md">
          <div className="w-full text-daisy-bush font-semibold text-xl">
            All Equipment
          </div>
          <div className="my-1 text-gray">{`${equipmentList.length} Equipments`}</div>
          <div className="w-full flex flex-row mt-6 mb-8">
            {/* <div style={{ width: "27%" }}> */}
            <div className="flex custom-search">
              <SearchBox
                placeholder="Search by Admin No., Serial No., or Description"
                value={searchFilter}
                onChange={(val) => setSearchFilter(val)}
              />
              {/* </div> */}
            </div>
            
            <div className="flex-grow" />
            <div className="flex flex-row space-x-4">
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                // onClick={() => onDispatchClick()}
                // TODO: UNCOMMENT WITH API and check name
                // disabled={!accessObject.includes("PostDispatch")}
                onClick={() => setIsModalVisible(true)}
              >
                <PlusOutlined />
                Dispatch
              </Button>
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                // onClick={() => onNotificationClick()}
                // disabled={!accessObject.includes("PostNotification")}
                onClick={() => setIsModalVisible(true)}
              >
                <PlusOutlined />
                Notification
              </Button>
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                // onClick={() => onWorkOrderClick()}
                onClick={() => setIsModalVisible(true)}
                // disabled={!accessObject.includes("PostWorkOrder")}
              >
                <PlusOutlined />
                Work Order
              </Button>
            </div>
          </div>

          {/* BODY CONTENT */}
          {equipmentList.length > 0 ? (
            <div className="bg-athens-gray p-2 rounded-md w-full">
              <DataTable
                columns={columns}
                dataSource={equipmentList}
                pagination={true}
                showViewMoreExpandable={true}
                expandIconColumnIndex={10}
                expandableView={MaintenanceExpandableView}
                rowKey={"Id"}
              />
            </div>
          ) : (
            <div className="w-full text-center text-3xl text-iron pt-24 mb-6">
              No Equipment Found
            </div>
          )}
        </Row>
      </div>
      <SideDrawer
        showModal={openFilter}
        isFooterVisible={null}
        wrapperClassName=" custom-modal left-search-bar animate-right "
        hideCancel={true}
        hideCui={true}
      >
        <div>Filters go here</div>
        <Button onClick={() => setOpenFilter(false)}>Close</Button>
      </SideDrawer>  
      {/* from here i am doing experiment */}
      {isModalVisible && ( 
          <SideDrawer
          showModal={isModalVisible}
          title="Create Work Order"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => {
            setIsModalVisible(false);
            document.body.classList.remove("no-body-scroll");
          }}
          >
            <WorkOrderCreateFlow 
            // resp = {data}
            // showModal={() => setUpdateNotificationModel(true)}
            onClose={() => setIsModalVisible(false)}
            />
          </SideDrawer>
        )}
        {isModalVisible && (
        <SideDrawer
          showModal={true}
          title="Create Notification"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => setIsModalVisible(false)}
        >
          <NotificationCreateFlow
            onClose={() => {
              setIsModalVisible(false);
              // getNotificationList();
            }}
          />
        </SideDrawer>
      )}
       {isModalVisible && (
        <SideDrawer
          showModal={true}
          title="Create Notification"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => setIsModalVisible(false)}
        >
          <DispatchCreate
            onClose={() => {
              setIsModalVisible(false);
              // getNotificationList();
            }}
          />
        </SideDrawer>
      )}

      <Link to={"/home/createpurchase1"}> createPurchase</Link> 
      </Layout>    
    )
}
