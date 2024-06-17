import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import HorarioContratoTable from './HorarioContratoTable';
import HorarioContratoForm from './HorarioContratoForm';

const URL = "v1/horario-contrato"

const HorarioContrato = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm ={
    horario:  "",
  };

  const toggle = () => {
    setActualizacion(false);
    setModal(!modal);
  }

  const toggleActualizacion = () =>{
    setActualizacion(true);
  }
  
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  }); 
    
  useEffect(() =>{
    bdMuni
    .get(URL, getAuthheaders())
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [refresh]);

  const crearHorarioContrato = (data) => {
    bdMuni
    .post(URL, data, getAuthheaders())
    .then((res) =>{
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const actualizarHorarioContrato = (id, data) =>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
    })
  }

  const eliminarHorarioContrato = (id) =>{
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res => {
      setRefresh(!refresh)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  
  const actualizarHorarioContratoId = (id) =>{
    toggle.call()
    setActualizacion(true)
    bdMuni.get(`${URL}/${id}`, getAuthheaders())
      .then(res => {
          reset(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  }

  const submit = (data) => {
    if(actualizacion) {
      actualizarHorarioContratoId(data.id, data)
    }else{
      crearHorarioContrato(data)
    }
  }

  return (
    <>

      <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
      <HorarioContratoForm 
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          getAuthheaders={getAuthheaders}
          submit={submit}
      />
      <HorarioContratoTable 
          data={data}
          actualizarHorarioContratoId={actualizarHorarioContratoId}
          eliminarHorarioContrato={eliminarHorarioContrato}
      />
    </>
  )
}

export default HorarioContrato