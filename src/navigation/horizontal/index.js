import { File, Tag, FileText, BarChart, Table, Edit, UserMinus, UserCheck } from "react-feather";

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
];
