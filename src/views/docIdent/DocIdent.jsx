import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import DocIdentForm from './DocIdentForm';
import DocIdentTabla from './DocIdentTabla';

const URL = "v1/documento-identidad";
const DocIdent = () => {

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

  const crearDocumentoIndent = (data) =>{
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
  const actualizarDNI = (id,data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
    .then(res =>{
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
    })
  };
  const eliminarDNI = (id) => {
    bdMuni.put(`${URL}/${id}`, getAuthheaders())
    .then(res =>{
        setRefresh(!refresh)
    })
    .catch(err => {
      console.log(err)
    })
  };
  const actualizarDNIId = (id) => {
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
      actualizarDNI(data.id, data)
    }else{
      crearDocumentoIndent(data)
    }
  }
  
  return (
    <>
      <button className='btn btn-primary' onClick={toggle}>
        +Agregar
      </button>
      <DocIdentForm 
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
         getAuthheades={getAuthheaders}
         submit={submit} 
      />
      <DocIdentTabla 
      data={data}
      actualizarDNIId={actualizarDNIId}
      eliminarDNI={eliminarDNI}/>
    </>
  );
};

export default DocIdent