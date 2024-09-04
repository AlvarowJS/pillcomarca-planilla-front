import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const CarreraForm = ({
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
      <ModalHeader>Registro de Carrera</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <div>
              <label>Carrera</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese el nombre de la Carrera"
                {...register("nombre")}
              />
            </div>
            <br />
            <div>
              <label>Descripcion</label>
              <input
                className="form-control"
                type="text"
                placeholder="Alguna Descripccion"
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

export default CarreraForm;
