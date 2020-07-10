import React, { Component } from "react";
import { useTable } from "react-table";

import { convertArrayToCSV } from "convert-array-to-csv";

import { analytics, downloadFile } from "utils";

import { ConsoleContext } from "containers/console-context";

import TableView from "layouts/table-view";

class TableViewContainer extends Component {
  static contextType = ConsoleContext;

  state = {};

  componentDidMount() {}

  makeCols = (table) => {
    const cols = table[0].map((col) => ({
      Header: col,
      accessor: String(col).replace(".", "_"),
    }));
    console.log(cols);
    return cols;
  };

  makeData = (table) => {
    const data = table.slice(1).map((row) => {
      const resultRow = {};
      row.forEach((col, index) => {
        resultRow[String(table[0][index]).replace(".", "_")] = col;
      });
      return resultRow;
    });
    console.log(data);

    return data;
  };

  onDownloadCSV = () => {
    const { query, response } = this.context.store;
    const table = analytics.generateTable(query, response);

    const resultCSV = convertArrayToCSV(table.slice(1), {
      header: table.slice(0, 1),
      separator: ";",
    });

    downloadFile("table.csv", resultCSV);
  }

  render() {
    console.log(this.context.store);
    const { query, response } = this.context.store;
    if (!!query && !!response) {
      if (analytics.isTable(response)) {
        console.log(analytics.generateTable(query, response));
        const table = analytics.generateTable(query, response);
        return (
          <TableView
            columns={this.makeCols(table)}
            data={this.makeData(table)}
            onDownloadCSV={this.onDownloadCSV}
          />
        );
      }
    } else {
      return <div>Nothing to show</div>;
    }
  }
}

export default TableViewContainer;
