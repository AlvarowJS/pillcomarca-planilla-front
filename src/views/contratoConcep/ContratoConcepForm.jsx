import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import bdMuni from '../../api/bdMuni';

const URL = "v1/contrato";
const URL1 = "v1/concepto-fijo";

const ContratoConcepForm = ({ toggle, modal, handleSubmit, register, reset, submit, refresh,}) => {
    
    const [data,setData] = useState();
    const [data1,setData1] = useState();

    const token = localStorage.getItem("token");
    const getAuthheaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const [res, res1] = await Promise.all([
                    bdMuni.get(URL, getAuthheaders()),
                    bdMuni.get(URL1, getAuthheaders()),
                ]);
                setData(res.data);
                setData1(res1.data);
            }catch(err){
                console.log(err)
            }
        };
        if(token){
            fetchData();
        }else{
            console.log("Token no encontrado");
        }
    }, [refresh, token]);
  
  return (
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
                Registar Horario a cumplir por el trabajador
        </ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                    <div>
                        <label>
                            Seleccione el Trabajador al que asignara Horario
                        </label>
                        <select
                            className='form-control'
                            {...register('idContrato')}
                        >
                            <option value="">
                                Seleccione un Trabajador
                            </option>
                            {data && data.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.trabajador.nombre}
                                </option>
                            ))}
                        </select>
                        
                    </div><br />
                    <div>
                        <label>
                            Seleccione el Horario
                        </label>
                        <select
                            className='form-control'
                            {...register('idConcepto')}
                        >
                            <option value="">
                                Seleccione un Trabajador
                            </option>
                            {data1 && data1.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nombre_concepto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>
                            Seleccione el Horario
                        </label>
                        <input 
                        className='form-control'
                        placeholder='Mes'
                        type='text'
                        {...register('mes')}
                        />
                    </div>
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>

        </ModalBody>
    </Modal>
  )
}

export default ContratoConcepForm