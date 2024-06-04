import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import TrabajadorForm from './TrabajadorForm';
import TrabajadorTable from './TrabajadorTable';

const URL = "v1/trabajador"
const Trabajador = () => {
  
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");


const defaultValuesForm = {
  datos_trabajador: "",
}

const toggle = () => {
  setActualizacion(false);
  setModal(!modal)
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
}, [refresh])

const crearTrabajador = (data) =>{
    bdMuni
    .post(URL, data, getAuthheaders())
    .then((res) =>{
      toggle.call();
      reset(defaultValuesForm);
      setRefresh(!refresh)
    })
    .catch((err) =>{
      console.log(err);
    })
};
const actualizarTrabajador = (id, data) =>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
    })
};
const eliminarTrabajador = (id) => {
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res =>{
      setRefresh(!refresh)
    })
    .catch(err => {
      console.log(err)
    })
};
const actualizarTrabajadorId = (id) =>{
    toggle.call()
    setActualizacion(true)
    bdMuni.get(`${URL}/${id}`, getAuthheaders())
      .then(res => {
        reset(res.data)
      })
      .catch(err => {
        console.log(err)
      })
};
const submit = (data) =>{
  if(actualizacion){
    actualizarTrabajador(data.id, data)
  }else{
    crearTrabajador(data)
  }
}
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>
          + Agregar
        </button>
        <TrabajadorForm 
            toggle={toggle}
            modal={modal}
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            getAuthheaders={getAuthheaders}
            submit={submit}
        />
        <TrabajadorTable 
            data={data}
            actualizarTrabajadorId={actualizarTrabajadorId}
            eliminarTrabajador={eliminarTrabajador}
        />
    </>
  );
};



export default Trabajador