import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const URLUNIVERSIDAD = 'v1/universidad';/* URL */
const URLCARRERA = 'v1/carrera';/* URL1 */
const URLTIPODOCUMENTO = 'v1/tipo-documento-identidad';/* URL2 */

const PracticanteForm = ({toggle, modal, handleSubmit, register, reset, submit, refresh,
}) => {

    const [dataUniversidad, setDataUniversidad] = useState();/* data */
    const [dataCarrea, setDataCarrea] = useState();/* data1 */
    const [dataTipoDocuemnto, setDataTipoDocuemnto] = useState(); /* data2 */

    const token = localStorage.getItem("accessToken");
    const getAuthheaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    useEffect(() =>{
        const fetchData = async () => {
            try{
                const [resUniversidad, resCarrera, resTipoDocumento] = await Promise.all([
                    bdMuni.get(URLUNIVERSIDAD, getAuthheaders()),
                    bdMuni.get(URLCARRERA, getAuthheaders()),
                    bdMuni.get(URLTIPODOCUMENTO, getAuthheaders()),
                ]);
                    setDataUniversidad(resUniversidad.data);
                    setDataCarrea(resCarrera.data);
                    setDataTipoDocuemnto(resTipoDocumento.data);
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
            Registro de Practicantes
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
                                {dataTipoDocuemnto && dataTipoDocuemnto.map((item) => (
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
                                type='number'
                                placeholder='Ingrese su Numero de Documento'
                                maxLength={8}
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
                                {dataUniversidad && dataUniversidad.map((item) => (
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
                                {dataCarrea && dataCarrea.map((item) => (
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