import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather'

const TrabajadorTable = ({ data, actualizarTrabajadorId, eliminarTrabajador}) => {
  
  const columns = [
    {
      sortable: true,
      name: "Id",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Numero de Documento",
      selector: (row) => row?.numero_doumento,
    },
    {
      sortable: true,
      name: "Nombres",
      selector: (row) => row?.nombre,
    },
    {
      sortable: true,
      name: "Apellidos",
      selector: (row) => row?.apellido,
    },
    {
      sortable: true,
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      sortable: true,
      name: "Telefono",
      selector: (row) => row?.telefono,
    },

    {
      sortable: true,
      name: "Sexo",
      selector: (row) => row?.sexo,
    },
    {
      sortable: true,
      name: "Fecha Nacimiento",
      selector: (row) => row?.fecha_nac,
    },
    {
      sortable: true,
      name: "Documento de Identidad",
      selector: (row) => row?.tipo_documento_identidad.nombre_tipo_doc,
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className='btn btn-warning'
              onClick={() => actualizarTrabajadorId(row?.id)}
              >
              <Edit />
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => eliminarTrabajador(row?.id)}
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
  );
};

export default TrabajadorTable