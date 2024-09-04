import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import bdMuni from "../../api/bdMuni";

const URLTIPOCONTRATO = "v1/tipo-contrato";
const URLTRABAJADOR = "v1/trabajador";
const URLCATEGORIA = "v1/categoria";

const ContratoForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  reset,
  submit,
  refresh,
  setDocumento
}) => {
  const [dataTrabajador, setDataTrabajador] = useState();
  const [dataCategoria, setDataCategoria] = useState();
  const [dataTipoContrato, setDataTipoContrato] = useState();
  const token = localStorage.getItem("accessToken");
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocumento(file)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTipoContrato, resTrabajador, resCategoria] = await Promise.all([
          bdMuni.get(URLTIPOCONTRATO, getAuthheaders()),
          bdMuni.get(URLTRABAJADOR, getAuthheaders()),
          bdMuni.get(URLCATEGORIA, getAuthheaders()),
        ]);
        setDataTrabajador(resTrabajador.data.data);
        setDataTipoContrato(resTipoContrato.data);
        setDataCategoria(resCategoria.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      fetchData();
    } else {
      console.error("Token no encontrado");
    }
  }, [refresh, token]);
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>Registro de Contratos</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label>Contrato</label>
            <select className="form-control" {...register("tipo_contrato_id")}>
              <option value="">Seleccione un Tipo de Contrato</option>
              {dataTipoContrato &&
                dataTipoContrato.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre_contrato}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Trabajador</label>
            <select className="form-control" {...register("trabajador_id")}>
              <option value="">Seleccione un Trabajador</option>
              {dataTrabajador &&
                dataTrabajador.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Categoria</label>
            <select className="form-control" {...register("categoria_id")}>
              <option value="">Seleccione un Categoria</option>
              {dataCategoria &&
                dataCategoria.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label>Sueldo</label>
            <input
              className="form-control"
              type="number"
              placeholder="Ingrese el sueldo"
              {...register("sueldo_contrato")}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Fecha de Inicio</label>
            <input
              className="form-control"
              type="date"
              {...register("inicio_contrato")}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Fin del Contrato</label>
            <input
              className="form-control"
              type="date"
              {...register("fin_contrato")}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Términos del Contrato</label>
            <textarea
              className="form-control"
              placeholder="Ingrese los términos del contrato"
              {...register("terminos_contrato")}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Archivo del Contrato</label>
            <input
              type="file" className="form-control" id="documento"
              {...register("documento_c")}
              onChange={handleFileChange}
            />
          </div>
          <br />
          <button className="btn btn-primary">Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ContratoForm;
