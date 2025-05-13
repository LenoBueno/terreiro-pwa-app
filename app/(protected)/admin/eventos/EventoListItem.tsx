import React from "react";
import { Edit, Trash2, Calendar } from "lucide-react";

interface Evento {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  data: string;
}

interface EventoListItemProps {
  evento: Evento;
  onEdit: () => void;
  onDelete: () => void;
}

const EventoListItem: React.FC<EventoListItemProps> = ({ evento, onEdit, onDelete }) => (
  <li className="flex items-center px-1 py-1 hover:bg-gray-50 text-sm">
    {/* Título */}
    <div className="flex-[2] min-w-0 font-semibold truncate mr-2">{evento.titulo}</div>
    {/* Subtítulo */}
    <div className="flex-1 min-w-0 text-gray-500 truncate mr-2">{evento.subtitulo}</div>
    {/* Data */}
    <div className="flex-1 min-w-0 text-gray-400 truncate mr-2 flex items-center gap-1"><Calendar size={14} className="inline text-gray-400" />{evento.data}</div>
    {/* Ações */}
    <div className="w-14 flex gap-1 justify-center">
      <button onClick={onEdit} title="Editar" className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
      <button onClick={onDelete} title="Excluir" className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
    </div>
  </li>
);

export default EventoListItem;
