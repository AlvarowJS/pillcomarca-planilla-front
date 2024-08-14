import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


const URL = "v1/contratoSimple";
const ConceptoFijoForm = ({toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {

  const [data, setData] = useState();
  const token = localStorage.getItem("token");
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

  return (
    <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                Registrar Docuemnto de Identidad
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group'>
                        <label>Ingrese un Concepto, ejm:"AFP", "CTS"</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Concepto'
                            {...register('nombre_concepto')}
                        /><br />
                        <label>Ingrese el porcentada a Deducir</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Descripcion'
                            {...register('descripcion')}
                        /><br />
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Valor'
                            {...register('valor')}
                        /><br />
                        
                    </div><br />
                    <button className='btn btn-primary'>Guardar</button>
                </form>
            </ModalBody>
        </Modal>
  )
}

export default ConceptoFijoForm