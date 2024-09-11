import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const CargoTable = ({ data, actualizarCargoId, eliminarCargo, filter, search}) => {

    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row) => row?.id,
        },
        {
            sortable: true,
            name: "Cargo",
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
                    onClick={() => actualizarCargoId(row?.id)}
                  >
                    <Edit/>
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => eliminarCargo(row?.id)}
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

export default CargoTable