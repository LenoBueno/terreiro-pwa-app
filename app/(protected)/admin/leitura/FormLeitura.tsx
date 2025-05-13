import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface FormLeituraProps {
  initial?: { titulo: string; subtitulo?: string; autor: string; paginas?: number; arquivo?: File | null; categoria?: string };
  onCancel?: () => void;
  onSave?: (material: { titulo: string; subtitulo?: string; autor: string; paginas?: number; arquivo?: File | null; categoria?: string }) => void;
}

const FormLeitura: React.FC<FormLeituraProps> = ({ initial, onCancel, onSave }) => {
  const [titulo, setTitulo] = useState(initial?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(initial?.subtitulo || "");
  const [autor, setAutor] = useState(initial?.autor || "");
  const [paginas, setPaginas] = useState(initial?.paginas?.toString() || "");
  const [arquivo, setArquivo] = useState<File | null>(initial?.arquivo || null);
  const [categoria, setCategoria] = useState(initial?.categoria || "estudos");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave({ titulo, subtitulo, autor, paginas: paginas ? Number(paginas) : undefined, arquivo, categoria });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{initial ? "Editar Material" : "Adicionar Material"}</DialogTitle>
        <DialogDescription>Preencha os dados do material de leitura.</DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        <Input id="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="autor">Autor</Label>
        <Input id="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="paginas">Páginas</Label>
        <Input id="paginas" type="number" min="1" value={paginas} onChange={e => setPaginas(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Categorias</Label>
        <div className="flex gap-4">
  {['estudos', 'guias', 'história'].map(cat => (
    <label key={cat} className="flex items-center gap-1 cursor-pointer">
      <input
        type="radio"
        name="categoria"
        value={cat}
        checked={categoria === cat}
        onChange={() => setCategoria(cat)}
      />
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </label>
  ))}
</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="arquivo">Upload</Label>
        <Input id="arquivo" type="file" accept=".pdf,.doc,.docx" onChange={e => setArquivo(e.target.files?.[0] || null)} />
        {arquivo && <span className="text-xs text-gray-500">{arquivo.name}</span>}
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button className="bg-terreiro-green hover:bg-terreiro-green/90" type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
};

export default FormLeitura;
