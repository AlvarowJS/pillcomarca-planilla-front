import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import CatgoriaForm from './CatgoriaForm';
import CategoriaTable from './CategoriaTable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Col, Input, Label, Row } from 'reactstrap';
const MySwal = withReactContent(Swal);

const URL = "v1/categoria";

const categoria = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset} = useForm();
  const token = localStorage.getItem("accessToken");
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();

  const defaultValuesForm = {
    nombre: "",
    descripccion: ""
  };

  const toggle = () =>{
    setActualizacion(false);
    reset(defaultValuesForm);
    setModal(!modal);
  }

  const toggleActualizacion = () =>{
    setModal(!modal);
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
    toggleActualizacion.call()
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

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) => (
          e.nombre &&
            e.nombre.toLowerCase().indexOf(search?.toLowerCase()) !== -1
        )
      )
    );
  }, [data, search]);
  
  return (
    <>
      <Row className='mb-2'>
          <Col sm='6'>
            <button className="btn btn-primary" onClick={toggle}>
              + Agregar
            </button>
            </Col>
          <Col sm='1'></Col>
          <Col sm='5'>
            <Label for="search-input" className='me-1'>Buscador</Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              onChange={handleFilter}
            />
          </Col>
      </Row>
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
          filter={filter}
          search={search}
          actualizaCategoriaId={actualizaCategoriaId}
          eliminarCategoria={eliminarCategoria}
      />
    </>
  );
};
export default categoria