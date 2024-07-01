import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const AsistenciaTable = ({ data, actualizarAsistenciaId, eliminarAsistencia }) => {

    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row) => row?.id,
          },
          {
            sortable: true,
            name: "Carrera",
            selector: (row) => row?.nombre,
          },
          {
            sortable: true,
            name: "Descripcion",
            selector: (row) => row?.descripcion,
          },
          {
            sortable: true,
            name: "Acciones",
            cell: (row) => {
              return (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => actualizarAsistenciaId(row?.id)}
                  >
                    <Edit/>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => eliminarAsistencia(row?.id)}
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

export default AsistenciaTable