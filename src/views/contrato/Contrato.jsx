import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bdMuni from "../../api/bdMuni";
import ContratoForm from "./ContratoForm";
import ContratoTable from "./ContratoTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Select from "react-select";

const MySwal = withReactContent(Swal);

const URL = "v1/contrato";
const URLTRABAJADOR = "v1/trabajador";

const Contrato = () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [dni, setDni] = useState(false);
  const [dniData, setDniData] = useState();
  const { handleSubmit, register, reset } = useForm();
  const [documento, setDocumento] = useState();
  const token = localStorage.getItem("accessToken");

  const defaultValuesForm = {
    contrato: "",
  };

  const toggle = () => {
    setActualizacion(false);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setActualizacion(true);
  };

  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    if(dni.value){
    bdMuni
      .get(`${URL}?dni=${dni.value}`, getAuthheaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [refresh, dni]);

  useEffect(() => {
    bdMuni
      .get(URLTRABAJADOR, getAuthheaders())
      .then((res) => {
        console.log(res.data.data, "asdasdasd");
        setDniData(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const crearContrato = (data) => {
    const datos = new FormData()
    datos.append('inicio_contrato', data.inicio_contrato);
    datos.append('fin_contrato', data.fin_contrato);
    datos.append('terminos_contrato', data.terminos_contrato);
    datos.append('sueldo_contrato', data.sueldo_contrato);
    datos.append('trabajador_id', data.trabajador_id);
    datos.append('tipo_contrato_id', data.tipo_contrato_id);
    datos.append('categoria_id', data.categoria_id);
    datos.append('documento_c', documento);
    bdMuni
      .post(URL, datos, getAuthheaders())
      .then((res) => {
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          timer: 1500,
          title: "Se Agrego Correctamente",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          title: "Contacte con el Soporte",
          timer: 2000,
          icon: "error",
          showConfirmButton: false,
        });
      });
  };

  const actualizarContrato = (id, data) => {
    const datos = new FormData()
    datos.append('inicio_contrato', data.inicio_contrato);
    datos.append('fin_contrato', data.fin_contrato);
    datos.append('terminos_contrato', data.terminos_contrato);
    datos.append('sueldo_contrato', data.sueldo_contrato);
    datos.append('trabajador_id', data.trabajador_id);
    datos.append('tipo_contrato_id', data.tipo_contrato_id);
    datos.append('categoria_id', data.categoria_id);
    datos.append('documento_c', documento);
    bdMuni
      .put(`${URL}/${id}`, datos, getAuthheaders())
      .then((res) => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        toggle.call();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Datos Actualizados Correctamente",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err, "error aqui");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Contacte con el Soporte",
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };
  const eliminarContrato = (id) => {
    return MySwal.fire({
      position: "center",
      icon: "warning",
      title: "¿Seguro que Desea Eliminar?",
      text: "¡Esta accionn no se podra deshacer!",
      showCancelButton: true,
      confirmButtonText: "Si",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-onliner-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      bdMuni
        .delete(`${URL}/${id}`, getAuthheaders())
        .then((res) => {
          setRefresh(!refresh);
          Swal.fire({
            position: "center",
            title: "Registro Eliminado Correctamente",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Contacte con el Soporte",
            timer: 1500,
            showConfirmButton: false,
          });
        });
    });
  };

  const actualizarContratoId = (id) => {
    toggle.call();
    setActualizacion(true);
    bdMuni
      .get(`${URL}/${id}`, getAuthheaders())
      .then((res) => {
        reset(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = (data) => {
    if (actualizacion) {
      actualizarContrato(data.id, data);
    } else {
      crearContrato(data);
    }
  };

  const handleChange = (selected) => {
    setDni(selected);
    console.log(selected.value);
  };

  const options = dniData?.map((option) => ({
    value: option?.numero_doumento,
    label: option?.numero_doumento + ' ' + option.nombre + ' ' + option.apellido,
  }));
  return (
    <>
      <div className="form-group mb-1">
      <button className="btn btn-primary" onClick={toggle}>
        + Agregar
      </button>
      </div>
      <div className="form-group">
        <label className="form-group">Seleccione o ingrese un Empleado</label>
        <Select
          id="trabajador"
          value={dni}
          onChange={handleChange}
          options={options}
          isSearchable={true}
          placeholder="No especifica"
          className="form-group"
          styles={{
            control: (base) => ({
              ...base,
              width: 800, // Ajusta el ancho del Select
              fontSize: '14px', // Ajusta el tamaño de la fuente del Select
            }),
            menu: (base) => ({
              ...base,
              width: 800, // Asegura que el menú tenga el mismo ancho que el Select
              fontSize: '14px', // Ajusta el tamaño de la fuente del menú de opciones
            }),
            option: (base) => ({
              ...base,
              fontSize: '14px', // Ajusta el tamaño de la fuente de las opciones
              padding: '5px',   // Ajusta el padding de las opciones
            }),
          }}
        />
      </div>
      <ContratoForm
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        getAuthheaders={getAuthheaders}
        submit={submit}
        dniData={dniData}
        setDocumento={setDocumento}
      />
      <div className="mt-4">
      <ContratoTable
        data={data}
        actualizarContratoId={actualizarContratoId}
        eliminarContrato={eliminarContrato}
      />
      </div>
    </>
  );
};

export default Contrato;
