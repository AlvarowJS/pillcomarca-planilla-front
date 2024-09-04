import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const HorarioForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  getAuthheaders,
  reset,
  submit,
  refresh,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Registros de los Horarios</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <div>
              <label>Horario</label>
              <input
                className="form-control"
                type="text"
                placeholder="Inserte en turno de este Horario"
                {...register("turno")}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <div>
              <label>Hora de Entrada</label>
              <input
                className="form-control"
                type="time"
                {...register("horaentrada")}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <div>
              <label>Hora de Salida</label>
              <input
                className="form-control"
                type="time"
                {...register("horasalida")}
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

export default HorarioForm;
