import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import ContratoForm from './ContratoForm';
import ContratoTable from './ContratoTable';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Select from "react-select";

const MySwal = withReactContent(Swal);

const URL = "v1/contrato";
const URLTRABAJADOR = "v1/trabajador";

const Contrato = () => {

  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [dni, setDni] = useState(false);
  const [dniData, setDniData] = useState();
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    contrato: "",
  };

  const toggle = () => {
    setActualizacion(false);
    setModal(!modal);
  }

  const toggleActualizacion = () => {
    setActualizacion(true);
  }

  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    bdMuni
      .get(`${URL}?dni=${dni.value}`, getAuthheaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [refresh, dni]);

  useEffect(() => {
    bdMuni
      .get(URLTRABAJADOR, getAuthheaders())
      .then((res) => {
        setDniData(res.data);
      })
      .catch((err) => { })
  }, []);

  const crearContrato = (data) => {
    bdMuni
      .post(URL, data, getAuthheaders())
      .then((res) => {
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          timer: 1500,
          title: 'Se Agrego Correctamente',
          showConfirmButton: false
        })
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          title: 'Contacte con el Soporte',
          timer: 2000,
          icon: 'error',
          showConfirmButton: false
        })
      });
  };

  const actualizarContrato = (id, data) => {
    bdMuni.put(`${URL}/${id}`, data, getAuthheaders())
      .then(res => {
        reset(defaultValuesForm)
        setRefresh(!refresh)
        toggle.call()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos Actualizados Correctamente',
          timer: 1500,
          showConfirmButton: false
        })
      }).catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Contacte con el Soporte',
          timer: 1500,
          showConfirmButton: false
        })
      });
  };
  const eliminarContrato = (id) => {
    return MySwal.fire({
      position: 'center',
      icon: 'warning',
      title: '¿Seguro que Desea Eliminar?',
      text: '¡Esta accionn no se podra deshacer!',
      showCancelButton: true,
      confirmButtonText: 'Si',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-onliner-danger ms-1'
      }, buttonsStyling: false
    }).then(function (result) {
      bdMuni.delete(`${URL}/${id}`, getAuthheaders())
        .then(res => {
          setRefresh(!refresh)
          Swal.fire({
            position: 'center',
            title: 'Registro Eliminado Correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Contacte con el Soporte',
            timer: 1500,
            showConfirmButton: false
          })
        })
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
  }

  const submit = (data) => {
    if (actualizacion) {
      actualizarContrato(data.id, data)
    } else {
      crearContrato(data)
    }
  }

  const handleChange = (selected) => {
    setDni(selected);
    console.log(selected.value);
  };

  const options = dniData?.map((option) => ({
    value: option?.numero_doumento,
    label: option?.numero_doumento
  }))
  return (
    <>
      <button className='btn btn-primary' onClick={toggle}>+ Agregar</button>
      <Select
        id='trabajador'
        value={dni}
        onChange={handleChange}
        options={options}
        isSearchable={true}
        placeholder="No especifica"
      />
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