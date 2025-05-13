import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface Material {
  id: number;
  titulo: string;
  subtitulo?: string;
  autor: string;
  paginas?: number;
  arquivo?: File | null | string;
}

interface LeituraListItemProps {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

const LeituraListItem: React.FC<LeituraListItemProps> = ({ material, onEdit, onDelete }) => (
  <li className="flex items-center px-1 py-1 hover:bg-gray-50 text-sm">
    <div className="flex-[2] min-w-0 font-semibold truncate mr-2">{material.titulo}</div>
    <div className="flex-1 min-w-0 text-gray-500 truncate mr-2">{material.subtitulo}</div>
    <div className="flex-1 min-w-0 text-gray-400 truncate mr-2">{material.autor}</div>
    <div className="w-16 min-w-0 text-gray-400 truncate mr-2">{material.paginas || "-"}</div>
    <div className="w-16 min-w-0 text-gray-400 truncate mr-2">{typeof material.arquivo === "string" ? material.arquivo : material.arquivo?.name || "-"}</div>
    <div className="w-14 flex gap-1 justify-center">
      <button onClick={onEdit} title="Editar" className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
      <button onClick={onDelete} title="Excluir" className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
    </div>
  </li>
);

export default LeituraListItem;
