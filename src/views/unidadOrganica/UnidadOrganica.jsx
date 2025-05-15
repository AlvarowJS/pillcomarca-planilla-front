import React, { useState } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import UnidadOrganicaTabla from '../../components/unidadOrganica/UnidadOrganicaTabla';
import UnidadOrganicaForm from '../../components/unidadOrganica/UnidadOrganicaForm';
import { useUnidadOrganica } from '../../utility/hooks/useUnidadOrganica';
import unidadOrganicaDefault from '../../utility/constants/UnidadOrganicaDefault';

const UnidadOrganica = () => {
    const {
        data,
        mostrarUnidadOrganicaId,
        crearUnidadOrganica,
        editarUnidadOrganica,
        search,
        setSearch,
        filteredUnidadOrganica
    } = useUnidadOrganica()
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const [show, setShow] = useState(true);

    const toggle = () => {
        setActualizacion(false);
        reset(unidadOrganicaDefault);
        setModal(!modal);
    };

    const toggleActualizacion = () => {
        setActualizacion(true)
        setModal(!modal);
    };
    const handleFilter = (e) => setSearch(e.target.value);

    const actualizarUnidadOrganicaId = (id) => {
        mostrarUnidadOrganicaId(id, reset, toggleActualizacion)
    }


    const submit = (data) => {
        if (actualizacion) {
            editarUnidadOrganica(data.id, data, reset, toggle);
        } else {
            crearUnidadOrganica(data, reset, toggle);
        }
    };

    return (
        <>
            <h1>Unidad Organica</h1>
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
            <UnidadOrganicaTabla
                search={search}
                actualizarUnidadOrganicaId={actualizarUnidadOrganicaId}
                data={filteredUnidadOrganica}
            />
            <UnidadOrganicaForm
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
        </>
    )
}

export default UnidadOrganica