import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import ConceptoFijoForm from './ConceptoFijoForm';
import ConcFijoTable from './ConcFijoTable';


const URL = "v1/concepto-fijo";
const ConcFijo = () => {
  
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    doc_identidad: "",
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
    })
    .catch((err) => {
      console.log(err);
    })
  };
  const actualizarConceptoFijo = (id,data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
    .then(res =>{
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
    })
  };
  const eliminarConceptoFijo = (id) => {
    bdMuni.put(`${URL}/${id}`, getAuthheaders())
    .then(res =>{
        setRefresh(!refresh)
    })
    .catch(err => {
      console.log(err)
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
      actualizarConceptoFijoId(data.id, data)
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