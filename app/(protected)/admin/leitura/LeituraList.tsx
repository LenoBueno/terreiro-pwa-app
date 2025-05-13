import React from "react";
import LeituraListItem from "./LeituraListItem";

interface Material {
  id: number;
  titulo: string;
  subtitulo?: string;
  autor: string;
  paginas?: number;
  arquivo?: File | null | string;
}

interface LeituraListProps {
  materiais: Material[];
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
}

const LeituraList: React.FC<LeituraListProps> = ({ materiais, onEdit, onDelete }) => (
  <div>
    <div className="flex items-center px-1 py-1 font-bold text-gray-700 text-sm border-b border-gray-200 max-w-3xl">
      <div className="flex-[2] min-w-0 mr-2">Título</div>
      <div className="flex-1 min-w-0 mr-2">Subtítulo</div>
      <div className="flex-1 min-w-0 mr-2">Autor</div>
      <div className="w-16 min-w-0 mr-2">Páginas</div>
      <div className="w-16 min-w-0 mr-2">Arquivo</div>
      <div className="w-14 text-center">Ações</div>
    </div>
    <ul className="max-w-3xl text-sm">
      {materiais.map((material, idx) => (
        <React.Fragment key={material.id}>
          <LeituraListItem
            material={material}
            onEdit={() => onEdit(material)}
            onDelete={() => onDelete(material.id)}
          />
          {idx < materiais.length - 1 && <hr className="border-gray-200 my-0.5" />}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default LeituraList;
