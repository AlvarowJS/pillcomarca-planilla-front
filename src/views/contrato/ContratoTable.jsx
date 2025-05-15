import React from "react";
import DataTable from "react-data-table-component";
import { Edit, File, Trash } from "react-feather";

const ContratoTable = ({ data, actualizarContratoId, eliminarContrato }) => {
  const abrirContrato = (contrato) => {
    window.open(`http://127.0.0.1:8000/storage/contrato/${contrato}`, '_blank')
  }
  const columns = [
    {
      sortable: true,
      name:(<div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          ID
        </div>),
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name:(
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Fecha de Inicio
        </div>),
      selector: (row) => row?.inicio_contrato,
    },
    {
      sortable: true,
      name:(
      <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Fin del Contrato
        </div>),
      selector: (row) => row?.fin_contrato,
    },
    {
      sortable: true,
      name:(<div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Terminos del Contrato
        </div>),
      selector: (row) => row?.terminos_contrato,
    },
    {
      sortable: true,
      name: (<div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Trabajador
        </div>),
      selector: (row) => row?.sueldo_contrato,
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Trabajador
        </div>
      ),
      selector: (row) => row?.trabajador?.nombre,
    },
    {
      sortable: true,
      name: (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
          Tipo de Contrato
        </div>
      ),
      selector: (row) => row?.tipo_contrato?.nombre_contrato,
    },
    {
      sortable: true,
      name: "Contrato",
      cell: (row) => {
        return (
          <>
            <button className="btn btn-success" onClick={() => abrirContrato(row?.documento_c)}>
              <File />
            </button>
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
              className="btn btn-warning"
              onClick={() => actualizarContratoId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className="btn btn-secondary"
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
        className="react-datatable"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ContratoTable;
