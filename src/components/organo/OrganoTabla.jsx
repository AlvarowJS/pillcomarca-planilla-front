import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit } from 'react-feather'
import { Card } from 'reactstrap'

const OrganoTabla = ({
  search,
  data,
  actualizarOrganoId
}) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      minWidth: "25px",
      maxWidth: "80px",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "nombre",
      minWidth: "25px",
      selector: (row) => row?.id,
      cell: (row) => {
        return <>{row?.nombre}</>;
      },
    },  
    {
      name: 'Acciones',
      sortable: true,
      allowOverflow: true,
      minWidth: '200px',
      maxWidth: '400px',
      cell: row => {
        return (
          <div className='d-flex gap-1 my-1'>

            <button className='btn btn-warning'
              onClick={() => actualizarOrganoId(row?.id)}
            >
              <Edit />
            </button>      
          </div>
        )
      }
    }

  ]
  return (
    <Card>
      <DataTable
        noHeader
        pagination
        className="react-datatable"
        columns={columns}
        data={data}
      />
    </Card>
  )
}

export default OrganoTabla