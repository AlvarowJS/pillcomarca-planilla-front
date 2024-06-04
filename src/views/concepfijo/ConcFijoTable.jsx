import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';

const ConcFijoTable = ({ data, actualizarConceptoFijoId, eliminarConceptoFijo}) => {
    const columns = [
      {
          sortable: true,
          name: "ID",
          selector: (row) => row?.id,
      },
      {
          sortable: true,
          name: "Nombre del Concepto",
          selector: (row) => row?.nombre_concepto,
      },
      {
          sortable: true,
          name: "Porcentaje",
          selector: (row) => row?.porcentaje,
      },
      {
        sortable: true,
        name: "Pertenece a",
        selector: (row) => row?.contrato.id,
      },
      {
          sortable:true,
          name: "Acciones",
          cell: (row) => {
              return (
                  <>
                      <button
                          className='btn btn-warning'
                          onClick={() => actualizarConceptoFijoId(row?.id)}
                          >
                          <Edit />
                      </button>
                      <button
                          className='btn btn-secondary'
                          onClick={() => eliminarConceptoFijo(row?.id)}
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
  
export default ConcFijoTable