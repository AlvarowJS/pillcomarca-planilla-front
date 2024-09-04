import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


const URL = "v1/contratoSimple";
const ConceptoFijoForm = ({toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {

  const [data, setData] = useState();
  const token = localStorage.getItem("accessToken");
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
                Registro de Conceptos Fijos
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
                        <label>Ingrese la Descripccion del Concepto</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Descripcion'
                            {...register('descripcion')}
                        /><br />
                        <label>Ingrese el Valor del Concepto</label>
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