import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";

const TipoDocTabla = ({ data, actualizarDocumentoId, eliminarDocumento }) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Tipo de documento",
      selector: (row) => row?.nombre_tipo_doc,
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-warning"
              onClick={() => actualizarDocumentoId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => eliminarDocumento(row?.id)}
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

export default TipoDocTabla;
