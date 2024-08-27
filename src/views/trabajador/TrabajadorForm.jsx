import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URL = "v1/tipo-documento-identidad";
const TrabajadorForm = ({ 
  toggle, modal, handleSubmit, register, reset, refresh, submit, setFoto, setHojaVida}) => {
  
  const [data,setData] = useState();
  const token = localStorage.getItem("token");
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
        Registrar Trabajador
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
              >
                <option value="">Selecciones el Tipo de Documento</option>
                {data && data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre_tipo_doc}
                  </option>
                ))}
              </select><br />
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
              <select
                  className='form-control'
                  {...register('sexo')}
                  required
              >
                <option value=''>Sexo</option>
                <option value='Masculino'>Masculino</option>
                <option value='Femenino'>Femenino</option>
              
              </select>
              <br />
              <label>Fecha de nacimineto</label>
              <input 
                  className='form-control'
                  type='date'
                  {...register('fecha_nac')}
              /><br />
              <label>Ingrese Foto del Trabajador</label>
              <input 
                  className='form-control'
                  type='file'
                  {...register('foto')}
                  onChange={handleFotoChange}
              /><br />
              <label>Ingrese el Curriculum</label>
              <input 
                  className='form-control'
                  type='file'
                  {...register('hoja_vida')}
                  onChange={handleHojaChange}
              /><br />
              

            </div>
            <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TrabajadorForm