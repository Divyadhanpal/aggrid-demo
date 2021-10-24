import React, { Component,useState} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-enterprise';



export const App = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [remarks, saveRemarks] = useState('')
  const { onSelect, tableData } = props
  const selectRow = (item) =>
  {
  setSelectedRow(item)
  onSelect(item)
  }
  const statusAggFunc = params => {
  const status = params. values
  if(status. includes ('TVPC PENDING ACK' )){
  return "TVPC. Exception Pending"
  // console log("status", status)
  return 'Tvpc Pending, Approval'
  };
}
  const apiJson =[{
    "entityCode": "GEMDBK610",
"counterPartyGrid":"123456",
"valueDate":"2021-07-01",
"runningTotalUsd":500000.00,
"version" :0,
"settlements":[
  {
  "version":0,
  "dbPk":1,
  "ourEntityBerId":7,
  "status": "TVPC PENDING ACK",
  "entityCode" : "GBMDBK610",
  "entityName": "HSBC HSBC BANK PLC LONDON",
  "entitySettlementMethod" : "SWIFT STD",
  "entityBerSsiid": "value",
  "entityBerSsiVersion": "value",
  "counterPartyGRID":"123456",
  "counterPartyBerId": "value",
  "counterPartyName": "value",
  "ackBy": "value",
  "approvedBy": "value"
  },
  {
    "version":0,
    "dbPk":2,
    "ourEntityBerId":7,
    "entityCode" : "GBMDBK610",
    "status": "TVPC PENDING ACK",
    "entityName": "HSBC, HSBC BANK PLC LONDON",
    "entitySettlementMethod": "SWIFT _STD",
    "entityBerSsiid": "value",
    "entityBerSsiVersion":"value",
    "counterPartyGRID":"123456",
    "counterPartyBerld": "value",
    "counterPartyName": "value",
    "ackBy": "value",
    "approvedBy" : "value"
  }]
  
  },
  {
    "entityCode": "GEMDBK611",
"counterPartyGrid":"123456",
"valueDate":"2021-07-01",
"runningTotalUsd":500000.00,
"version" :1,
"settlements":[
  {
  "version":1,
  "dbPk":1,
  "ourEntityBerId":7,
  "status": "TVPC PENDING ACK",
  "entityCode" : "GBMDBK611",
  "entityName": "HSBC HSBC BANK PLC LONDON",
  "entitySettlementMethod" : "SWIFT STD",
  "entityBerSsiid": "value",
  "entityBerSsiVersion": "value",
  "counterPartyGRID":"123456",
  "counterPartyBerId": "value",
  "counterPartyName": "value",
  "ackBy": "value",
  "approvedBy": "value"
  },
  {
    "version":1,
    "dbPk":2,
    "ourEntityBerId":7,
    "entityCode" : "GBMDBK611",
    "status": "TVPC PENDING ACK",
    "entityName": "HSBC, HSBC BANK PLC LONDON",
    "entitySettlementMethod": "SWIFT _STD",
    "entityBerSsiid": "value",
    "entityBerSsiVersion":"value",
    "counterPartyGRID":"123456",
    "counterPartyBerld": "value",
    "counterPartyName": "value",
    "ackBy": "value",
    "approvedBy" : "value"
  }]
  
  },
  {
    "entityCode": "GEMDBK612",
"counterPartyGrid":"123456",
"valueDate":"2021-07-01",
"runningTotalUsd":500000.00,
"version" :1,
"settlements":[
  {
  "version":1,
  "dbPk":1,
  "ourEntityBerId":7,
  "status": "TVPC PENDING ACK",
  "entityCode" : "GBMDBK612",
  "entityName": "HSBC HSBC BANK PLC LONDON",
  "entitySettlementMethod" : "SWIFT STD",
  "entityBerSsiid": "value",
  "entityBerSsiVersion": "value",
  "counterPartyGRID":"123456",
  "counterPartyBerId": "value",
  "counterPartyName": "value",
  "ackBy": "value",
  "approvedBy": "value"
  },
  {
    "version":1,
    "dbPk":2,
    "ourEntityBerId":7,
    "entityCode" : "GBMDBK612",
    "status": "TVPC PENDING ACK",
    "entityName": "HSBC, HSBC BANK PLC LONDON",
    "entitySettlementMethod": "SWIFT _STD",
    "entityBerSsiid": "value",
    "entityBerSsiVersion":"value",
    "counterPartyGRID":"123456",
    "counterPartyBerld": "value",
    "counterPartyName": "value",
    "ackBy": "value",
    "approvedBy" : "value"
  }]
  
  },
  {
    "entityCode": "GEMDBK613",
"counterPartyGrid":"123456",
"valueDate":"2021-07-01",
"runningTotalUsd":500000.00,
"version" :1,
"settlements":[
  {
  "version":1,
  "dbPk":1,
  "ourEntityBerId":7,
  "status": "TVPC PENDING ACK",
  "entityCode" : "GBMDBK613",
  "entityName": "HSBC HSBC BANK PLC LONDON",
  "entitySettlementMethod" : "SWIFT STD",
  "entityBerSsiid": "value",
  "entityBerSsiVersion": "value",
  "counterPartyGRID":"123456",
  "counterPartyBerId": "value",
  "counterPartyName": "value",
  "ackBy": "value",
  "approvedBy": "value"
  },
  {
    "version":1,
    "dbPk":2,
    "ourEntityBerId":7,
    "entityCode" : "GBMDBK613",
    "status": "TVPC PENDING ACK",
    "entityName": "HSBC, HSBC BANK PLC LONDON",
    "entitySettlementMethod": "SWIFT _STD",
    "entityBerSsiid": "value",
    "entityBerSsiVersion":"value",
    "counterPartyGRID":"123456",
    "counterPartyBerld": "value",
    "counterPartyName": "value",
    "ackBy": "value",
    "approvedBy" : "value"
  }]
  
  }
];

const gridJson =[];
const doubleValue = apiJson.map((elem) =>{
const { entityCode, counterPartyGrid, valueDate, runningTotalUsd, version, ...rest} = elem;
rest.settlements.forEach(child =>{
const obj = {entityCode, counterPartyGrid, valueDate, runningTotalUsd, version, ...child};
console.log(obj, "obj")
gridJson.push(obj);
});
return true
});
console.log('gridJson',gridJson)
const gridOptions = {

columnDefs:[
{
field:"entityCode",
sortable: true,
unSortIcon: true,
hide:true,
rowGroup:true,
pinned: "left",
maxWidth:300,
lockPinned: true,
filter: "agTextColumnFilter"
},
{
  field:"status",
  sortable: true,
  unSortIcon: true,
  pinned: "left",
  lockPinned: true,
  maxwidth:300,
  aggFunc: statusAggFunc,
  filter : "agTextColumnFilter",
  //cellendererFramework: statusBadgeRender
},
{
  field: 'counterPartyGrid',
  sortable: true,
  unSortIcon: true,
  pinned: "left",
  lockPinned: true,
  maxWidth:300,
  aggFune: "first",
  filter :"agTextColumnFilter"
},
{
  field: 'VAR.valueDate',
  sortable: true,
  unSortIcon: true,
  pinned: "left",
  lockPinned: true,
  aggFunc: 'first',
  maxWidth:300,
  filter: 'agDateColumnFilter',
  filterParams:{
  // provide comparator function
  comparator: (filterLocalDateAtMidnight, cellValue) => {
  const dateAsString = cellValue;
  if (dateAsString == null) {
  return 0
  }
  // In the example application, dates are stored as dd/mm/yyyy
  // We create a Date object for comparison against the filter date
  const dateParts = dateAsString.split( '/');
  const day = Number (dateParts[2]);
  const month = Number (dateParts[1]) - 1;
  const year = Number (dateParts[0]);
  const cellDate = new Date(year, month, day);
  // Now that both parameters are Date objects, we can compare
  if (cellDate < filterLocalDateAtMidnight) {
  return -1;
  }
  if (cellDate > filterLocalDateAtMidnight) {
  return 1;
  }
  return 0;
  }
  
  }
},
{
  field: 'runningTotalUsd',
  sortable: true,
  unSortIcon: true,
  pinned: 'left',
  lockPinned: true,
  maxidth:300,
  aggFunc:"sum",
  filter:"agNumberColumnFilter"
},
{
  field: 'entityBerid',
  sortable: true,
  unSortIcon: true,
  suppressMovable:true,
  field: 'counterPartyName',
  sortable: true,
  unSortIcon: true,
  suppressMovable:true
},
{

field: 'settlementId',
sortable: true,
unSorticon: true,
suppressMovable:true
},
{
  field: 'uti',
  sortable: true,
  unSortlcon: true,
  suppressMovable:true
},
{
  field: 'VAR.settlementStatus',
  sortable: true,
  unSortIcon: true,
  suppressMovable:true
},
{
  field: 'VAR.pta',
sortable: true,
unSortIcon: true,
suppressMovable:true
},
{
  field:'createdUser',
sortable: true,
unSortIcon: true,
suppressMovable:true,
},
{
field: 'VAR.approveby',
sortable: true,
unSortIcon: true,
suppressMovable:true
}
]
}

// const onGridReady = (params) => {
//   setGridApi(params,api);
//   setGridColumnApi(params,columnApi);
//   const updateData = (data) => {
//     setRowData(data);
//   }
// }

  return (
    <div
                className="ag-theme-balham"
                style={{ height: '650px', width: '1200px' }}
            >
  <AgGridReact className=""
  columnDefs={gridOptions.columnDefs}
  defaultColDef={{
  flex: 1,
  minWidth: 100,
  enablePivot: true,
  filter: true
  }}
  autoGroupColumnDef={{
  headerName:"GridId",
  field:"entityCode",
  pinned: "left",
  lockPinned: true,
  minhidth: 250,
  cellRenderer:"agGroupCellRenderer",
  cellRendererParams: { checkbox: true,},
  }}
  rowSelection='multiple'
  groupSelectsChildren
  suppressRowClickSelection
  suppressAggFuncInHeader
  // suppressAggFilteredOnly
  //onGridReady={onGridReady}
  rowData={gridJson}
  onRowDoubleClicked={(item) => selectRow(item)}
  groupSelectsFiltered
  />
</div>
  );


}

export default  (App)


  

  