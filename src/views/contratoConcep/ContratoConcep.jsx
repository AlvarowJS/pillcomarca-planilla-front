import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import ContratoConcepTable from './ContratoConcepTable';
import ContratoConcepForm from './ContratoConcepForm';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Warning } from 'postcss';
const MySwal = withReactContent(Swal);
const URL = "v1/contratoconcepto"

const ContratoConcep = () => {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm ={
    contratoconcep:  "",
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

  const crearContratoConcep = (data) => {
    bdMuni
    .post(URL, data, getAuthheaders())
    .then((res) =>{
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          timer: 1500,
          title: 'Datos Guardados',
          showConfirmButton: false
        })
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        timer: 1500,
        title: 'Contacte con soporte',
        showConfirmButton: false
      })
    });
  }

  const actualizarContratoConcep = (id, data) =>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
        Swal.fire({
          position: 'center',
          icon: 'success',
          timer: 1500,
          title: 'Datos Actualizados',
          showConfirmButton: false
        })
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        timer: 1500,
        title: 'Conacte con Soporte',
        showConfirmButton: false
      })
    })
  }

  const eliminarContratoConcep = (id) =>{
      return MySwal.fire({
        title: '¿Estas seguro que quieres eliminar?',
        text: '¡No podras revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-onliner-danger ms-1'
        },
        buttonsStyling: false
      }).then(function(result) {

      if(result.value){
      bdMuni.delete(`${URL}/${id}`, getAuthheaders())
      .then(res => {
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Informacion Eliminada',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err =>{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Contacte con Soporte',
          showConfirmButton: false,
          timer: 1500
        })
      })
      }
    })
  }
  
  const actualizarContratoConcepId = (id) =>{
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
      actualizarContratoConcep(data.id, data)
    }else{
      crearContratoConcep(data)
    }
  }

  return (
    <>

      <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
      <ContratoConcepForm
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          getAuthheaders={getAuthheaders}
          submit={submit}
      />
      <ContratoConcepTable 
          data={data}
          actualizarContratoConcepId={actualizarContratoConcepId}
          eliminarContratoConcep={eliminarContratoConcep}
      />
    </>
  )
}

export default ContratoConcep