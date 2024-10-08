import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const AsistenciaForm = ({
    toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Resgistro de Asistencias
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <div>
                        <label>Asistencia</label>
                        <input 
                            className='form-control'
                            type='text'
                            placeholder='Ingrese el nombre de la carrera'
                            {...register('nombre')}
                        />
                    </div><br />
                    <div>
                        <label>Hora de Llegada</label>
                        <input 
                            className='form-control'
                            type='text'
                            placeholder='Alguna Descripccion'
                            {...register('descripcion')}
                        />
                    </div>
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default AsistenciaForm