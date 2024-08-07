import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import bdMuni from '../../api/bdMuni';

const URL = "v1/contrato";
const URL1 = "v1/concepto-fijo";

const ContratoConcepForm = ({ toggle, modal, handleSubmit, register, reset, submit, refresh }) => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [conceptValue, setConceptValue] = useState('');
    const [conceptPlaceholder, setConceptPlaceholder] = useState('');

    const token = localStorage.getItem("token");
    const getAuthheaders = () => ({
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const meses = [
        "Todos los meses",
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res, res1] = await Promise.all([
                    bdMuni.get(URL, getAuthheaders()),
                    bdMuni.get(URL1, getAuthheaders()),
                ]);
                setData(res.data);
                setData1(res1.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (token) {
            fetchData();
        } else {
            console.log("Token no encontrado");
        }
    }, [refresh, token]);

    const handleConceptChange = (event) => {
        const selectedId = event.target.value;
        const selectedConcept = data1.find(item => item.id === parseInt(selectedId));
        if (selectedConcept) {
            setConceptPlaceholder(selectedConcept.valor); // Asume que "valor" es la propiedad del concepto que deseas cargar
            setConceptValue(''); // Limpia el valor del input
        } else {
            setConceptPlaceholder('');
            setConceptValue('');
        }
    };

    const handleValorChange = (event) => {
        setConceptValue(event.target.value); // Actualiza conceptValue con el valor del input
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>
                Registrar Horario a cumplir por el trabajador
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
                                Seleccione el Concepto
                            </label>
                            <select
                                className='form-control'
                                {...register('idConcepto')}
                                onChange={handleConceptChange}
                            >
                                <option value="">
                                    Seleccione un Concepto
                                </option>
                                {data1 && data1.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nombre_concepto}
                                    </option>
                                ))}
                            </select>
                        </div><br />
                        <div className="d-flex align-items-center mb-3">
                            <div className="mr-2">
                                <label>
                                    Verifique el Valor
                                </label>
                                <input
                                    className='form-control'
                                    placeholder={conceptPlaceholder}
                                    type='text'
                                    {...register('valor')}
                                    value={conceptValue}
                                    onChange={handleValorChange}
                                    required
                                />
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className='mr-2'>
                                <label>
                                    Seleccione el Tipo de Concepto
                                </label>
                                <select
                                    className='form-control'
                                    {...register('tipo')}
                                    required
                                >
                                    <option value="">Seleccione el tipo de concepto</option>
                                    <option value="1">Aportes</option>
                                    <option value="2">Descuentos</option>
                                    <option value="3">Aumentos</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>
                                Seleccione los meses en los que es aplicable
                            </label>
                            <select
                                className='form-control'
                                {...register('idMes')}
                            >
                                <option value="">
                                    Seleccione los meses en los que es aplicable
                                </option>
                                {meses.map((meses, index) => (
                                    <option key={index} value={index}>{meses}</option>
                                ))}
                            </select>
                        </div><br />
                    </div><br />
                    <button className='btn btn-primary'>Guardar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default ContratoConcepForm;
