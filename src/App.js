import React, { Component, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";


export const App = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [remarks, saveRemarks] = useState("");
  const { onSelect, tableData } = props;
  const selectRow = (item) => {
    setSelectedRow(item);
    onSelect(item);
  };
  const statusAggFunc = (params) => {
    const status = params.values;
    if (status.includes("TVPC PENDING ACK")) {
      return "TVPC. Exception Pending";
      // console log("status", status)
      // return "Tvpc Pending, Approval";
    }
  };

  // const gridJson = [];
  // const doubleValue = apiJson.map((elem) => {
  //   const {
  //     entityCode,
  //     counterPartyGrid,
  //     valueDate,
  //     runningTotalUsd,
  //     version,
  //     ...rest
  //   } = elem;
  //   rest.settlements.forEach((child) => {
  //     const obj = {
  //       entityCode,
  //       counterPartyGrid,
  //       valueDate,
  //       runningTotalUsd,
  //       version,
  //       ...child,
  //     };
  //     console.log(obj, "obj");
  //     gridJson.push(obj);apiJson
  //   });
  //   return true;
  // });
  function FakeServer(allData) {
  
    return {
      getData: function (request) {
        var results = allData;
  
        return {
          success: true,
          rows: results,
          lastRow: getLastRowIndex(request, results),
        };
      },
    };

    function getLastRowIndex(request, results) {
        if (!results || results.length === 0) {
          return null;
        }
    
        var currentLastRow = request.startRow + results.length;
    
        return currentLastRow <= request.endRow ? currentLastRow : -1;
      }
}
  function ServerSideDatasource(server) {
    return {
      getRows: function (params) {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        var response = server.getData(params.request);
        setTimeout(function () {
          if (response.success) {
            params.success({
              rowData: response.rows,
              rowCount: response.lastRow,
            });
          } else {
            params.fail();
          }
        }, 200);
      },
    };
  }
  const gridOptions = {
    columnDefs: [
      {
        field: "entityCode",
        sortable: true,
        unSortIcon: true,
        hide: true,

        rowGroup: true,
        pinned: "left",
        maxWidth: 300,
        lockPinned: true,
        filter: "agTextColumnFilter",
      },
      {
        field: "status",
        sortable: true,
        unSortIcon: true,
        pinned: "left",
        lockPinned: true,
        maxwidth: 300,
        aggFunc: statusAggFunc,
        filter: "agTextColumnFilter",
        //cellendererFramework: statusBadgeRender
      },
      {
        field: "counterPartyGrid",
        sortable: true,
        unSortIcon: true,
        pinned: "left",
        lockPinned: true,
        maxWidth: 300,
        aggFune: "first",
        filter: "agTextColumnFilter",
      },
      {
        field: "VAR.valueDate",
        sortable: true,
        unSortIcon: true,
        pinned: "left",
        lockPinned: true,
        aggFunc: "first",
        maxWidth: 300,
        filter: "agDateColumnFilter",
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            const dateAsString = cellValue;
            if (dateAsString == null) {
              return 0;
            }
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = dateAsString.split("/");
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
            return 0;
          },
        },
      },
      {
        field: "runningTotalUsd",
        sortable: true,
        unSortIcon: true,
        pinned: "left",
        lockPinned: true,
        maxidth: 300,
        aggFunc: "sum",
        filter: "agNumberColumnFilter",
      },
      {
        field: "entityBerid",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
        field: "counterPartyName",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
      {
        field: "settlementId",
        sortable: true,
        unSorticon: true,
        suppressMovable: true,
      },
      {
        field: "uti",
        sortable: true,
        unSortlcon: true,
        suppressMovable: true,
      },
      {
        field: "VAR.settlementStatus",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
      {
        field: "VAR.pta",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
      {
        field: "createdUser",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
      {
        field: "VAR.approveby",
        sortable: true,
        unSortIcon: true,
        suppressMovable: true,
      },
    ],
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
   
    const updateData = (data) => {
      const gridJson = [];
      data.map((elem) => {
        const {
          entityCode,
          counterPartyGrid,
          valueDate,
          runningTotalUsd,
          version,
          ...rest
        } = elem;
        rest.settlements.forEach((child) => {
          const obj = {
            entityCode,
            counterPartyGrid,
            valueDate,
            runningTotalUsd,
            version,
            ...child,
          };
          console.log(obj, "obj");
          gridJson.push(obj);
        });
      });
      var fakeServer = new FakeServer(gridJson);
      var datasource = new ServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    fetch(`data.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const sortAndFilter = (allOfTheData, sortModel, filterModel) => {
    return sortData(sortModel, filterData(filterModel, allOfTheData));
  };
  const sortData = (sortModel, data) => {
    var sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    var resultOfSort = data.slice();
    resultOfSort.sort(function (a, b) {
      for (var k = 0; k < sortModel.length; k++) {
        var sortColModel = sortModel[k];
        var valueA = a[sortColModel.colId];
        var valueB = b[sortColModel.colId];
        if (valueA == valueB) {
          continue;
        }
        var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      return 0;
    });
    return resultOfSort;
  };
  const filterData = (filterModel, data) => {
    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    var resultOfFilter = [];
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (filterModel.age) {
        var age = item.age;
        var allowedAge = parseInt(filterModel.age.filter);
        if (filterModel.age.type == "equals") {
          if (age !== allowedAge) {
            continue;
          }
        } else if (filterModel.age.type == "lessThan") {
          if (age >= allowedAge) {
            continue;
          }
        } else {
          if (age <= allowedAge) {
            continue;
          }
        }
      }
      if (filterModel.year) {
        if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
          continue;
        }
      }
      if (filterModel.country) {
        if (filterModel.country.values.indexOf(item.country) < 0) {
          continue;
        }
      }
      resultOfFilter.push(item);
    }
    return resultOfFilter;
  };

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "300px", width: "1200px" }}
    >
      <AgGridReact
        className=""
        columnDefs={gridOptions.columnDefs}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          enablePivot: true,
          filter: true,
        }}
        autoGroupColumnDef={{
          headerName: "GridId",
          field: "entityCode",
          pinned: "left",
          lockPinned: true,
          minhidth: 250,
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
            checkbox: function (params) {
              const isGroupRow = params.node.level === 0; //only show the checkbox on group row.
              console.log(isGroupRow);
              if (isGroupRow) {
                const childRows = params.node.allLeafChildren;
                if (childRows) {
                  console.log(
                    childRows.filter(
                      (e) => e.data.status === "TVPC PENDING ACK"
                    ).length
                  );
                }
                if (
                  childRows &&
                  childRows.filter((e) => e.data.status === "TVPC PENDING ACK")
                    .length > 0
                ) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            },
          },
        }}
        rowSelection="multiple"
        groupSelectsChildren
        suppressRowClickSelection
        suppressAggFuncInHeader
        // pagination
        // suppressAggFilteredOnly
        onGridReady={onGridReady}
        // rowData={gridJson}
        onRowDoubleClicked={(item) => selectRow(item)}
        groupSelectsFiltered
        components={{
          loadingRenderer: function (params) {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
        }}
        rowBuffer={0}
        rowModelType={"serverSide"}
        serverSideStoreType={'partial'}
        // paginationPageSize={2}
        // cacheOverflowSize={2}
        // maxConcurrentDatasourceRequests={2}
        // infiniteInitialRowCount={1}
        // maxBlocksInCache={2}
        cellRenderer="loadingRenderer"
      />
    </div>
  );
};

export default App;
