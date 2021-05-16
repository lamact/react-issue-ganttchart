import React from 'react';
import styled from 'styled-components'
import { useTable, useSortBy, useBlockLayout, useResizeColumns } from 'react-table'
import { dateorstring2string } from '../../functions/Common/CommonHelper.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Styles = styled.div`
  padding: 1rem;

  table {
    display: inline-block; 
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      position: relative;

      .resizer {
        display: inline-block;
        background: black;
        width: 1px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }

      :last-child {
        border-right: 0;
      }
    }
  }
`
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

function SmartTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  )

  return (
    <>
      <div>
        {/* <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div> */}
        {allColumns.map(column => (
          <> <input type="checkbox" {...column.getToggleHiddenProps()} />{column.id}</>
        ))}
      <IconButton color="primary" style={{ verticalAlign: 'middle' }}>
        <AddCircleOutlineIcon
          // onClick={(e) => {
          //   props.onAddCustomFieldButtonClick();
          // }}
        />
      </IconButton>
        <br />
      </div>
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}

                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? 'isResizing' : ''
                      }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </>
  )
}

const checkVoidColumns = (props, columns) => {
  if (typeof props.issue_columns[0] === "undefined" || typeof props.issue === "undefined") {
    return false;
  } else {
    let data = [];
    props.issue.map((issue) => {
      const issuedata = {
        ...issue,
        start_date: dateorstring2string(issue.start_date),
        end_date: dateorstring2string(issue.end_date),
        due_date: dateorstring2string(issue.due_date),
        links: ""
      };
      data.push(issuedata)
    });
    return (
      < Styles >
        <SmartTable columns={props.issue_columns[0].columns} data={data} />
      </Styles >
    );
  }
};

const Table = (props) => {
  return (
    <div>
      {checkVoidColumns(props)}
    </div>

  )
}

export default Table