import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import AsistenciaTable from './AsistenciaTable';
import AsistenciaForm from './AsistenciaForm';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const URL = "v1/asistencia-trabajador";

const Asistencia = () => {

  const [refresh, setRefresh] = useState(false)
  const [data,setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] =useState(false);
  const {handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("accessToken");

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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Asistencia Creada',
          showConfirmButton: false,
          timer: 1500
        })
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se pudo registrar',
        showConfirmButton: false,
        timer: 1500
      });
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