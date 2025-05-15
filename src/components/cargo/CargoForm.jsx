import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useUnidadOrganica } from '../../utility/hooks/useUnidadOrganica'

const CargoForm = ({
  toggle, modal, handleSubmit, register, submit
}) => {
  const {
    data
  } = useUnidadOrganica()
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
              <label>Unidad Organica</label>
              <select
                className="form-control"
                {...register("unidad_organica_id")}>
                <option value="">Seleccione una unidad organica</option>
                {data?.map((unidadOrganica) => (
                  <option key={unidadOrganica.id} value={unidadOrganica.id}>
                    {unidadOrganica.nombre}
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
  )
}

export default CargoForm