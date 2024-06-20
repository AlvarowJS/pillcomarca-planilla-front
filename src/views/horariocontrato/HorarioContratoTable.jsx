import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather'

const HorarioContratoTable = ({ data, actualizarHorarioContratoId, eliminarHorarioContrato}) => {
  
    const columns = [
        {
            sortable: true,
            name: "ID",
            selector: (row => row?.id),
        },
        {
            sortable: true,
            name: "Trabajador",
            selector: (row => row?.contrato?.trabajador.nombre),
        },
        {
            sortable: true,
            name: "Turno",
            selector: (row => row?.horario.turno),
        },  
        {
            sortable: true,
            name: "Hora de Entrada",
            selector: (row => row?.horario.horaentrada),
        },
        {
            sortable: true,
            name: "Hora de Salida",
            selector: (row => row?.horario.horasalida),
        },
        {
            sortable: true,
            name: "Acciones",
            cell: (row) => {
                return (
                    <>
                        <button
                        className='btn btn-warning'
                        onClick={() => actualizarHorarioContratoId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button
                        className='btn btn-secondary'
                        onClick={() => eliminarHorarioContrato(row?.id)}
                        >
                            <Trash />
                        </button>
                    </>
                );
            },
        },
    ]
  
  return (
    <div>
        <DataTable 
            pagination
            className='react-datatable'
            columns={columns}
            data={data}
        />
    </div>
  )
}

export default HorarioContratoTable