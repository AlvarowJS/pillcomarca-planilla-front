import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const CatgoriaForm = ({toggle, modal, handleSubmit, register, reset, submit, refresh,}) => {
  
    return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Registrar Categoria de Trabajadaores
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <label>
                        Categoria de Trabajadores
                    </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Ingrese Categoria'
                        {...register('nombre')}
                    /><br />
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Ingrese su Descripccion'
                        {...register('descripcion')}
                    />
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default CatgoriaForm