import React from "react";
import MensagemListItem from "./MensagemListItem";

interface Mensagem {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  data: string;
  urgente: boolean;
}

interface MensagemListProps {
  mensagens: Mensagem[];
  onEdit: (mensagem: Mensagem) => void;
  onDelete: (id: number) => void;
}

const MensagemList: React.FC<MensagemListProps> = ({ mensagens, onEdit, onDelete }) => (
  <div>
    <div className="flex items-center px-1 py-1 font-bold text-gray-700 text-sm border-b border-gray-200 max-w-3xl">
      <div className="flex-[2] min-w-0 mr-2">Título</div>
      <div className="flex-1 min-w-0 mr-2">Subtítulo</div>
      <div className="flex-1 min-w-0 mr-2">Data</div>
      <div className="flex-1 min-w-0 mr-2">Prioridade</div>
      <div className="w-14 text-center">Ações</div>
    </div>
    <ul className="max-w-3xl text-sm">
      {mensagens.map((mensagem, idx) => (
        <React.Fragment key={mensagem.id}>
          <MensagemListItem
            mensagem={mensagem}
            onEdit={() => onEdit(mensagem)}
            onDelete={() => onDelete(mensagem.id)}
          />
          {idx < mensagens.length - 1 && <hr className="border-gray-200 my-0.5" />}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default MensagemList;
