import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";

const ContratoTable = ({ data, actualizarContratoId, eliminarContrato }) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Fecha de Inicio",
      selector: (row) => row?.inicio_contrato,
    },
    {
      sortable: true,
      name: "Fin del Contrato",
      selector: (row) => row?.fin_contrato,
    },
    {
      sortable: true,
      name: "Terminos del Contrato",
      selector: (row) => row?.terminos_contrato,
    },
    {
      sortable: true,
      name: "Sueldo",
      selector: (row) => row?.sueldo_contrato,
    },
    {
      sortable: true,
      name: "Cargo",
      selector: (row) => row?.cargo_contrato,
    },
    {
      sortable: true,
      name: "Area",
      selector: (row) => row?.area_contrato,
    },
    {
      sortable: true,
      name: "Trabajador",
      selector: (row) => row?.trabajador.nombre,
    },
    {
      sortable: true,
      name: "Tipo de Contrato",
      selector: (row) => row?.tipo_contrato.nombre_contrato,
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
