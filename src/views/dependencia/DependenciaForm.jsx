import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const DependenciaForm = ({
    toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Registro de Dependencias</ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <div>
                        <label>Dependencia</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Ingrese el Nombre de la Dependencia'
                            {...register("nombre")}
                        />
                    </div><br />
                    <div>
                        <label>Descripcion</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Ingrese su Descripccion'
                            {...register("descripcion")}
                        />
                    </div>
                </div>
                <br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  );
};

export default DependenciaForm