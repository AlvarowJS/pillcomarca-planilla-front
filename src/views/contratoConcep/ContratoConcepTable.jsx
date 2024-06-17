import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const ContratoConcepTable = ({ data, actualizarContratoConcepId, eliminarContratoConcep}) => {
  
    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row => row?.id),
        },
        {
            sortable: true,
            name: "Trabajador",
            selector: (row => row?.contrato?.trabajador?.nombre),
        },
        {
            sortable: true,
            name: "Turno",
            selector: (row => row?.concepto.nombre_concepto),
        },
        {
            sortable: true,
            name: "Acciones",
            cell: (row) => {
                return (
                    <>
                        <button
                        className='btn btn-warning'
                        onClick={() => actualizarContratoConcepId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button
                        className='btn btn-secondary'
                        onClick={() => eliminarContratoConcep(row?.id)}
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

export default ContratoConcepTable