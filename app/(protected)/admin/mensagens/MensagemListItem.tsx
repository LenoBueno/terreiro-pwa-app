import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface Mensagem {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  data: string;
  urgente: boolean;
}

interface MensagemListItemProps {
  mensagem: Mensagem;
  onEdit: () => void;
  onDelete: () => void;
}

const MensagemListItem: React.FC<MensagemListItemProps> = ({ mensagem, onEdit, onDelete }) => (
  <li className={`flex items-center px-1 py-1 hover:bg-gray-50 text-sm ${mensagem.urgente ? "bg-red-50" : ""}`}>
    <div className="flex-[2] min-w-0 font-semibold truncate mr-2">{mensagem.titulo}</div>
    <div className="flex-1 min-w-0 text-gray-500 truncate mr-2">{mensagem.subtitulo}</div>
    <div className="flex-1 min-w-0 text-gray-400 truncate mr-2">{mensagem.data}</div>
    <div className="flex-1 min-w-0 text-gray-400 truncate mr-2">{mensagem.urgente ? "URGENTE" : "Normal"}</div>
    <div className="w-14 flex gap-1 justify-center">
      <button onClick={onEdit} title="Editar" className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
      <button onClick={onDelete} title="Excluir" className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
    </div>
  </li>
);

export default MensagemListItem;
