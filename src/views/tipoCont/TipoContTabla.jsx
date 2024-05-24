import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather'

const TipoContTabla = ({ data, actualizarContratoId, eliminarContrato}) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Tipo de contrato",
      selector: (row) => row?.nombre_contrato,
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className='btn btn-warning'
              onClick={() => actualizarContratoId(row?.id)}
              >
                <Edit />
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => eliminarContrato(row?.id)}
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
        data={data}/>
    </div>
  );
};

export default TipoContTabla;