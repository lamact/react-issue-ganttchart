import React, { useEffect, useRef } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getIssuesFromAPI } from '../../functions/Common/IssueAPI.js';
import { isValidVariable } from '../../functions/Common/CommonHelper.js';

const Table = (props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      {props.columns ?
        <DataGrid rows={props.issue} columns={props.columns} pageSize={5} checkboxSelection />
        :
        "columns not loaded"
      }
      
    </div>
  );
};

export default Table;
