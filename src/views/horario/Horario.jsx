import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import HorarioForm from './HorarioForm';
import HorarioTable from './HorarioTable';

const URL = "v1/horario";

const Horario = () => {

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
  
  const crearHorario = (data) =>{
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
  };
  
  const actualizarHorario = (id, data)=>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
    })
  };
  
  const eliminarHorario = (id) => {
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res => {
      setRefresh(!refresh)
    })
    .catch(err =>{
      console.log(err)
    })
  };
  
  const actualizarHorarioId = (id) =>{
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
      actualizarHorario(data.id, data)
    }else{
      crearHorario(data)
    }
  }
    return (
      <>
          <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
          <HorarioForm 
              toggle={toggle}
              modal={modal}
              handleSubmit={handleSubmit}
              register={register}
              reset={reset}
              getAuthheaders={getAuthheaders}
              submit={submit}
          />
  
          <HorarioTable 
              data={data}
              actualizarHorarioId={actualizarHorarioId}
              eliminarHorario={eliminarHorario}
          />
      </>
    );
  };

export default Horario