import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";

const HorarioTable = ({ data, actualizarHorarioId, eliminarHorario }) => {
  const columns = [
    {
      sortable: true,
      name: "Id",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Turno",
      selector: (row) => row?.turno,
    },
    {
      sortable: true,
      name: "Hora de entrada",
      selector: (row) => row?.horaentrada,
    },
    {
      sortable: true,
      name: "Hora de Salida",
      selector: (row) => row?.horasalida,
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-warning"
              onClick={() => actualizarHorarioId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => eliminarHorario(row?.id)}
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

export default HorarioTable;
