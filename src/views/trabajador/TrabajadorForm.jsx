import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URL = "v1/tipo-documento-identidad";
const TrabajadorForm = ({ 
  toggle, modal, handleSubmit, register, reset, refresh, submit, setFoto, setHojaVida, dependencia, cargo}) => {
  
  const [data,setData] = useState();
  const token = localStorage.getItem("accessToken");
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const handleFotoChange = (event) => {
    const fotografia = event.target.files[0]
    setFoto(fotografia)
  }
  const handleHojaChange = (event) => {
    const hoja = event.target.files[0]
    setHojaVida(hoja)
  }
  useEffect(() =>{
    bdMuni
    .get(URL, getAuthheaders())
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [refresh])

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        Registro de Trabajadores
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
            <div className='form-group'>
              <label>
                Trabajador
              </label>
              <label>
                Tipo de Documento  
              </label>
              <select 
                  className='form-control'
                  {...register('tipo_documento_identidad_id')}
                  required
              >
                <option value="">Seleccione el Tipo de Documento</option>
                {data && data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre_tipo_doc}
                  </option>
                ))}
              </select><br />
              <label>Documento de identidad</label>
              <input 
                  className='form-control'
                  type='number'
                  placeholder='Ingrese su Documento de Identidad'
                  maxLength={8}
                  {...register('numero_doumento')}
                  required
              /><br />
              <label>Nombres</label>
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese sus Nombres'
                  {...register('nombre')}
                  required
              /><br />
              <label>Apellidos</label>
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese sus Apellidos'
                  {...register('apellido')}
                  required
              /><br />
              <label>Correo</label>
              <input 
                  className='form-control'
                  type='email'
                  placeholder='Ingrese su Correo'
                  {...register('email')}
                  required
              /><br />
              <label>Telefono</label>
              <input 
                  className='form-control'
                  type='text'
                  placeholder='Ingrese su Telefono'
                  maxLength={9}
                  {...register('telefono')}
                  required
              /><br />
              <label>Sexo</label>
              <select
                  className='form-control'
                  {...register('sexo')}
                  required
              >
                <option value=''>Seleccione su Sexo</option>
                <option value='Masculino'>Masculino</option>
                <option value='Femenino'>Femenino</option>
              
              </select>
              <br />
              <label>Dependencia</label>
              <select
                className='form-control'
                {...register('dependencia_id')}
                required
              >
                <option value="">Seleccione la Dependencia</option>
                {dependencia && dependencia.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              <br />
              <label>Cargo</label>
              <select
                className='form-control'
                {...register('cargo_id')}
                required
              >
                <option value="">Seleccione el Cargo</option>
                {cargo && cargo.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              <br />
              <label>Fecha de Nacimineto</label>
              <input 
                  className='form-control'
                  type='date'
                  {...register('fecha_nac')}
                  required
              /><br />
              <label>Ingrese Foto del Trabajador</label>
              <input 
                  className='form-control'
                  type='file'
                  {...register('foto')}
                  onChange={handleFotoChange}
                  required
              /><br />
              <label>Ingrese el Curriculum</label>
              <input 
                  className='form-control'
                  type='file'
                  {...register('hoja_vida')}
                  onChange={handleHojaChange}
                  required
              /><br />
              

            </div>
            <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TrabajadorForm