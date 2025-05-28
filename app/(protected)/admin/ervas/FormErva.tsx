import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface FormData {
  nome: string;
  nomeCientifico: string;
  propriedades: string;
  indicacoes: string;
  contraindicacoes: string;
  imagem: File | null;
  imagemUrl?: string;
}

interface FormErvaProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  initialData?: Partial<FormData>;
}

const FormErva: React.FC<FormErvaProps> = ({ onSubmit, onCancel, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [nomeCientifico, setNomeCientifico] = useState(initialData?.nomeCientifico || "");
  const [propriedades, setPropriedades] = useState(initialData?.propriedades || "");
  const [indicacoes, setIndicacoes] = useState(initialData?.indicacoes || "");
  const [contraindicacoes, setContraindicacoes] = useState(initialData?.contraindicacoes || "");
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualiza a prévia da imagem quando initialData.imagemUrl muda
  useEffect(() => {
    if (initialData?.imagemUrl) {
      setImagemPreview(initialData.imagemUrl);
    }
  }, [initialData?.imagemUrl]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ 
      nome, 
      nomeCientifico,
      propriedades, 
      indicacoes, 
      contraindicacoes, 
      imagem
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
        <h2 className="text-lg font-semibold">{initialData?.nome ? 'Editar Erva' : 'Adicionar Nova Erva'}</h2>
        <p className="text-sm text-gray-600">Preencha os dados da erva.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomeCientifico">Nome Científico</Label>
        <Input id="nomeCientifico" value={nomeCientifico} onChange={e => setNomeCientifico(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="propriedades">Propriedades</Label>
        <Textarea
          id="propriedades"
          value={propriedades}
          onChange={e => setPropriedades(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="indicacoes">Indicações</Label>
        <Textarea
          id="indicacoes"
          value={indicacoes}
          onChange={e => setIndicacoes(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contraindicacoes">Contraindicações</Label>
        <Textarea
          id="contraindicacoes"
          value={contraindicacoes}
          onChange={e => setContraindicacoes(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Imagem</Label>
        <div className="flex items-center gap-4">
          {(imagemPreview || initialData?.imagemUrl) && (
            <div className="relative w-24 h-24">
              <img
                src={imagemPreview || initialData?.imagemUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="flex-1"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData?.nome ? 'Salvar Alterações' : 'Adicionar Erva'}
        </Button>
      </div>
    </form>
  );
};

export default FormErva;