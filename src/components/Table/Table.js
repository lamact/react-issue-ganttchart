import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Table = (props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      {props.issue_columns ?
        <div>
          {console.log('props.issue:', props.issue)}
          {console.log('props.issue_columns:', props.issue_columns)}
          <DataGrid
            rows={props.issue}
            columns={props.issue_columns}
            pageSize={5}
            checkboxSelection
          />
        </div>

        :
        "columns not loaded"
      }
    </div>
  );
};

export default Table;
