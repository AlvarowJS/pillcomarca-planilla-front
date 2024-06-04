import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather'

const TrabajadorTable = ({ data, actualizarTrabajadorId, eliminarTrabajador}) => {
  
  const columns = [
    {
      sortable: true,
      name: "id",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "numero de documento",
      selector: (row) => row?.numero_doumento,
    },
    {
      sortable: true,
      name: "nombres",
      selector: (row) => row?.nombre,
    },
    {
      sortable: true,
      name: "apellidos",
      selector: (row) => row?.apellido,
    },
    {
      sortable: true,
      name: "email",
      selector: (row) => row?.email,
    },
    {
      sortable: true,
      name: "telefono",
      selector: (row) => row?.telefono,
    },
    {
      sortable: true,
      name: "sueldo base",
      selector: (row) => row?.sueldo_base,
    },
    {
      sortable: true,
      name: "sexo",
      selector: (row) => row?.sexo,
    },
    {
      sortable: true,
      name: "fecha nacimiento",
      selector: (row) => row?.fecha_nac,
    },
    {
      sortable: true,
      name: "documento de identidad",
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