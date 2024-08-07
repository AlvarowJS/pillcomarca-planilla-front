import React, { useEffect, useState } from "react";
import TipoDocForm from "./TipoDocForm";
import TipoDocTabla from "./TipoDocTabla";
import bdMuni from "../../api/bdMuni";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const URL = "v1/tipo-documento-identidad";
const TipoDoc = () => {
  // logica, funcion etc
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

  const defaultValuesForm = {
    nombre_tipo_doc: "",
  };

  const toggle = () => {
    setActualizacion(false);
    setModal(!modal);
  };
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
      .get(URL, getAuthheaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const crearTipoDoc = (data) => {
    console.log("?????????????")
    bdMuni
      .post(URL, data, getAuthheaders())
      .then((res) => {        
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
  const actualizaDocumento = (id, data) => {
    bdMuni.put(`${URL}/${id}`,data, getAuthheaders())
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
      
  }

  const eliminarDocumento = (id) => {
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
  const actualizarDocumentoId = (id) => {
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
  const submit = (data) => {
    console.log(actualizacion, "???")
    if(actualizacion){
        actualizaDocumento(data.id, data)
    }else {
        crearTipoDoc(data)
    }
  };

  //   bdMuni.get(URL)
  return (
    <>
      <button className="btn btn-primary" onClick={toggle}>
        + Agregar
      </button>
      <TipoDocForm
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        getAuthheaders={getAuthheaders}
        submit={submit}
      />
      <TipoDocTabla 
      data={data} 
      actualizarDocumentoId={actualizarDocumentoId}
      eliminarDocumento={eliminarDocumento}
      />
    </>
  );
};

export default TipoDoc;
