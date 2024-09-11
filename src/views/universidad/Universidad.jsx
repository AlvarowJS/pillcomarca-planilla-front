import React, { useEffect, useState } from 'react'
import UniversidadForm from './UniversidadForm'
import UniversidadTable from './UniversidadTable'
import { useForm } from 'react-hook-form'
import bdMuni from '../../api/bdMuni'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Col, Input, Label, Row } from 'reactstrap'
const MySwal = withReactContent(Swal);

const URL = "v1/universidad"

const Universidad = () => {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState();
  const token = localStorage.getItem("accessToken");

  const defaultValuesForm = {
    nombre: "",
  };
  const toggle = () => {
    setActualizacion(false);
    reset(defaultValuesForm);
    setModal(!modal);
  }
  
  const toggleActualizacion = () =>{
    setModal(!modal)
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
  
  const crearUniversidad = (data) =>{
    bdMuni
    .post(URL, data, getAuthheaders())
    .then((res) =>{
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado Exitosamente',
          timer: 1500,
          showConfirmButton: false
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

  const actualizarUniversidad = (id, data)=>{
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
    .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado Exitosamente',
          timer: 1500,
          showConfirmButton: false
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

  const eliminarUniversidad = (id) => {
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
    }).then(function(result) {

    if(result.value){
    bdMuni.delete(`${URL}/${id}`, getAuthheaders())
    .then(res => {
      setRefresh(!refresh)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro Eliminado Exitosamente',
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
  }

  const actualizarUniversidadId = (id) =>{
    toggleActualizacion.call()
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
    if(actualizacion){
      actualizarUniversidad(data.id, data)
    }else{
      crearUniversidad(data)
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
  }, [data, search])
  
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
        <UniversidadForm 
          toggle={toggle}
          modal={modal}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          getAuthheaders={getAuthheaders}
          submit={submit}
        />

        <UniversidadTable 
          data = {data}
          search={search}
          filter={filter}
          actualizarUniversidadId = {actualizarUniversidadId}
          eliminarUniversidad = {eliminarUniversidad}
        />
    </>
  );
};

export default Universidad