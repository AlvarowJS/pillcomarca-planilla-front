import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const UniversidadForm = ({
    toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Nueva Universidad
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <div>
                        <label>Universidad</label>
                        <input 
                            className='form-control'
                            type='text'
                            placeholder='Ingrese el nombre del Instituto o Universidad'
                            {...register('nombre')}
                        />
                    </div>
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default UniversidadForm