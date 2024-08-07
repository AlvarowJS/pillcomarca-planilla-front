import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const AsistenciaTable = ({ data, actualizarAsistenciaId, eliminarAsistencia }) => {

    const columns = [
          {
            sortable: true,
            name: "ID",
            selector: (row) => row?.trabajador_id,
          },
          {
            sortable: true,
            name: "Trabajador",
            selector: (row) => row?.trabajador?.nombre,
          },
          {
            sortable: true,
            name: "Fecha",
            selector: (row) => {
              const dateTime = row?.fecha; // Asumiendo que row.fecha tiene el formato "2024-08-01T00:00:00.000000Z"
              const time = row?.hora;
              const date = dateTime.split('T')[0]; // Obtiene la parte antes del "T"
              return date+' '+time; // Solo devuelve la fecha en formato "YYYY-MM-DD"
            },
          },
          {
            sortable: true,
            name: "Estado",
            selector: (row) => row?.estado,
          },
          {
            sortable: true,
            name: "Tipo de Registro",
            selector: (row) => row?.tipo_registro,
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