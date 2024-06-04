import { File, FileText, HardDrive, Paperclip, Tag, User } from "react-feather";

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
    icon: <Tag size={20} />,
    navLink: "/tipo-contrato",
  },


];

