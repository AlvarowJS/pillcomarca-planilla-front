import { Briefcase, Calendar, Clock, File, FileMinus, FileText, HardDrive, List, Paperclip, Tag, User, Users } from "react-feather";

export default [
  {
    id: "Trabajadores",
    title: "Trabajadores",
    icon: <User size={20} />,
    navLink: "/trabajador",
  },
    {
    id: "Contrato",
    title: "Contrato",
    icon: <FileText size={20}/>,
    navLink: "/contrato",
  },   
  {
    id: "Concepto",
    title: "Concepto Fijo",
    icon: <File size={20}/>,
    navLink: "/concepto-fijo",
  },
  {
    id: "AsigContConc",
    title: "Conceptos del Contrato",
    icon: <Paperclip size={20}/>,
    navLink: "/contrato-concepto",
  },

  {
    id: "Tipodoc",
    title: "Tipo de Documento",
    icon: <HardDrive size={20} />,
    navLink: "/tipo-doc",
  },
  {
    id: "TipoCont",
    title: "Tipo de Contrato",
    icon: <FileMinus size={20} />,
    navLink: "/tipo-contrato",
  },
  {
    id: "Categoria",
    title: "Categoria Trabajador",
    icon: <List size={20} />,
    navLink: "/categoria",
  },
  {
    id: "Horario",
    title: "Horario",
    icon: <Clock size={20} />,
    navLink: "/horario",
  },
  {
    id: "HorarioContrato",
    title: "Horario de Trabajo",
    icon: <Calendar size={20} />,
    navLink: "/horario-contrato",
  },
  {
    id: "Universidad",
    title: "Universidad",
    icon: <Briefcase size={20} />,
    navLink: "/universidad",
  },
  {
    id: "Carrera",
    title: "Carrera",
    icon: <List size={20} />,
    navLink: "/carrera",
  },
  {
    id: "Practicante",
    title: "Practicante",
    icon: <Users size={20} />,
    navLink: "/practicante",
  },
  {
    id: "Asistencia",
    title: "Asistencia",
    icon: <Tag size={20} />,
    navLink: "/asistencia",
  },
];

