import React from "react";
import FrenteListItem from "./FrenteListItem";

interface Frente {
  id: number;
  nome: string;
  tipo: string;
  subtitulo?: string;
  descricao?: string;
  papel?: string;
  imagem?: File | null;
}

interface FrenteListProps {
  frentes: Frente[];
  onEdit: (frente: Frente) => void;
  onDelete: (id: number) => void;
}

const FrenteList: React.FC<FrenteListProps> = ({ frentes, onEdit, onDelete }) => (
  <div>
    {/* Cabeçalho */}
    <div className="flex items-center px-1 py-1 font-bold text-gray-700 text-xs border-b border-gray-200 max-w-2xl">
      <div className="w-14 h-14 mr-3 flex items-center">Imagem</div>
      <div className="flex-[2] min-w-0 mr-2">Título</div>
      <div className="flex-1 min-w-0 mr-2">Subtítulo</div>
      <div className="flex-1 min-w-0 mr-2">Papel</div>
      <div className="w-14 text-center">Ações</div>
    </div>
    <ul className="max-w-2xl">
      {frentes.map((frente, idx) => (
        <React.Fragment key={frente.id}>
          <FrenteListItem
            frente={frente}
            onEdit={() => onEdit(frente)}
            onDelete={() => onDelete(frente.id)}
          />
          {idx < frentes.length - 1 && <hr className="border-gray-200 my-0.5" />}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default FrenteList;
