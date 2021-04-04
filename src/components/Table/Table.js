import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Table = (props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      {props.issue ? (
      <DataGrid
        rows={props.issue}
        columns={props.issue_columns}
        pageSize={5}
        checkboxSelection
        />
      ) : (
        <div>
        urlを入力ください
      </div>
    )} 
    </div>
  );
};

export default Table;
