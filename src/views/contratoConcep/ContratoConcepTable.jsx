import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";

const ContratoConcepTable = ({
  data,
  actualizarContratoConcepId,
  eliminarContratoConcep,
  filter,
  seacrh
}) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Trabajador",
      selector: (row) => row?.contrato?.trabajador?.nombre,
    },
    {
      sortable: true,
      name: "Concepto",
      selector: (row) => row?.concepto.nombre_concepto,
    },
    {
      sortable: true,
      name: "Meses Aplicables",
      selector: (row) => row?.mes?.nombre,
    },
    {
      sortable: true,
      name: "Valor",
      selector: (row) => row?.valor,
    },
    {
      sortable: true,
      name: "Tipo del Concepto",
      selector: (row) => {
        if (row?.tipo === "1") return "Aportes";
        if (row?.tipo === "2") return "Descuentos";
        if (row?.tipo === "3") return "Aumentos";
        return "Desconocido"; // Valor por defecto en caso de que no coincida con 1, 2, o 3
      },
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-warning"
              onClick={() => actualizarContratoConcepId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => eliminarContratoConcep(row?.id)}
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
        data={seacrh ? filter : data}
      />
    </div>
  );
};

export default ContratoConcepTable;
