import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import Swal from 'sweetalert2';
import CargoForm from './CargoForm';
import CargoTable from './CargoTable';
import { useForm } from "react-hook-form";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const URLCARGO = "v1/cargo"

  const Cargo = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const {handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("accessToken");
  
  const defaultValuesForm = {
    cargo: "",
  };
  
  const toggle = () => {
    setActualizacion(false);
    setModal(!modal);
  }

  const toggleActualizacion = () => {
    setActualizacion(true)
  }

  const getAuthheaders = () => ({
    headers: {
        Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    bdMuni
    .get(URLCARGO, getAuthheaders())
    .then((res) => {
        setData(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }, [refresh]);

  const crearCargo = (data) => {
    bdMuni
    .post(URLCARGO, data, getAuthheaders())
    .then((res) => {
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh)
        Swal.fire({
            position: "center",
            icon:"success",
            title: "Registro Completado Correctamente",
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
    });
  };

  const actualizarCargo = (id, data) => {
    bdMuni.put(`${URLCARGO}/${id}`, data, getAuthheaders())
    .then(res => {
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

  const eliminarCargo = (id) => {
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
        if(result.value){
        bdMuni.delete(`${URLCARGO}/${id}`, getAuthheaders())
        .then(res => {
          setRefresh(!refresh)
          Swal.fire({
            position: 'center',
            title: 'Registro Eliminado Correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
        })
        .catch(err =>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Contacte con el Soporte',
            timer: 1500,
            showConfirmButton: false
          })
        })
        }
      })
  };

  const actualizarCargoId = (id) =>{
    toggle.call()
    setActualizacion(true)
    bdMuni.get(`${URLCARGO}/${id}`, getAuthheaders())
      .then(res => {
          reset(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  }

  const submit = (data) => {
    if(actualizacion){
        actualizarCargo(data.id, data)
    }else{
        crearCargo(data)
    }
  }
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
        <CargoForm 
            toggle={toggle}
            modal={modal}
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            getAuthheaders={getAuthheaders}
            submit={submit}
        />
        <CargoTable 
            data = {data}
            actualizarCargoId = {actualizarCargoId}
            eliminarCargo = {eliminarCargo}
        />    
    </>
  )
}

export default Cargo