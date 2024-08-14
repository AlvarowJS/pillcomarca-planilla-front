import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import bdMuni from "../../api/bdMuni";

const URLCONTRATO = "v1/contratoSimple"; /* URL */
const URLHORARIO = "v1/horario"; /* URL1 */

const HorarioContratoForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  reset,
  submit,
  refresh,
}) => {
  const [dataContrato, setDataContrato] = useState();
  const [dataHorario, setDataHorario] = useState();

  const token = localStorage.getItem("token");
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resContrato, resHorario] = await Promise.all([
          bdMuni.get(URLCONTRATO, getAuthheaders()),
          bdMuni.get(URLHORARIO, getAuthheaders()),
        ]);
        setDataContrato(resContrato.data);
        setDataHorario(resHorario.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      fetchData();
    } else {
      console.log("Token no encontrado");
    }
  }, [refresh, token]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Registar Horario a cumplir por el trabajador</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <div>
              <label>Seleccione el Trabajador al que asignara Horario</label>
              <select className="form-control" {...register("contrato_id")}>
                <option value="">Seleccione un Trabajador</option>
                {dataContrato &&
                  dataContrato.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.trabajador.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label>Seleccione el Horario</label>
              <select className="form-control" {...register("horario_id")}>
                <option value="">Seleccione un Trabajador</option>
                {dataHorario &&
                  dataHorario.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.turno} -- {item.horaentrada} -- {item.horasalida}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <br />
          <button className="btn btn-primary">Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default HorarioContratoForm;