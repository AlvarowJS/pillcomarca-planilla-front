import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './styles/style.css'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Controller, useForm } from 'react-hook-form'

// ** Illustrations Imports
import logo from "@src/assets/images/logo/logo.png";
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useEffect, useState } from "react";
import bdMuni from "../../api/bdMuni";

const MySwal = withReactContent(Swal)


const Register = () => {
  const navigate = useNavigate()
  const { skin } = useSkin();
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm()
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const [respuesta, setRespuesta] = useState(false)
  const [respuestaMatch, setRespuestaMatch] = useState(false)
  const [passwordRe, setPasswordRe] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState()
  const [dependencias, setDependencias] = useState()
  const [cargo, setCargo] = useState({});

  const valuesDefault = {
    apellidos: '',
    cargo_id: '',
    celular: '',
    dependencia_id: '',
    dni: '',
    email: '',
    nombres: '',
    password: ''
  }
  useEffect(() => {
    bdMuni.get(`/v1/cargos-dependencias`)
      .then(res => {
        setDependencias(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    bdMuni.get(`/v1/cargos`)
      .then(res => {
        setOptions(res.data)
      })
      .catch(err => console.log(err))
  }, [])



  const submit = (data) => {
    setRespuesta(false)
    if (data.password != data.password_re) {
      setRespuestaMatch(true)
    } else {
      setIsLoading(true)
      setRespuestaMatch(false)

      bdMuni.post('/register-user', data)
        .then(res => {
          reset(valuesDefault)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Completado',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/login')
        })
        .catch(err => {
          setIsLoading(false)
          // setRespuesta(res.data)
          if(err.response.status == 409){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: err.response.data.error,
              showConfirmButton: false,
              timer: 2500
            })
          }
         
        })
    }
    // firs try
    // setRespuesta(false)
    // if (data.password != data.password_re) {
    //   setRespuestaMatch(true)
    // } else {
    // setIsLoading(true)
    // setRespuestaMatch(false)

    //   try {
    //     const response = await bdMuni.post('/register-user', data)
    //     // const res = response.data
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Registro Completado',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     navigate('/login')
    //     // console.log(res)
    //   } catch (err) {
    //     setIsLoading(false)
    //     setRespuesta(response.data)
    //   }

  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">

        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <img className="img_local" src={logo} alt="Logo" style={{ width: 100 }} />

            <CardTitle tag="h2" className="fw-bold mb-1 mt-2">
              Registrate
            </CardTitle>

            {/* formulario */}
            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(submit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="nombres" >
                  Nombres
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nombres'
                  name='nombres'

                  render={({ field }) => (
                    <Input
                      type="text"
                      invalid={errors.nombres && true}
                      {...field}

                    />
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="apellidos" >
                  Apellidos
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='apellidos'
                  name='apellidos'

                  render={({ field }) => (
                    <Input
                      type="text"
                      invalid={errors.apellidos && true}
                      {...field}

                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <label className="form-label" htmlFor="cargo_id">
                  Cargo
                </label>
                <select
                  className="form-select"
                  id="cargo_id"
                  {...register("cargo_id", { required: "Este campo es obligatorio." })}

                >
                  <option value="">Seleccione un cargo</option>
                  {options?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.nombre_cargo}
                    </option>
                  ))}
                </select>
                {errors.cargo_id && <p className="text-danger">{errors.cargo_id.message}</p>}

              </div>
              <div className="mb-1">
                <label className="form-label" htmlFor="dependencia">
                  Dependencia
                </label>
                <select
                  className="form-select"
                  id="dependencia_id"
                  {...register("dependencia_id", { required: "Este campo es obligatorio." })}
                >
                  <option value="">Seleccione un dependencia</option>

                  {dependencias?.map((dependencia) => (
                    <option key={dependencia.id} value={dependencia.id}>
                      {dependencia.nombre_dependencia}
                    </option>
                  ))}
                </select>
                {errors.dependencia_id && <p className="text-danger">{errors.dependencia_id.message}</p>}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="celular" >
                  Celular
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='celular'
                  name='celular'

                  render={({ field }) => (
                    <Input
                      type="text"
                      invalid={errors.celular && true}
                      {...field}

                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="dni" >
                  DNI
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='dni'
                  name='dni'

                  render={({ field }) => (
                    <Input
                      type="text"
                      invalid={errors.dni && true}
                      {...field}

                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='email'
                  name='email'
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder='user@gmail.com'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="password">
                  Password
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='password'
                  name='password'
                  render={({ field }) => (
                    <Input
                      type="password"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="password_re" >
                  Repita el password
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='password_re'
                  name='password_re'

                  render={({ field }) => (
                    <Input
                      type="password"
                      invalid={errors.password_re && true}
                      {...field}

                    />
                  )}
                />
              </div>
              <div className="cuadrar__spinner">
                {isLoading ? <div className='spinner'></div> : null}
              </div>
              {respuesta ? <p className="local_color">Error de usuario</p> : null}
              {respuestaMatch ? <p className="local_color">Las contraseñas no coinciden</p> : null}


              <Button color="primary" block disabled={isLoading}>
                Registrar Cuenta
              </Button>

              {/* <Button tag={Link} to="/validation" color="primary" block>
                Registrar Cuenta
              </Button> */}
            </Form>

            <p className="text-center mt-2">
              <span className="me-25">Ya te encuentras registrado?</span>
              <Link to="/login">
                <span>Iniciar sesión</span>
              </Link>
            </p>


          </Col>
        </Col>
      </Row>
    </div >
  );
};

export default Register;
