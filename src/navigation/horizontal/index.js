import { File, Tag, FileText, BarChart, Table, Edit, UserMinus, UserCheck } from "react-feather";

export default [
  {
    id: "Trabajadores",
    title: "Trabajadores",
    icon: <Tag size={20} />,
    navLink: "/trabajador",
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
    id: "DocIdentidad",
    title: "Documento",
    icon: <Tag size={20}/>,
    navLink: "/documento-identidad",
  },
  {
    id: "Contrato",
    title: "Contrato",
    icon: <Tag size={20}/>,
    navLink: "/contrato",
  },
  {
    id: "Concepto",
    title: "Contrato Fijo",
    icon: <Tag size={20}/>,
    navLink: "/concepto-fijo",
  }
];
