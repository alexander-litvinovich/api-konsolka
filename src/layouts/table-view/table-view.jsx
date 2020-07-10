import React, { useMemo } from "react";
import classNames from "classnames";

import Table from "components/table";
import Icon from "components/icon";
import A from "components/a";

import "./table-view.css";

const TableView = ({
  columns,
  data,
  onDownloadCSV = () => {},
  ...restProps
}) => {
  const memoColumns = React.useMemo(() => columns);
  const memoData = React.useMemo(() => data);

  return (
    <div className="TableView" {...restProps}>
      <div className="TableView-toolbar">
        <A onClick={onDownloadCSV} size="s">
          <Icon name="download" /> Сохранить
        </A>
      </div>
      <div className="TableView-table">
        <Table columns={memoColumns} data={memoData} />
      </div>
    </div>
  );
};

export default TableView;
