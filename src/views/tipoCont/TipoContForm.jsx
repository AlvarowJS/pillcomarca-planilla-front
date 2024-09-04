import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const TipoContForm = ({
    toggle, modal, handleSubmit, register, reset, getAuthheaders, submit
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Registros de los Tipos de Contratos
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <label>
                        Tipo de Contrato
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Ingrese nombre del Tipo de Contrato'
                        {...register('nombre_contrato')}
                    />
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default TipoContForm