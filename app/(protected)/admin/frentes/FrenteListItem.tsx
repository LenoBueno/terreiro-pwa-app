import React from "react";
import { Edit, Trash2 } from "lucide-react";

interface Frente {
  id: number;
  nome: string;
  tipo: string;
  subtitulo?: string;
  descricao?: string;
  papel?: string;
  imagem?: File | null;
}

interface FrenteListItemProps {
  frente: Frente;
  onEdit: () => void;
  onDelete: () => void;
}

const FrenteListItem: React.FC<FrenteListItemProps> = ({ frente, onEdit, onDelete }) => (
  <li className="flex items-center px-1 py-1 hover:bg-gray-50 text-xs">
    {/* Imagem */}
    <div className="w-14 h-14 mr-3 flex-shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
      {frente.imagem ? (
        <img
          src={typeof frente.imagem === 'string' ? frente.imagem : URL.createObjectURL(frente.imagem)}
          alt={frente.nome}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-gray-400 text-xl">📷</span>
      )}
    </div>
    {/* Título */}
    <div className="flex-[2] min-w-0 font-semibold truncate mr-2">{frente.nome}</div>
    {/* Subtítulo */}
    <div className="flex-1 min-w-0 text-gray-500 truncate mr-2">{frente.subtitulo}</div>
    {/* Papel */}
    <div className="flex-1 min-w-0 text-gray-400 truncate mr-2">{frente.papel}</div>
    {/* Ações */}
    <div className="w-14 flex gap-1 justify-center">
      <button onClick={onEdit} title="Editar" className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
      <button onClick={onDelete} title="Excluir" className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
    </div>
  </li>
);

export default FrenteListItem;
