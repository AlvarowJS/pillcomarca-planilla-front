import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import TipoContTabla from './TipoContTabla';
import TipoContForm from './TipoContForm';

const URL = "v1/tipo-contrato";
const TipoCont = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");


const defaultValuesForm = {
    nombre_tipo_cont: "",
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
    .catch((err) => {
        console.log(err);
    })
}, [refresh]);

const crearTipoCont = (data) =>{
    console.log("?????????????")
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
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
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
    .catch(err => {
        console.log(err)
    })
};
const actualizarContratoId = (id) => {
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
    console.log(actualizacion, "???")
    if(actualizacion){
        actualizarContrato(data.id, data)
    }else{
        crearTipoCont(data)
    }
}
  return (
    <>
        <button className='btn btn-primary' onClick={toggle}>
            +Agregar 
        </button>
        <TipoContForm
            toggle={toggle}
            modal={modal}
            handleSubmit={handleSubmit}
            register={register}
            reset={reset}
            getAuthheaders={getAuthheaders}
            submit={submit}
        />
        <TipoContTabla
            data={data}
            actualizarContratoId={actualizarContratoId}
            eliminarContrato={eliminarContrato}
        />
    </>
  );
};

export default TipoCont