import React, { useEffect, useRef } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getIssuesFromAPI } from '../../functions/Common/IssueAPI.js';
import { isValidVariable } from '../../functions/Common/CommonHelper.js';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  
  const rows = [
    { id: "#1", lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  let datas=[];

const Table = (props) => {
    const { classes } = props;
    useEffect(() => {
      getIssuesFromAPI(
        props.git_url,
        props.token,
        props.selected_labels,
        props.selected_assignee
      )
        .then((data) => {
          console.log("data")
          console.log(data)
          //datas = {};
          if (isValidVariable(data)) {
            datas=data;
            // data.map((d) => {
            //   datas.push({
            //     id:d.id,
            //     lastName:"test",
            //     firstName: 'Jon', 
            //     age: 35
            //   });
            // });
          }
        })
        .catch((err) => {
          console.log( 'error' );
        });
    }, [
      props.git_url,
      props.token,
      props.selected_labels,
      props.selected_assignee,
      props.update,
      
    ]);

    console.log(" before datanum : "+datas.length);
    props.TableupdateIssueByAPI();

  




  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={datas} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default Table;
