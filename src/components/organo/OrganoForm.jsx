import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const OrganoForm = (
  { toggle, modal, handleSubmit, register, reset, submit, refresh, }
) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        Registro de Categorias para Empleados
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group mb-2'>
            <label>
              Nombre de Organo
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese nombre de organo'
              {...register('nombre')}
            />
          </div>
          <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default OrganoForm