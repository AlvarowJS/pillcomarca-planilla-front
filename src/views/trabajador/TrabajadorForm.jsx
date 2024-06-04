import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const TrabajadorForm = ({ 
  toggle, modal, handleSubmit, register, reset, getAuthheaders, submit}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        Registrar Trabajador
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
            <div className='form-group'>
              <label>
                Trabajador
              </label>
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Documento de identidad'
                  {...register('numero_doumento')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese sus Nombres'
                  {...register('nombre')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese sus Apellidos'
                  {...register('apellido')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Correo'
                  {...register('email')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Telefono'
                  {...register('telefono')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Sueldo'
                  {...register('sueldo_base')}
              /><br />
              <select
                  className='form-control'
                  {...register('sexo')}
                  required
              >
                <option value=''>Sexo</option>
                <option value='Maculino'>Maculino</option>
                <option value='Femenino'>Femenino</option>
              
              </select>
              <br />
              <label>Fecha de nacimineto</label>
              <input 
                  className='form-control'
                  type='date'
                  placeholder='Ingrese su Fecha de Nacimiento'
                  {...register('fecha_nac')}
              /><br />
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Documento de Identidad'
                  {...register('tipo_documento_identidad_id')}
              /><br />

            </div>
            <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TrabajadorForm