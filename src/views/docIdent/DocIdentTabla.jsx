import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";

const DocIdentTabla = ({ data, actualizarDNIId, eliminarDNI }) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row) => row?.id,
    },
    {
      sortable: true,
      name: "Numero de Documento",
      selector: (row) => row?.numero_doumento,
    },
    {
      sortable: true,
      name: "Tipo de Docuemnto",
      selector: (row) => row?.tipo_documento_identidad.nombre_tipo_doc,
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className="btn btn-warning"
              onClick={() => actualizarDNIId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => eliminarDNI(row?.id)}
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

export default DocIdentTabla;
