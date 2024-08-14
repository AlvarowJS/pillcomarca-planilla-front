import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import bdMuni from "../../api/bdMuni";

const URL = "v1/tipo-documento-identidad";
const DocIdentForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  reset,
  submit,
  refresh,
}) => {
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  useEffect(() => {
    bdMuni
      .get(URL, getAuthheaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Registrar Docuemnto de Identidad</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label>Documento de identidad</label>
            <select
              className="form-control"
              {...register("tipo_documento_identidad_id")}
            >
              <option value="">Seleccione un tipo de documento</option>
              {data &&
                data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre_tipo_doc}
                  </option>
                ))}
            </select>
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Ingrese su N° de Documento"
              {...register("numero_doumento")}
            />
            <br />
          </div>
          <button className="btn btn-primary">Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default DocIdentForm;
