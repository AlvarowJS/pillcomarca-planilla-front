import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather'

const CategoriaTable = ({ data, actualizarCategoriaId, eliminarCategoria}) => {

  const columns = [
    {
        sortable: true,
        name: "ID",
        selector: (row) => row?.id,
    },
    {
        sortable: true,
        name: "Nombre",
        selector: (row) => row?.nombre,
    },
    {
        sortable: true,
        name: "Descripccion",
        selector: (row) => row?.descripcion,
    },
    {
        sortable: true,
        name: "Acciones",
        cell: (row) => {
            return(
                <>
                
                    <button
                        className='btn btn-warning'
                        onClick={() => actualizarCategoriaId(row?.id)}
                    >
                        <Edit />
                    </button>
                    <button
                        className='btn btn-secondary'
                        onClick={() => eliminarCategoria(row?.id)}
                    >
                        <Trash />
                    </button>

                </>
            );
        },
    },
  ];
    
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

export default CategoriaTable