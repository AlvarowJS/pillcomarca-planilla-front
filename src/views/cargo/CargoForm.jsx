import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const CargoForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  reset,
  submit,
  refresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Registro de Cargos</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <div>
              <label>Cargo</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese el nombre del Cargo"
                {...register("nombre")}
              />
            </div>
            <br />
            <div>
              <label>Clasificador</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese su Descripccion"
                {...register("clasificador")}
              />
            </div>
            <div>
              <label>Código</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese su Descripccion"
                {...register("codigo")}
              />
            </div>
            <div>
              <label>Descripcion</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese su Descripccion"
                {...register("descripcion")}
              />
            </div>
      
          </div>
          <br />
          <button className="btn btn-primary">Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CargoForm