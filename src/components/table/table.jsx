import React from "react";
import classNames from "classnames";

import { useTable } from "react-table";

import "./table.css";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table className="Table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className="Table-headerRow"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th className="Table-headerCell" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className="Table-row" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className="Table-cell" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
