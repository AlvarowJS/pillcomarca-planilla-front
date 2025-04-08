import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import bdMuni from '../../api/bdMuni';

const URLUNIVERSIDAD = 'v1/universidad';
const URLCARRERA = 'v1/carrera';
const URLTIPODOCUMENTO = 'v1/tipo-documento-identidad';

const alertStyles = {
    alert: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      borderLeft: '4px solid #dc2626',
      marginBottom: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    icon: {
      marginRight: '12px',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    content: {
      flex: 1
    },
    title: {
      fontWeight: '600',
      marginBottom: '4px'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: '#b91c1c',
      fontSize: '18px',
      cursor: 'pointer',
      padding: '0 8px'
    },
    invalidInput: {
      borderColor: '#dc2626 !important',
      boxShadow: '0 0 0 2px rgba(220, 38, 38, 0.2)'
    },
    alertEnter: {
        opacity: 0,
        transform: 'translateY(-10px)'
      },
      alertEnterActive: {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 300ms ease-out'
      }
  };

const PracticanteForm = ({
  toggle,
  modal,
  handleSubmit,
  register,
  reset,
  refresh
}) => {
  const [dataUniversidad, setDataUniversidad] = useState();
  const [dataCarrea, setDataCarrea] = useState();
  const [dataTipoDocuemnto, setDataTipoDocuemnto] = useState();
  const [errorDNI, setErrorDNI] = useState('');

  const token = localStorage.getItem("accessToken");

  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUniversidad, resCarrera, resTipoDocumento] = await Promise.all([
          bdMuni.get(URLUNIVERSIDAD, getAuthheaders()),
          bdMuni.get(URLCARRERA, getAuthheaders()),
          bdMuni.get(URLTIPODOCUMENTO, getAuthheaders()),
        ]);
        setDataUniversidad(resUniversidad.data);
        setDataCarrea(resCarrera.data);
        setDataTipoDocuemnto(resTipoDocumento.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      fetchData();
    } else {
      console.error("Token no encontrado");
    }
  }, [refresh, token]);

  const submit = async (data) => {
    try {
      await bdMuni.post('v1/practicante', data, getAuthheaders());
      setErrorDNI('');
      toggle();
      refresh();
      reset();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        if (errors.num_documento) {
          setErrorDNI('Este DNI ya está registrado.');
        }
      } else {
        console.error('Error del servidor:', err);
      }
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Registro de Practicantes
      </ModalHeader>
      <ModalBody>
        {/* Alerta personalizada para DNI duplicado */}
        {errorDNI && (
          <div style={alertStyles.alert} role="alert">
            <span style={alertStyles.icon}>!</span>
            <div style={alertStyles.content}>
              <div style={alertStyles.title}>Error de validación</div>
              <div>{errorDNI}</div>
            </div>
            <button
              style={alertStyles.closeBtn}
              onClick={() => setErrorDNI('')}
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group'>
            <label>Tipo de Documento</label>
            <select className='form-control' {...register('tipo_documento_id')}>
              <option value=''>Seleccione un Tipo de Documento</option>
              {dataTipoDocuemnto && dataTipoDocuemnto.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre_tipo_doc}</option>
              ))}
            </select>
          </div><br />
          <div className='form-group'>
            <label>Numero de Documento</label>
            <input
              style={errorDNI ? alertStyles.invalidInput : {}}
              className='form-control'
              type='text'
              inputMode='numeric'
              placeholder='Ingrese su Número de Documento'
              maxLength={8}
              {...register('num_documento', {
                required: true,
                maxLength: 8,
                pattern: /^[0-9]+$/,
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />

          </div><br />

          <div className='form-group'>
            <label>Universidad</label>
            <select className='form-control' {...register('universidad_id')}>
              <option value=''>Seleccione su Instituto o Universidad del Practicante</option>
              {dataUniversidad && dataUniversidad.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </select>
          </div><br />

          <div className='form-group'>
            <label>Carrera</label>
            <select className='form-control' {...register('carrera_id')}>
              <option value=''>Seleccione la Carrera del Practicante</option>
              {dataCarrea && dataCarrea.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </select>
          </div><br />

          <div>
            <label>Nombre</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese el Nombre del Practicante'
              {...register('nombre')}
            />
          </div><br />

          <div>
            <label>Apellido</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese el Apellido del Practicante'
              {...register('apellido')}
            />
          </div><br />

          <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default PracticanteForm;
