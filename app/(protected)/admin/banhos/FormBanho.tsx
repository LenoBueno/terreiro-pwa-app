import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

interface FormData {
  nome: string;
  tipo: string;
  descricao: string;
  ervas: string[];
  indicacoes: string;
  contraindicacoes: string;
  modoPreparo: string;
  imagem: File | null;
  imagemUrl?: string;
}

interface FormBanhoProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  initialData?: Partial<FormData>;
}

const FormBanho: React.FC<FormBanhoProps> = ({ onSubmit, onCancel, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [tipo, setTipo] = useState(initialData?.tipo || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [ervas, setErvas] = useState<string[]>(initialData?.ervas || []);
  const [novaErva, setNovaErva] = useState("");
  const [indicacoes, setIndicacoes] = useState(initialData?.indicacoes || "");
  const [contraindicacoes, setContraindicacoes] = useState(initialData?.contraindicacoes || "");
  const [modoPreparo, setModoPreparo] = useState(initialData?.modoPreparo || "");
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
      tipo, 
      descricao, 
      ervas,
      indicacoes, 
      contraindicacoes, 
      modoPreparo,
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

  function handleAddErva(e: React.FormEvent) {
    e.preventDefault();
    if (novaErva.trim() && !ervas.includes(novaErva.trim())) {
      setErvas([...ervas, novaErva.trim()]);
      setNovaErva("");
    }
  }

  function handleRemoveErva(ervaParaRemover: string) {
    setErvas(ervas.filter(erva => erva !== ervaParaRemover));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{initialData?.nome ? 'Editar Banho' : 'Adicionar Novo Banho'}</h2>
        <p className="text-sm text-gray-600">Preencha os dados do banho.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo</Label>
        <select
          id="tipo"
          className="w-full border rounded p-2"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione um tipo</option>
          <option value="prosperidade">Prosperidade</option>
          <option value="proteção">Proteção</option>
          <option value="limpeza">Limpeza</option>
          <option value="amor">Amor</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Ervas</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {ervas.map((erva, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span className="text-sm">{erva}</span>
              <button
                type="button"
                onClick={() => handleRemoveErva(erva)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={novaErva}
            onChange={e => setNovaErva(e.target.value)}
            placeholder="Adicionar erva"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddErva}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
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
        <Label htmlFor="modoPreparo">Modo de Preparo</Label>
        <Textarea
          id="modoPreparo"
          value={modoPreparo}
          onChange={e => setModoPreparo(e.target.value)}
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
          {initialData?.nome ? 'Salvar' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};

export default FormBanho;