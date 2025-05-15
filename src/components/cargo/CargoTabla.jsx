import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit } from 'react-feather';
import { Card } from 'reactstrap';

const CargoTabla = ({
    search, actualizarCargoId, data
}) => {
    const columns = [
        {
            sortable: true,
            name: "ID",
            minWidth: "25px",
            maxWidth: "80px",
            selector: (row) => row?.id,
        },
        {
            sortable: true,
            name: "Nombre",
            minWidth: "25px",
            selector: (row) => row?.nombre,
            cell: (row) => {
                return <>{row?.nombre}</>;
            },
        },
        {
            sortable: true,
            name: "Clasificador",
            minWidth: "25px",
            selector: (row) => row?.clasificador,
            cell: (row) => {
                return <>{row?.clasificador}</>;
            },
        },
        {
            sortable: true,
            name: "Codigo",
            minWidth: "25px",
            selector: (row) => row?.codigo,
            cell: (row) => {
                return <>{row?.codigo}</>;
            },
        },
        {
            sortable: true,
            name: "Unidad Organica",
            minWidth: "25px",
            selector: (row) => row?.unidad_organica?.nombre,
            cell: (row) => {
                return <>{row?.unidad_organica?.nombre}</>;
            },
        },
        {
            sortable: true,
            name: "Organo",
            minWidth: "25px",
            selector: (row) => row?.unidad_organica?.organo?.nombre,
            cell: (row) => {
                return <>{row?.unidad_organica?.organo?.nombre}</>;
            },
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            minWidth: '200px',
            maxWidth: '400px',
            cell: row => {
                return (
                    <div className='d-flex gap-1 my-1'>
                        <button className='btn btn-warning'
                            onClick={() => actualizarCargoId(row?.id)}
                        >
                            <Edit />
                        </button>
                    </div>
                )
            }
        }

    ]
    return (
        <Card>
            <DataTable
                noHeader
                pagination
                className="react-datatable"
                columns={columns}
                data={data}
            />
        </Card>
    )
}

export default CargoTabla