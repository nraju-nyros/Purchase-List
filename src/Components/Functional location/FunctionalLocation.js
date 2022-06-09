import { Button, Tooltip } from "antd";
import { useState, useEffect, useContext } from "react";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";
import { Layout } from "../Context/Layout";
import { AppContext } from "../Context/AppContext";
import { FunctionalLocationReportExpandedView } from "./FunctionlLocationReportExpandedView";

export const FunctionalLocation = () => {
  const ctx = useContext(AppContext);
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState();
  const [searchValue, setSearchValue] = useState("");
  const toggleExpandParent = (expanded, record) => {
    if (expanded) {
        console.log("printing record inside toggleExpandParent ", record);
      getEquipmentList(record);
    }
  };

  const functionList = [
    {
      AdminNo: "WAH0C0-CM15019",
      Description: "SIGHT BORE OPT M150 (Qty:1)",
      EquipmentDescription: "SIGHT BORE OPT M150",
      Id: "___1011133215",
      MaintPlant: "2000",
      OrgCode: "WAH0C0",
      ParentId: "",
      ParentPosition: "",
      SerialNo: "563743",
      Status: 1,
      StructIndicator: "GR",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:30:11",
    },
    {
        AdminNo: "WAH0C0-CM15023",
        Description: "SIGHT BORE OPT M150 (Qty:1)",
        EquipmentDescription: "SIGHT BORE OPT M150",
        Id: "___1011133779",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "",
        ParentPosition: "",
        SerialNo: "563758",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
    },
    {
      AdminNo: "WAH0C0-",
      Description: "ILLUMIN INFRARED (Qty:1)",
      EquipmentDescription: "ILLUMIN INFRARED",
      Id: "___1011181300",
      MaintPlant: "2000",
      OrgCode: "WAH0C0",
      ParentId: "",
      ParentPosition: "",
      SerialNo: "166940",
      Status: 1,
      StructIndicator: "GR",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:30:04",
    },
    {
      AdminNo: "WAH0C0-",
      Description: "ILLUMINATOR INTEGRA (Qty:1)",
      EquipmentDescription: "ILLUMINATOR INTEGRA",
      Id: "___1011192897",
      MaintPlant: "2000",
      OrgCode: "WAH0C0",
      ParentId: "",
      ParentPosition: "",
      SerialNo: "00028237",
      Status: 1,
      StructIndicator: "GR",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:30:03",
    },
    {
      AdminNo: "WAH0C0-",
      Description: "ILLUMINATOR INTEGRA (Qty:1)",
      EquipmentDescription: "ILLUMINATOR INTEGRA",
      Id: "___1011194620",
      MaintPlant: "2000",
      OrgCode: "WAH0C0",
      ParentId: "",
      ParentPosition: "",
      SerialNo: "00012492",
      Status: 1,
      StructIndicator: "GR",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:29:57",
    },
    {
      AdminNo: "WAH0C0-",
      Description: "ILLUMINATOR INTEGRA (Qty:1)",
      EquipmentDescription: "ILLUMINATOR INTEGRA",
      Id: "___1011195140",
      MaintPlant: "2000",
      OrgCode: "WAH0C0",
      ParentId: "",
      ParentPosition: "",
      SerialNo: "00012620",
      Status: 1,
      StructIndicator: "GR",
      UpdatedBy: "SapService",
      UpdatedOn: "2022-05-07 21:29:56",
    },
  ];
const equipmentlist = [
    {
        Description: "AAL: sequence 1 (Qty:1)",
        Id: "___1011133779-___1011133215",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011133215",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
      {
        Description: "AAL: sequence 2 (Qty:1)",
        Id: "___1011133779-___1011133779",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011133779",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
      {
        Description: "AAL: sequence 3 (Qty:1)",
        Id: "___1011133779-___1011181300",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011181300",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
      {
        Description: "AAL: sequence 6 4 (Qty:1)",
        Id: "___1011133779-___1011192897",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011192897",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
      {
        Description: "AAL: sequence 5 (Qty:1)",
        Id: "___1011133779-___1011194620",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011194620",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
      {
        Description: "AAL: sequence 6 (Qty:1)",
        Id: "___1011133779-___1011195140",
        MaintPlant: "2000",
        OrgCode: "WAH0C0",
        ParentId: "___1011195140",
        ParentPosition: "3",
        Status: 1,
        StructIndicator: "GR",
        UpdatedBy: "SapService",
        UpdatedOn: "2022-05-07 21:30:11",
      },
     
]
  const getEquipmentList = async (record) => {
    let queryParams = { ParentID: record.Id, UseAdvancedFilter: true };
    const response = equipmentlist
    console.log("printing response of getEquipmentList ",response);
    
    console.log("printing response of record.Id  ",record.Id);
    if (response && response.length) {
      let vals = response.map((e) => {
        console.log("printing response Id of getEquipmentList ",e.ParentId);
        if (e.ParentId === record.Id) {
          e = e;
          console.log("printing e inside if condition of getEquipmentList ",e);
          return e;
        } 
        else {
          console.log("printing e inside else condition of getEquipmentList ",e);
          return e;
        }
      });
      setEquipmentList(vals);
    }
  };

  const getFunctionalList = async (searchBy = searchValue) => {
    let advFilter;
    if (searchBy == "") {
      advFilter = true;
    } else {
      advFilter = false;
    }
    setIsLoading(true);
    const queryParams = {
      Roots: true,
      UseAdvancedFilter: advFilter,
      Search: searchBy,
    };
    const response = functionList
    console.log("printing response of getFunctionalList ",response);
    if (response) {
      setEquipmentList(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFunctionalList();
  }, []);

  const functionalReportColumns = [
    {
      title: "Functional Location",
      dataIndex: "Id",
      key: "Id",
      type: DataTypes.CUSTOM,
      sorter: true,
      width: "10vw",
      render: (Id) => (
        <Tooltip placement="top" title="Functional Location">
          {Id}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      sorter: true,
      width: "20vw",
      render: (Description) => (
        <Tooltip placement="top" title="Description">
          {Description}
        </Tooltip>
      ),
    },
    {
      title: "Org Code",
      dataIndex: "OrgCode",
      key: "OrgCode",
      type: DataTypes.CUSTOM,
      width: "9vw",
      sorter: true,
      render: (OrgCode) => (
        <Tooltip placement="top" title="Org Code">
          {OrgCode}
        </Tooltip>
      ),
    },
    {
      title: "Struct Indicator",
      dataIndex: "StructIndicator",
      key: "StructIndicator",
      type: DataTypes.CUSTOM,
      sorter: true,
      width: "5vw",
      render: (StructIndicator) => (
        <Tooltip placement="top" title="Struct Indicator">
          {StructIndicator}
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      type: DataTypes.CUSTOM,
      sorter: true,
      width: "2vw",
      render: (Status) => (
        <Tooltip placement="top" title="Status">
          {Status}
        </Tooltip>
      ),
    },
  ];

  const NoContent = () => {
    return (
      <div className="m-10 text-center">
        <h6>No Records found</h6>
      </div>
    );
  };

  return (
    <Layout
      showSearch={true}
      title="Functional Location Report"
      searchText="Serach By Equipment No."
      onSearchChange={(value) => {
        if (value.length > 2 || value.length == 0) {
          setSearchValue(value);
          getFunctionalList(value);
        }
      }}
    >
      <DataTable
        noDataFound={NoContent}
        rowClassName="parent-row-bg"
        columns={functionalReportColumns}
        dataSource={equipmentList}
        pagination={true}
        showViewMoreExpandable={true}
        expandIconColumnIndex={8}
        expandableView={FunctionalLocationReportExpandedView}
        onExpand={toggleExpandParent}
        showHeader={false}
        rowKey={"Id"}
      />
    </Layout>
  );
};
