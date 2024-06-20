import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const UniversidadTable = ({ data, actualizarUniversidadId, eliminarUniversidad }) => {

    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row) => row?.id,
          },
          {
            sortable: true,
            name: "Institucion",
            selector: (row) => row?.nombre,
          },
          {
            sortable: true,
            name: "Acciones",
            cell: (row) => {
              return (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => actualizarUniversidadId(row?.id)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => eliminarUniversidad(row?.id)}
                  >
                    <Trash />
                  </button>
                </>
              );
            },
          },
    ]
    return (
    <div>
        <DataTable 
            pagination
            className='react-datatable'
            columns={columns}
            data={data}
        />
    </div>
  )
}

export default UniversidadTable