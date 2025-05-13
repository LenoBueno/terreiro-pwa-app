import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface FormFrenteProps {
  onSubmit: (data: {
    titulo: string;
    subtitulo: string;
    descricao: string;
    papel: string;
    imagem: File | null;
    categoria: string;
  }) => void;
  onCancel?: () => void;
  initialData?: {
    titulo?: string;
    subtitulo?: string;
    descricao?: string;
    papel?: string;
    imagem?: File | null;
    categoria?: string;
  };
}

const FormFrente: React.FC<FormFrenteProps> = ({ onSubmit, onCancel, initialData }) => {
  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(initialData?.subtitulo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [cores, setCores] = useState(initialData?.cores || "");
  const [imagem, setImagem] = useState<File | null>(initialData?.imagem || null);
  const [categoria, setCategoria] = useState(initialData?.categoria || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ titulo, subtitulo, descricao, cores, imagem, categoria });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Adicionar Nova Frente</DialogTitle>
        <DialogDescription>Preencha os dados da nova frente espiritual.</DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        <Input id="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoria</Label>
        <select
          id="categoria"
          className="w-full border rounded p-2"
          value={categoria || initialData?.categoria || ''}
          onChange={e => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="umbanda">Umbanda</option>
          <option value="nacao">Nação</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <textarea id="descricao" className="w-full border rounded p-2 min-h-[80px]" value={descricao} onChange={e => setDescricao(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cores">Cores</Label>
        <Input id="cores" value={cores} onChange={e => setCores(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imagem">Imagem</Label>
        <Input id="imagem" type="file" accept="image/*" onChange={e => setImagem(e.target.files?.[0] || null)} />
        {imagem && <span className="text-xs text-muted-foreground">{imagem.name}</span>}
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button className="bg-terreiro-green hover:bg-terreiro-green/90" type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
};

export default FormFrente;
