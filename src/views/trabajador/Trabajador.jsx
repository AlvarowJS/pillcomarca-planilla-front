import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bdMuni from "../../api/bdMuni";
import TrabajadorForm from "./TrabajadorForm";
import TrabajadorTable from "./TrabajadorTable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Col, Input, Label, Row } from "reactstrap";
const MySwal = withReactContent(Swal);

const URL = "v1/trabajador";
const URLDEPENDENCIA = "v1/dependencia"
const URLCARGO = "v1/cargo"
const Trabajador = () => {
  const [total, setTotal] = useState();
  const [totalMujeres, setTotalMujeres] = useState();
  const [totalHombres, setTotalHombres] = useState();
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("accessToken");
  const [filter, setFilter] = useState();
  const [search, setSearch] = useState();
  const [foto, setFoto] = useState();
  const [hojaVida, setHojaVida] = useState();
  const [cargo, setCargo] = useState();
  const [dependencia, setDependencia] = useState();
  const defaultValuesForm = {
    datos_trabajador: "",
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
    bdMuni
      .get(URL, getAuthheaders())
      .then((res) => {
        setTotal(res.data.total);
        setTotalMujeres(res.data.femeninos);
        setTotalHombres(res.data.masculinos);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    bdMuni
    .get(URLDEPENDENCIA, getAuthheaders())
    .then((res) => {
      setDependencia(res.data);
    })
  }, []);
  
  useEffect(() => {
    bdMuni
      .get(URLCARGO, getAuthheaders())
      .then((res) => {
        setCargo(res.data);
      })
  }, []);
  const crearTrabajador = (data) => {
    const datos = new FormData()
    datos.append('numero_doumento', data.numero_doumento);
    datos.append('nombre', data.nombre);
    datos.append('apellido', data.apellido);
    datos.append('email', data.email);
    datos.append('telefono', data.telefono);
    datos.append('sexo', data.sexo);
    datos.append('fecha_nac', data.fecha_nac);
    datos.append('tipo_documento_identidad_id', data.tipo_documento_identidad_id);
    datos.append('foto', foto);
    datos.append('hoja_vida', hojaVida);
    datos.append('dependencia_id', data.dependencia_id);
    datos.append('cargo_id', data.cargo_id);

    bdMuni
      .post(URL, datos, getAuthheaders())
      .then((res) => {
        toggle.call();
        reset(defaultValuesForm);
        setRefresh(!refresh);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro Guardado Exitosamente",
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
  };
  const actualizarTrabajador = (id, data) => {
    bdMuni
      .put(`${URL}/${id}`, data, getAuthheaders())
      .then((res) => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        toggle.call();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro Guardado Exitosamente",
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
  };
  const eliminarTrabajador = (id) => {
    return MySwal.fire({
      title: "¿Estas seguro que quieres eliminar?",
      text: "¡No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-onliner-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        bdMuni
          .delete(`${URL}/${id}`, getAuthheaders())
          .then((res) => {
            setRefresh(!refresh);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registro Eliminado Exitosamente",
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
      }
    });
  };
  const actualizarTrabajadorId = (id) => {
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
      actualizarTrabajador(data.id, data);
    } else {
      crearTrabajador(data);
    }
  };

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilter(
      data?.filter(
        (e) =>
          (e.nombre &&
            e.apellido &&
            (e.nombre.toLowerCase() + " " + e.apellido.toLowerCase()).indexOf(
              search?.toLowerCase()
            ) !== -1) ||
          (e.numero_doumento &&
            e.numero_doumento.toLowerCase().indexOf(search?.toLowerCase()) !==
              -1) ||
          (e.nombre &&
            e.nombre.toLowerCase().indexOf(search?.toLowerCase()) !== -1)
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
          <h4>Total de Trabajadores: {total}</h4>
          <h5>Mujeres: {totalMujeres}</h5>
          <h5>Hombres: {totalHombres}</h5>
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
      <TrabajadorForm
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        getAuthheaders={getAuthheaders}
        submit={submit}
        setFoto={setFoto}
        setHojaVida={setHojaVida}
        cargo={cargo}
        dependencia={dependencia}
      />
      <TrabajadorTable
        data={data}
        filter={filter}
        search={search}
        actualizarTrabajadorId={actualizarTrabajadorId}
        eliminarTrabajador={eliminarTrabajador}
      />
    </>
  );
};

export default Trabajador;
