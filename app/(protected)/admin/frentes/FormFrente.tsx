import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface FormData {
  titulo: string;
  subtitulo: string;
  descricao: string;
  cores: string;
  imagem: File | null;
  imagemUrl?: string;
  categoria: string;
}

interface FormFrenteProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  initialData?: Partial<FormData>;
}

const FormFrente: React.FC<FormFrenteProps> = ({ onSubmit, onCancel, initialData }) => {
  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(initialData?.subtitulo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [cores, setCores] = useState(initialData?.cores || "");
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [categoria, setCategoria] = useState(initialData?.categoria || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualiza a prévia da imagem quando initialData.imagemUrl muda
  useEffect(() => {
    if (initialData?.imagemUrl) {
      setImagemPreview(initialData.imagemUrl);
    }
  }, [initialData?.imagemUrl]);
  
  // Função para obter a URL da imagem para exibição
  const getImagemSrc = () => {
    if (imagemPreview) return imagemPreview;
    if (initialData?.imagemUrl) return initialData.imagemUrl;
    return '';
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ 
      titulo, 
      subtitulo, 
      descricao, 
      cores, 
      imagem,
      categoria 
    });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagem(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveImage() {
    setImagem(null);
    setImagemPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{initialData?.titulo ? 'Editar Frente' : 'Adicionar Nova Frente'}</h2>
        <p className="text-sm text-gray-600">Preencha os dados da frente espiritual.</p>
      </div>
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
        <div className="flex items-center gap-2">
          <Input 
            id="imagem" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            ref={fileInputRef}
            className="flex-1"
          />
          {(imagem || imagemPreview) && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {(imagemPreview || initialData?.imagemUrl) && (
          <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden border">
            <img 
              src={getImagemSrc()} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default FormFrente;
