import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useTable, useSortBy, useBlockLayout, useResizeColumns } from 'react-table'
import xtype from 'xtypejs'

import makeData from './makeData'

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
        background: blue;
        width: 10px;
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

function Table2({ columns, data }) {
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
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()}>
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
      </table>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

const checkVoidColumns = (props, columns) => {
  console.log(props.issue_columns[0]);
  if (typeof props.issue_columns[0] === "undefined") {
    return false;
  } else {
    let test = props.issue_columns[0].columns;
    test.splice(2, 2);
    test.splice(6, 1);
    test.splice(8, 1);
    columns[0].columns = test;
    
    return (
      < Styles >
        <Table2 columns={columns} data={props.issue} />
      </Styles >
    );
  }
};



const Table = (props) => {
  let columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [],
      },
    ],
    []
  )


  const columns2 = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          { accessor: "id", Header: "id", width: 50 }
          , { accessor: "text", Header: "text", width: 50 }
          , { accessor: "duration", Header: "duration", width: 50 }
          , { accessor: "progress", Header: "progress", width: 50 }
          , { accessor: "assignee", Header: "assignee", width: 50 }
          , { accessor: "description", Header: "description", width: 50 }
          , { accessor: "parent", Header: "parent", width: 50 }
          , { accessor: "dependon", Header: "dependon", width: 50 }
          ,
        ],
      },
    ],
    []
  )
  // useEffect(() => {
  //   console.log('useEffect：a')
  //   if (checkvoid(props.issue_columns)) {
  //     let test = props.issue_columns[0].columns;
  //     let test2 = test.splice(2, 2);
  //   }
  // }, [props.issue_columns[0]]);


  return (
    <div>
      {checkVoidColumns(props, columns, columns2)
      }
    </div>

  )
}

export default Table