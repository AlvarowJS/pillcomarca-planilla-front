import React from 'react'
import { useOrgano } from '../../utility/hooks/useOrgano'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const UnidadOrganicaForm = (
  { toggle, modal, handleSubmit, register, reset, submit, refresh }
) => {
  const { data } = useOrgano()
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        Registro de Categorias para Empleados
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group mb-2'>
            <label>
              Nombre de la Unidad Organica
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese nombre de organo'
              {...register('nombre')}
            />
          </div>
          <div className='form-group mb-2'>
            <label>
              Seleccione el organo
            </label>
            <select
              className='form-control'
              {...register('organo_id')}
            >
              <option value=''>Seleccione un organo</option>
              {data?.map((organo) => (
                <option key={organo.id} value={organo.id}>
                  {organo.nombre}
                </option>
              ))}
            </select>
          </div>
          <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default UnidadOrganicaForm