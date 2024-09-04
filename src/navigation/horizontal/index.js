import { File, Tag, FileText, BarChart, Table, Edit, UserMinus, UserCheck, Settings } from "react-feather";

export default [
  {
    id: "Trabajadores",
    title: "Trabajadores",
    icon: <Tag size={20} />,
    navLink: "/trabajador",
  },

  {
    id: "Contrato",
    title: "Contrato",
    icon: <Tag size={20}/>,
    navLink: "/contrato",
  },  
  {
    id: "Concepto",
    title: "Concepto Fijo",
    icon: <Tag size={20}/>,
    navLink: "/concepto-fijo",
  },
  {
    id: "Dependencia",
    title: "Dependencia",
    icon: <Tag size={20}/>,
    navLink: "/dependencia",
  },
  {
    id: "Cargo",
    title: "Cargo",
    icon: <Tag size={20}/>,
    navLink: "/cargo",
  },
  {
    id: "AsigContConc",
    title: "Conceptos del Contrato",
    icon: <Tag size={20}/>,
    navLink: "/contrato-concepto",
  },
  {
    id: "Tipodoc",
    title: "Tipo de Documento",
    icon: <Tag size={20} />,
    navLink: "/trabajador",
  },
  {
    id: "TipoCont",
    title: "Tipo de Contrato",
    icon: <Tag size={20} />,
    navLink: "/tipo-contrato",
  },
  {
    id: "Categoria",
    title: "Categoria",
    icon: <Tag size={20} />,
    navLink: "/categoria",
  },
  {
    id: "Horario",
    title: "Horario",
    icon: <Tag size={20} />,
    navLink: "/horario",
  },
  {
    id: "HorarioContrato",
    title: "Horario de Trabajo",
    icon: <Tag size={20} />,
    navLink: "/horario-contrato",
  },
  {
    id: "Universidad",
    title: "Universidad",
    icon: <Tag size={20} />,
    navLink: "/universidad",
  },
  {
    id: "Carrera",
    title: "Carrera",
    icon: <Tag size={20} />,
    navLink: "/carrera",
  },
  {
    id: "Practicante",
    title: "Practicante",
    icon: <Tag size={20} />,
    navLink: "/practicante",
  },
  {
    id: "Asistencia",
    title: "Asistencia",
    icon: <Tag size={20} />,
    navLink: "/asistencia",
  },
  {
    id: "Configuracion",
    title: "Configuracion",
    icon: <Settings size={20} />,
    children: [
      {
        id: "Cargo",
        title: "Cargo",
        icon: <Tag size={20}/>,
        navLink: "/configuracion/cargo",
      }
    ]
  }
  
];
