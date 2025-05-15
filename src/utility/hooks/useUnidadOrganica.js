import React, { useEffect, useState } from 'react'
import { getAuthHeaders } from '../auth/auth';
import bdMuni from '../../api/bdMuni';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import unidadOrganicaDefault from '../constants/UnidadOrganicaDefault';
const MySwal = withReactContent(Swal);

const URL = '/v1/unidad-organica'

export const useUnidadOrganica = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState()
    const [search, setSearch] = useState("");
    const [filteredUnidadOrganica, setFilteredUnidadOrganica] = useState()
    
    useEffect(() => {
        bdMuni.get(URL, getAuthHeaders())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [refresh])

    const mostrarUnidadOrganicaId = (id, reset, toogleActualizacion) => {
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
                toogleActualizacion()
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
    }

    const crearUnidadOrganica = async (data, reset, toggle) => {
        try {
            await bdMuni.post(URL, data, getAuthHeaders());
            reset(unidadOrganicaDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Unidad Organica creada", "", "success");
        } catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    const editarUnidadOrganica = async (id, data, reset, toggle) => {
        try {
            await bdMuni.put(`${URL}/${id}`, data, getAuthHeaders());
            reset(unidadOrganicaDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Unidad Organica Editada", "", "success");
        }
        catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    useEffect(() => {
        setFilteredUnidadOrganica(
            data?.filter((unidadOrganica) =>
                unidadOrganica.nombre.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    return {
        data,
        mostrarUnidadOrganicaId,
        crearUnidadOrganica,
        editarUnidadOrganica,
        search,
        setSearch,
        filteredUnidadOrganica
    }

}
