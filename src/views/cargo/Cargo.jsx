import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { Col, Input, Label, Row } from 'reactstrap';
import CargoForm from '../../components/cargo/CargoForm';
import CargoTabla from '../../components/cargo/CargoTabla';
import { useCargo } from '../../utility/hooks/useCargo';
import cargoDefault from '../../utility/constants/CargoDefault';


const Cargo = () => {
  const {
    data,
    mostrarCargoId,
    crearCargo,
    editarCargo,
    search,
    setSearch,
    filteredCargo
  } = useCargo()

  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [show, setShow] = useState(true);
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  const toggle = () => {
    setActualizacion(false);
    reset(cargoDefault);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setActualizacion(true)
    setModal(!modal);
  };

  const handleFilter = (e) => setSearch(e.target.value);

  const actualizarCargoId = (id) => {
    mostrarCargoId(id, reset, toggleActualizacion)
  }


  const submit = (data) => {
    if (actualizacion) {
      editarCargo(data.id, data, reset, toggle);
    } else {
      crearCargo(data, reset, toggle);
    }
  };

  return (
    <>
      <h1>Cargos</h1>
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
      <CargoForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}

        toggle={toggle}
        modal={modal}
        actualizacion={actualizacion}
        setModal={setModal}
        setShow={setShow}
        setActualizacion={setActualizacion}
        submit={submit}

      />
      <CargoTabla
        search={search}
        actualizarCargoId={actualizarCargoId}
        data={filteredCargo}
      />
    </>
  )
}

export default Cargo