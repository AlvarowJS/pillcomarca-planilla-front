import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URL = 'v1/universidad';
const URL1 = 'v1/carrera';
const URL2 = 'v1/tipo-documento-identidad';

const PracticanteForm = ({toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {

    const[data,setData] = useState();
    const[data1,setData1] = useState();
    const[data2,setData2] = useState();

    const token = localStorage.getItem("token");
    const getAuthheaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const [res1, res, res2] = await Promise.all([
                    bdMuni.get(URL, getAuthheaders()),
                    bdMuni.get(URL1, getAuthheaders()),
                    bdMuni.get(URL2, getAuthheaders()),
                ]);
                    setData(res.data);
                    setData1(res1.data);
                    setData2(res2.data);
            }catch(err){
                console.log(err);
            }
        };
        if(token) {
            fetchData();
        }else{
            console.error("Token no encontrado");
        }
    }, [refresh, token]);
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
            Nueva Universidad
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                        <div className='form-group'>
                            <label>Tipo de Documento</label>
                            <select
                                className='form-control'
                                {...register('tipo_documento_id')}
                            >
                                <option value=''>Seleccione un Tipo de Documento</option>
                                {data2 && data2.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre_tipo_doc}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className='form-group'>
                            <label>Numero de Documento</label>
                            <input 
                                className='form-control'
                                type='text'
                                placeholder='Ingrese su numero de documento'
                                {...register('num_documento')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Universidad</label>
                            <select
                                className='form-control'
                                {...register('universidad_id')}
                            >
                                <option value=''>Seleccione su Instituto o Universidad del Practicante</option>
                                {data1 && data1.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className='form-group'>
                            <label>Carrera</label>
                            <select
                                className='form-control'
                                {...register('carrera_id')}
                            >
                                <option value=''>Seleccione la Carrera del Practicante</option>
                                {data && data.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre}
                                    </option>
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
                    </div>
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
        </ModalBody>
    </Modal>
  )
}
export default PracticanteForm