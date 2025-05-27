import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FormMensagemProps {
  initial?: { titulo: string; subtitulo?: string; descricao: string; data: string; urgente?: boolean };
  onCancel?: () => void;
  onSave?: (mensagem: { titulo: string; subtitulo?: string; descricao: string; data: string; urgente: boolean }) => void;
}

const FormMensagem: React.FC<FormMensagemProps> = ({ initial, onCancel, onSave }) => {
  const [titulo, setTitulo] = useState(initial?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(initial?.subtitulo || "");
  const [descricao, setDescricao] = useState(initial?.descricao || "");
  const [data, setData] = useState(initial?.data || "");
  const [urgente, setUrgente] = useState(initial?.urgente || false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave({ titulo, subtitulo, descricao, data, urgente });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#006B3F]">
          {initial ? "Editar Mensagem" : "Adicionar Mensagem"}
        </h2>
        <p className="text-sm text-gray-500">Preencha os dados da mensagem.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        <Input id="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <textarea id="descricao" className="w-full border rounded p-2 min-h-[80px]" value={descricao} onChange={e => setDescricao(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Input id="data" type="date" value={data} onChange={e => setData(e.target.value)} required />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={urgente} onCheckedChange={setUrgente} id="urgente" />
        <Label htmlFor="urgente">Urgente?</Label>
      </div>
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button className="bg-terreiro-green hover:bg-terreiro-green/90" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default FormMensagem;
