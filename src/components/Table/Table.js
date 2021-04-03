import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const Table = (props) => {
  useEffect(() => {
    //try {
      console.log('aaaaprops',props.issue_columns);
      // if (isValidVariable(props.issue) && props.issue.length != 0) {
      //   gantt.clearAll();
      //   //gantt.parse(props.issue);  it's not work
      //   props.issue.map((d) => {
      //     gantt.addTask(d);
      //   });
      //   gantt.sort('due_date', false);
      //   // gantt.render();
      // }
    //} catch (err) {
    //  gantt.message({ text: err, type: 'error' });
    //}
  }, [
    props.issue_columns,
  ]);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      {console.log('props',props)}
      <DataGrid
        rows={props.issue}
        columns={props.issue_columns}
        update={props.update}
        pageSize={5}
        checkboxSelection
      />
      <div>
        {console.log('props.issue:', props.issue)}
        {console.log('props.issue_columns:', props.issue_columns)}
      </div>

    </div>
  );
};

export default Table;
