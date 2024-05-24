import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import ContratoForm from './ContratoForm';
import ContratoTable from './ContratoTable';


const URL = "v1/contrato";

const Contrato = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

const defaultValuesForm = {
  contrato: "",
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

const crearContrato = (data) =>{
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

const actualizarContrato = (id, data)=>{
  bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
  .then(res => {
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
  })
};

const eliminarContrato = (id) => {
  bdMuni.delete(`${URL}/${id}`, getAuthheaders())
  .then(res => {
    setRefresh(!refresh)
  })
  .catch(err =>{
    console.log(err)
  })
};

const actualizarContratoId = (id) =>{
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
    actualizarContrato(data.id, data)
  }else{
    crearContrato(data)
  }
}
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
        <ContratoForm 
            toggle={toggle}
            modal={modal}
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            getAuthheaders={getAuthheaders}
            submit={submit}
        />

        <ContratoTable 
            data={data}
            actualizarContratoId={actualizarContratoId}
            eliminarContrato={eliminarContrato}
        />
    </>
  );
};


export default Contrato