import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni'
import { getAuthHeaders } from '../auth/auth'
const URL = '/v1/organo'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import organoDefault from '../constants/OrganoDefault';
const MySwal = withReactContent(Swal);

export const useOrgano = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState()
    const [search, setSearch] = useState("");
    const [filteredOrgano, setFilteredOrgano] = useState()
    useEffect(() => {
        bdMuni.get(URL, getAuthHeaders())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [refresh])

    const mostrarOrganoId = (id, reset, toogleActualizacion) => {
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
                toogleActualizacion()
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
    }

    const crearOrganos = async (data, reset, toggle) => {
        try {
            await bdMuni.post(URL, data, getAuthHeaders());
            reset(organoDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Organo creado", "", "success");
        } catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    const editarOrganos = async (id, data, reset, toggle) => {
        try {
            await bdMuni.put(`${URL}/${id}`, data, getAuthHeaders());
            reset(organoDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Organo editado", "", "success");
        }
        catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    useEffect(() => {
        setFilteredOrgano(
            data?.filter((organo) =>
                organo.nombre.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);


    return {
        data,
        mostrarOrganoId,
        crearOrganos,
        editarOrganos,
        search,
        filteredOrgano,
        setSearch
    }
}
