import React from "react";
import EventoListItem from "./EventoListItem";

interface Evento {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  data: string;
}

interface EventoListProps {
  eventos: Evento[];
  onEdit: (evento: Evento) => void;
  onDelete: (id: number) => void;
}

const EventoList: React.FC<EventoListProps> = ({ eventos, onEdit, onDelete }) => (
  <div>
    <div className="flex items-center px-1 py-1 font-bold text-gray-700 text-sm border-b border-gray-200 max-w-2xl">
      <div className="flex-[2] min-w-0 mr-2">Título</div>
      <div className="flex-1 min-w-0 mr-2">Subtítulo</div>
      <div className="flex-1 min-w-0 mr-2">Data</div>
      <div className="w-14 text-center">Ações</div>
    </div>
    <ul className="max-w-2xl text-sm">
      {eventos.map((evento, idx) => (
        <React.Fragment key={evento.id}>
          <EventoListItem
            evento={evento}
            onEdit={() => onEdit(evento)}
            onDelete={() => onDelete(evento.id)}
          />
          {idx < eventos.length - 1 && <hr className="border-gray-200 my-0.5" />}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default EventoList;
