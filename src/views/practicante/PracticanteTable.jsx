import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const PracticanteTable = ({ data, actualizarPracticanteId, eliminarPracticante, filter, search }) => {

    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row) => row?.id,
          },
          {
            sortable: true,
            name: "Documento",
            selector: (row) => row?.num_documento,
          },
          {
            sortable: true,
            name: "Tipo de Documento",
            selector: (row) => row?.tipo_documento_identidad?.nombre_tipo_doc,
          },
          {
            sortable: true,
            name: "Nombre",
            selector: (row) => row?.nombre,
          },
          {
            sortable: true,
            name: "Universidad",
            selector: (row) => row?.universidad?.nombre,
          },
          {
            sortable: true,
            name: "Carrera",
            selector: (row) => row?.carrera?.nombre,
          },
          {
            sortable: true,
            name: "Acciones",
            cell: (row) => {
              return (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => actualizarPracticanteId(row?.id)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => eliminarPracticante(row?.id)}
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
            data={search ? filter : data}
        />
    </div>
  )
}

export default PracticanteTable