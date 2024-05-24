import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


const URL = "v1/contrato";
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
                        <label>
                            Documento de identidad
                        </label>
                        <select
                            className='form-control'
                            {...register('contrato_id')}
                        >
                            <option value=''>Seleccione El Contrato de</option>
                            {data && data.map((item) =>(
                                <option key={item.id} value={item.id}>
                                    {item.trabajador.nombre}
                                </option>
                            ))}
                        </select>
                        <br />
                        <input
                            className='form-control'
                            type='text'
                            placeholder='nombre_concepto'
                            {...register('nombre_concepto')}
                        /><br />
                        
                    </div>
                    <button className='btn btn-primary'>Guardar</button>
                </form>
            </ModalBody>
        </Modal>
  )
}

export default ConceptoFijoForm