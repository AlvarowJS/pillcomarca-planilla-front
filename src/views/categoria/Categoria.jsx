import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import CatgoriaForm from './CatgoriaForm';
import CategoriaTable from './CategoriaTable';

const URL = "v1/categoria";

const categoria = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    categoria: "",
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

  const crearCategoria = (data) =>{
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
  const actualizarCategoria = (id,data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
    .then(res =>{
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
    })
  };
  const eliminarCategoria = (id) => {
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res =>{
        setRefresh(!refresh)
    })
    .catch(err => {
      console.log(err)
    })
  };
  const actualizaCategoriaId = (id) => {
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
      actualizaCategoriaId(data.id, data)
    }else{
      crearCategoria(data)
    }
  }
  return (
    <>
      <button className='btn btn-primary' onClick={toggle}>
        +Agregar
      </button>
      <CatgoriaForm 
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
         getAuthheades={getAuthheaders}
         submit={submit} 
      />
      <CategoriaTable 
      data={data}
      actualizaCategoriaId={actualizaCategoriaId}
      eliminarCategoria={eliminarCategoria}/>
    </>
  );
};
export default categoria