import React, { useEffect, useState } from 'react'
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URL = "v1/tipo-documento-identidad";
const TrabajadorForm = ({
  toggle, modal, handleSubmit, register, reset, refresh, submit, setFoto, setHojaVida, dependencia, cargo }) => {

  const [data, setData] = useState();
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
  useEffect(() => {
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
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader>
        Registro de Trabajadores
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Row className='my-2'>
            <Col>
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
              </select>
            </Col>
            <Col>
              <label>Documento de identidad</label>
              <input
                className='form-control'
                type='text'
                inputMode='numeric'
                maxLength={8}
                placeholder='Ingrese su Documento de Identidad'
                {...register('numero_documento', {
                  required: true,
                  maxLength: 8,
                  pattern: /^[0-9]+$/, // solo números
                })}
                onInput={(e) => {
                  // eliminar letras en tiempo real
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
            </Col>
            <Col>
              <label>Fecha nacimiento</label>
              <input
                className='form-control'
                type='date'
                maxLength={8}
                {...register('fecha_nac')}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Nombres</label>
              <input
                className='form-control'
                type='text'
                placeholder='Ingrese sus Nombres'
                {...register('nombre')}
                required
              />
            </Col>
            <Col>
              <label>Apellidos</label>
              <input
                className='form-control'
                type='text'
                placeholder='Ingrese sus Apellidos'
                {...register('apellido')}
                required
              />
            </Col>


          </Row>

          <Row className='my-2'>
            <Col>
              <label>Correo</label>
              <input
                className='form-control'
                type='email'
                placeholder='Ingrese su Correo'
                {...register('email')}
                required
              />
            </Col>
            <Col>
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
            </Col>
            <Col>
              <label>Teléfono</label>
              <input
                className='form-control'
                type='text'
                placeholder='Ingrese su Teléfono'
                maxLength={9}
                {...register('telefono', {
                  required: true,
                  maxLength: 9,
                  pattern: /^[0-9]+$/, // solo números
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
            </Col>
          </Row>

          <Row className='my-2'>
            <Col>
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
            </Col>
            <Col>
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
            </Col>                
          </Row>
          <div ckas>
            <label>Ingrese Foto del Trabajador</label>
            <input
              className='form-control'
              type='file'
              {...register('foto')}
              onChange={handleFotoChange}              
            />
          </div>
          <div className='my-2'>
            <label>Ingrese el Curriculum</label>
            <input
              className='form-control'
              type='file'
              {...register('hoja_vida')}
              onChange={handleHojaChange}              
            />
          </div>

          <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TrabajadorForm