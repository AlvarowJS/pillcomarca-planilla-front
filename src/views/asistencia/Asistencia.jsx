import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import AsistenciaTable from './AsistenciaTable';
import AsistenciaForm from './AsistenciaForm';

const URL = "v1/asistencia";

const Asistencia = () => {

  const [refresh, setRefresh] = useState(false)
  const [data,setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] =useState(false);
  const {handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    asistencia: "",
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
  
  const crearAsistencia = (data) =>{
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

  const actualizarAsistencia = (id, data)=>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
    })
  };

  const eliminarAsistencia = (id) => {
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res => {
      setRefresh(!refresh)
    })
    .catch(err =>{
      console.log(err)
    })
  };

  const actualizarAsistenciaId = (id) =>{
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
      actualizarAsistencia(data.id, data)
    }else{
      crearAsistencia(data)
    }
  }
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
        <AsistenciaForm
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          getAuthheaders={getAuthheaders}
          submit={submit}
        />

        <AsistenciaTable 
          data = {data}
          actualizarAsistenciaId = {actualizarAsistenciaId}
          eliminarAsistencia = {eliminarAsistencia}
        />
    </>
  );
};
export default Asistencia