import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import ConceptoFijoForm from './ConceptoFijoForm';
import ConcFijoTable from './ConcFijoTable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const URL = "v1/concepto-fijo";
const ConcFijo = () => {
  
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("accessToken");

  const defaultValuesForm = {
    conc_fijo: "",
  };

  const toggle = () =>{
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
    .catch((err) =>{
      console.log(err);
    })
  }, [refresh]);

  const crearConceptoFijo = (data) =>{
    console.log("?????")
    bdMuni
    .post(URL, data, getAuthheaders())
    .then((res) =>{
      toggle.call();
      reset(defaultValuesForm);
      setRefresh(!refresh)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Concepto Ingresado Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Contacte con el Soporte',
        timer: 1500,
        showConfirmButton: false
      })
    })
  };
  const actualizarConceptoFijo = (id,data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
    .then(res =>{
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos Actualizados Correctamente',
        timer: 1500,
        showConfirmButton: false
      })
    }).catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Contacte con el Soporte',
        timer: 1500,
        showConfirmButton: false
    })
    });
  };
  const eliminarConceptoFijo = (id) => {
    return MySwal.fire({
      position: 'center',
      icon: 'warning',
      title: '¿Seguro que Desea Eliminar?',
      text: '¡Esta accionn no se podra deshacer!',
      showCancelButton: true,
      confirmButtonText: 'Si',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-onliner-danger ms-1'
      },buttonsStyling: false
    }).then(function(result){
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res =>{
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          title: 'Registro Eliminado Correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
      })
    })
    .catch(err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Contacte con el Soporte',
        timer: 1500,
        showConfirmButton: false
    })
    })
  };
  const actualizarConceptoFijoId = (id) => {
    toggle.call()
    setActualizacion(true)
    bdMuni.get(`${URL}/${id}`, getAuthheaders())
      .then(res => {
        reset(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  };
  const submit = (data) => {
    console.log(actualizacion, "???")
    if(actualizacion){
      actualizarConceptoFijo(data.id, data)
    }else{
      crearConceptoFijo(data)
    }
  }
  return (
    <>
      <button className='btn btn-primary' onClick={toggle}>
        +Agregar
      </button>
      <ConceptoFijoForm 
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
         getAuthheades={getAuthheaders}
         submit={submit} 
      />
      <ConcFijoTable 
      data={data}
      actualizarConceptoFijoId={actualizarConceptoFijoId}
      eliminarConceptoFijo={eliminarConceptoFijo}/>
    </>
  );
};

export default ConcFijo