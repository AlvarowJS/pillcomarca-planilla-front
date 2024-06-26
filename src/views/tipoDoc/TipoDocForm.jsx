import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const TipoDocForm = ({
    toggle, modal, handleSubmit, register, reset, getAuthheaders, submit
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Registrar Tipo de Documento
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <label>
                        Tipo de Documento
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Ingrese nombre del tipo de documentp'
                        {...register('nombre_tipo_doc')}
                    />                                        
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default TipoDocForm