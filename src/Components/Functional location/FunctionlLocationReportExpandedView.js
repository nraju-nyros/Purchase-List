import React, { useCallback, useEffect, useState, useContext } from "react";
import { Button, Tooltip } from "antd";
import { AppContext } from "../Context/AppContext";
import { DataTable, DataTypes } from "../Stepper Form/DataTable";

export const FunctionalLocationReportExpandedView = (record) => {
    const ctx = useContext(AppContext);
    console.log("inside functionLocalReportExpandedView on top")
    const toggleExpand = (expanded, record) => {
      if(expanded) {
        console.log("printing record inside toggleExpand ", record.Id);
        getEquipmentList(record.Id);
      }
    }
    const equipmentLists = [
      {
        Description: "AAL: sequence 1 (Qty:1)",
        Id: "___1011133779-014712091",
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
        Id: "___1011133779-014712091",
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
        Id: "___1011133779-014712091",
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
        Id: "___1011133779-014712091",
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
        Id: "___1011133779-014712091",
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
        Id: "___1011133779-014712091",
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
    const getEquipmentList = async (id) => {
      let queryParams = {ParentID: id, }
      const response = equipmentLists
      console.log("printing equipmentList inside getEquipmentList of functionalLocationExpanded ", response);
      if (response) {
        record = response
        console.log("printing record inside getEquipmentList of functionalLocationExpanded ", record);
      }
    }
    
  
    const functionalReportColumns = [
      {
        title: "Id",
        dataIndex: "Id",
        key: "Id",
        type: DataTypes.CUSTOM,
        width: "7vw",
        sorter: true,
        render: Id => (
          <Tooltip placement="top" title="Id">
            {Id}
          </Tooltip>
        )
      },
      {
        title: "Description",
        dataIndex: "Description",
        key: "Description",
        type: DataTypes.CUSTOM,
        width: "8vw",
        sorter: true,
        render: Description => (
          <Tooltip placement="top" title="Description">
            {Description}
          </Tooltip>
        )
      },
      {
        title: "System Status",
        dataIndex: "Status",
        key: "Status",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
        render: Status => (
          <Tooltip placement="top" title="Status">
            {Status}
          </Tooltip>
        )
      },
      {
        title: "Struct Indicator",
        dataIndex: "StructIndicator",
        key: "StructIndicator",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
        render: StructIndicator => (
          <Tooltip placement="top" title="StructIndicator">
            {StructIndicator}
          </Tooltip>
        )
      },
      {
        title: "Org Code",
        dataIndex: "OrgCode",
        key: "OrgCode",
        type: DataTypes.CUSTOM,
        width: "6vw",
        sorter: true,
        render: OrgCode => (
          <Tooltip placement="top" title="OrgCode">
            {OrgCode}
          </Tooltip>
        )
      },
      {
        title: "Maint Plant",
        dataIndex: "MaintPlant",
        key: "MaintPlant",
        type: DataTypes.CUSTOM,
        width: "5vw",
        sorter: true,
        render: MaintPlant => (
          <Tooltip placement="top" title="MaintPlant">
            {MaintPlant}
          </Tooltip>
        )
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
      <>
        <div className='child-table'>
          <DataTable
            noDataFound={NoContent}
            rowClassName="child-row-bg"
            dataSource={record}
            columns={functionalReportColumns}
            pagination={false}
            showHeader={false}
            showViewMoreExpandable={true}
            expandIconColumnIndex={8}
            expandableView={FunctionalLocationReportExpandedView}
            onExpand={toggleExpand}
            rowKey={"SerialNo"}
          />
        </div>
      </>
    );
  };




