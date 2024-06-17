import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URL = "v1/tipo-contrato";
const URL1 = "v1/trabajador";
const URL2 = "v1/categoria";

const ContratoForm = ({
    toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {

    const [data,setData] = useState();
    const [data1,setData1] = useState();
    const [data2,setData2] = useState();


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
                console.log(err)
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
                        Nuevo Contrato
                    </ModalHeader>
                    <ModalBody>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className='form-group'>
                            <label>Contrato</label>
                            <select
                                className='form-control'
                                {...register('tipo_contrato_id')}
                            >
                                <option value=''>Seleccione un Tipo de Contrato</option>
                                {data1 && data1.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre_contrato}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className='form-group'>
                            <label>Trabajador</label>
                            <select
                                className='form-control'
                                {...register('trabajador_id')}
                            >
                                <option value=''>Seleccione un Trabajador</option>
                                {data && data.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className='form-group'>
                            <label>Trabajador</label>
                            <select
                                className='form-control'
                                {...register('categoria_id')}
                            >
                                <option value=''>Seleccione un Categoria</option>
                                {data2 && data2.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className='form-group'>
                            <label>Área</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Ingrese el área'
                                {...register('area_contrato')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Cargo</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Ingrese el cargo'
                                {...register('cargo_contrato')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Sueldo</label>
                            <input
                                className='form-control'
                                type='number'
                                placeholder='Ingrese el sueldo'
                                {...register('sueldo_contrato')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Fecha de Inicio</label>
                            <input
                                className='form-control'
                                type='date'
                                {...register('inicio_contrato')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Fin del Contrato</label>
                            <input
                                className='form-control'
                                type='date'
                                {...register('fin_contrato')}
                            />
                        </div><br />
                        <div className='form-group'>
                            <label>Términos del Contrato</label>
                            <textarea
                                className='form-control'
                                placeholder='Ingrese los términos del contrato'
                                {...register('terminos_contrato')}
                            />
                        </div>
                        <br />
                        <button className='btn btn-primary'>Guardar</button>
                    </form>

                    </ModalBody>
                </Modal>
        )
}

export default ContratoForm