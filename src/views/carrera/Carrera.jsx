import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import CarreraForm from './CarreraForm';
import CarreraTable from './CarreraTable'
const URL = "v1/carrera"

const Carrera = () => {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    carrera: "",
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
  
  const crearCarrera = (data) =>{
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

  const actualizarCarrera = (id, data)=>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
    })
  };

  const eliminarCarrera = (id) => {
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res => {
      setRefresh(!refresh)
    })
    .catch(err =>{
      console.log(err)
    })
  };

  const actualizarCarreraId = (id) =>{
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
    if(actualizacion){
      actualizarCarrera(data.id, data)
    }else{
      crearCarrera(data)
    }
  }
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
        <CarreraForm
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          getAuthheaders={getAuthheaders}
          submit={submit}
        />

        <CarreraTable 
          data = {data}
          actualizarCarreraId = {actualizarCarreraId}
          eliminarCarrera = {eliminarCarrera}
        />
    </>
  );
};

export default Carrera