import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni'
import { getAuthHeaders } from '../auth/auth'
const URL = '/v1/cargo'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import cargoDefault from '../constants/CargoDefault';
const MySwal = withReactContent(Swal);

export const useCargo = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState()
    const [search, setSearch] = useState("");
    const [filteredCargo, setFilteredCargo] = useState()

    // mostrar todos los cargos
    useEffect(() => {
        bdMuni.get(URL, getAuthHeaders())
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [refresh])

    const mostrarCargoId = (id, reset, toogleActualizacion) => {
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
                toogleActualizacion()
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
    }

    const crearCargo = async (data, reset, toggle) => {
        try {
            await bdMuni.post(URL, data, getAuthHeaders());
            reset(cargoDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Cargo creado", "", "success");
        } catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    const editarCargo = async (id, data, reset, toggle) => {
        try {
            await bdMuni.put(`${URL}/${id}`, data, getAuthHeaders());
            reset(cargoDefault);
            toggle();
            setRefresh(!refresh);
            MySwal.fire("Cargo editado", "", "success");
        }
        catch {
            MySwal.fire("Error", "Contacte con soporte", "error");
        }
    }

    useEffect(() => {
        setFilteredCargo(
            data?.filter((cargo) =>
                cargo.nombre.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);


    return {
        data,
        mostrarCargoId,
        crearCargo,
        editarCargo,
        search,
        setSearch,
        filteredCargo
    }
}
