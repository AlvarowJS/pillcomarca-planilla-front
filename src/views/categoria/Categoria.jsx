import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import CatgoriaForm from './CatgoriaForm';
import CategoriaTable from './CategoriaTable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const URL = "v1/categoria";

const categoria = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("accessToken");

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
      Swal.fire({
        icon: 'success',
        timer: 1500,
        title: 'Registro guardado con exito' ,
        position: 'center',
        showConfirmButton: false
      })
    })
    .catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        timer: 1500,
        title: 'Contacte con Soporte',
        showConfirmButton: false
      })
    })
  };
  const actualizarCategoria = (id,data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
    .then(res =>{
      reset(defaultValuesForm)
      setRefresh(!refresh)
      toggle.call()
      Swal.fire({
        position: 'center',
        icon: 'success',
        timer: 1500,
        title: 'Registro Actualizado con Exito',
        showConfirmButton: false
      })
    })
    .catch(err => {
      Swal.fire({
        position: 'center',
        title: 'Contacte con Soporte',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    })
  };
  const eliminarCategoria = (id) => {
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
      }).then(function(result){
        if(result.value){
        bdMuni.delete(`${URL}/${id}`, getAuthheaders())
        .then(res =>{
            setRefresh(!refresh)
            Swal.fire({
              icon: 'success',
              timer: 1500,
              title: 'Registro Eliminado con exito',
              showConfirmButton: false,
              position: 'center'
            })
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            title: 'Contacte con Soporte',
            icon:'error',
            timer: 1500,
            showConfirmButton: false
          })
        })
        }
      }
    )};
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
      actualizarCategoria(data.id, data)
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