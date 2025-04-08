import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash, User } from 'react-feather'

const TrabajadorTable = ({ data, actualizarTrabajadorId, eliminarTrabajador, filter, search, exportPdf}) => {
  
  const abrirCV = (cv) => {
    window.open(`http://127.0.0.1:8000/storage/documento/${cv}`,'_blank')
  }
  const columns = [
    {
      sortable: true,
      name: "Id",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Numero de Documento",
      selector: (row) => row?.numero_documento,
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
      name: "Dependencia",
      selector: (row) => row?.dependencia?.nombre,
    },
    {
      sortable: true,
      name: "Cargo",
      selector: (row) => row?.cargo.nombre,
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
      name: "Foto",
      cell: (row) => {
        return (
          <>
            <img src={`http://127.0.0.1:8000/storage/imagen/${row?.foto}`} width= '60px' height= '50px' />
          </>
        )
      }
    },
    {
      sortable: true,
      name: "CV",
      cell: (row) => {
        return (
          <>
            <button className="btn btn-success" onClick={() => abrirCV(row?.hoja_vida)}>CV</button>
          </>
        )
      }
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
            <button
              className='btn btn-success'
              onClick={ () => exportPdf(row?.id)}
            >
              <User />
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
        data={search ? filter : data}
      />
    </div>
  );
};

export default TrabajadorTable