import React, { useState } from 'react'
import OrganoTabla from '../../components/organo/OrganoTabla'
import OrganoForm from '../../components/organo/OrganoForm'
import { useOrgano } from '../../utility/hooks/useOrgano'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import organoDefault from '../../utility/constants/OrganoDefault'

const Organo = () => {
    const {
        data,
        mostrarOrganoId,
        crearOrganos,
        editarOrganos,
        search,
        setSearch,
        filteredOrgano
    } = useOrgano()

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const [show, setShow] = useState(true);

    const toggle = () => {
        setActualizacion(false);
        reset(organoDefault);
        setModal(!modal);
    };

    const toggleActualizacion = () => {
        setActualizacion(true)
        setModal(!modal);
    };
    const handleFilter = (e) => setSearch(e.target.value);

    const actualizarOrganoId = (id) => {
        mostrarOrganoId(id, reset, toggleActualizacion)
    }

    
    const submit = (data) => {
        if (actualizacion) {
            editarOrganos(data.id, data, reset, toggle);
        } else {
            crearOrganos(data, reset, toggle);
        }
    };

    return (
        <div>        
            <h1>Organo Institucional</h1>
            <Row className="mb-1">
                <Col sm="6">
                    <Label className="me-1" for="search-input">
                        Buscar
                    </Label>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        placeholder="buscar por nombre"
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm="4"></Col>
                <Col sm="2" className="mt-2">
                    <Button color="primary" onClick={toggle}>+ Agregar</Button>
                </Col>
            </Row>
            <OrganoTabla
                search={search}
                actualizarOrganoId={actualizarOrganoId}
                data={filteredOrgano}
            />
            <OrganoForm
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
                toggle={toggle}
                modal={modal}
                actualizacion={actualizacion}
                setModal={setModal}
                setShow={setShow}
                setActualizacion={setActualizacion}
                submit={submit}
                reset={reset}
            />
        </div>
    )
}

export default Organo