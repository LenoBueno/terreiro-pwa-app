import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


/**
 * Propriedades do componente FormLeitura
 */
interface FormLeituraProps {
  /** 
   * Valores iniciais do formulário
   * @property {string} titulo - Título do material
   * @property {string} [subtitulo] - Subtítulo opcional
   * @property {string} autor - Nome do autor
   * @property {number} [paginas] - Número de páginas (opcional)
   * @property {string|File|null} [arquivo] - Arquivo anexo (opcional)
   * @property {string} [categoria] - Categoria do material (opcional)
   */
  initial?: { 
    titulo: string; 
    subtitulo?: string; 
    autor: string; 
    paginas?: number; 
    arquivo?: string | File | null; 
    categoria?: string 
  };
  onCancel?: () => void;
  /** 
   * Função chamada ao salvar o formulário
   * @param material - Objeto com os dados do material
   * @param material.titulo - Título do material
   * @param [material.subtitulo] - Subtítulo opcional
   * @param material.autor - Nome do autor
   * @param [material.paginas] - Número de páginas (opcional)
   * @param [material.arquivo] - Arquivo anexo (opcional)
   * @param [material.categoria] - Categoria do material (opcional)
   */
  onSave?: (material: { 
    titulo: string; 
    subtitulo?: string; 
    autor: string; 
    paginas?: number; 
    arquivo?: string | File | null; 
    categoria?: string 
  }) => void;
}

const FormLeitura: React.FC<FormLeituraProps> = ({ initial, onCancel, onSave }) => {
  const [titulo, setTitulo] = useState(initial?.titulo || "");
  const [subtitulo, setSubtitulo] = useState(initial?.subtitulo || "");
  const [autor, setAutor] = useState(initial?.autor || "");
  const [paginas, setPaginas] = useState(initial?.paginas?.toString() || "");
  const [arquivo, setArquivo] = useState<string | File | null>(initial?.arquivo || null);
  const [categoria, setCategoria] = useState(initial?.categoria || "estudos");
  
  /**
   * Manipula a seleção de arquivo
   * @param e - Evento de mudança do input de arquivo
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivo(e.target.files[0]);
    } else {
      setArquivo(null);
    }
  };

  /**
   * Manipula o envio do formulário
   * @param e - Evento de submissão do formulário
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) onSave({ titulo, subtitulo, autor, paginas: paginas ? Number(paginas) : undefined, arquivo, categoria });
  }

  /**
   * Obtém o nome do arquivo para exibição
   * @returns Nome do arquivo ou mensagem padrão
   */
  const getFileName = () => {
    if (!arquivo) return 'Nenhum arquivo selecionado';
    return typeof arquivo === 'string' 
      ? arquivo.split('/').pop() || 'Arquivo' 
      : arquivo.name;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="form-title" aria-describedby="form-description">
      <div className="space-y-2">
        <h2 id="form-title" className="text-lg font-semibold text-gray-900">
          {initial ? "Editar Material" : "Adicionar Material"}
        </h2>
        <p id="form-description" className="text-sm text-gray-500">
          Preencha os dados do material de leitura. Os campos marcados com * são obrigatórios.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="titulo">Título *</Label>
        <Input 
          id="titulo" 
          value={titulo} 
          onChange={e => setTitulo(e.target.value)} 
          required 
          aria-required="true"
          aria-describedby="titulo-help"
        />
        <p id="titulo-help" className="text-xs text-gray-500">
          Título principal do material
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        <Input 
          id="subtitulo" 
          value={subtitulo} 
          onChange={e => setSubtitulo(e.target.value)}
          aria-describedby="subtitulo-help"
        />
        <p id="subtitulo-help" className="text-xs text-gray-500">
          Subtítulo ou descrição curta (opcional)
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="autor">Autor *</Label>
        <Input 
          id="autor" 
          value={autor} 
          onChange={e => setAutor(e.target.value)} 
          required 
          aria-required="true"
          aria-describedby="autor-help"
        />
        <p id="autor-help" className="text-xs text-gray-500">
          Nome do autor do material
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="paginas">Páginas</Label>
        <Input 
          id="paginas" 
          type="number" 
          min="1" 
          value={paginas} 
          onChange={e => setPaginas(e.target.value)} 
          aria-describedby="paginas-help"
        />
        <p id="paginas-help" className="text-xs text-gray-500">
          Número total de páginas (opcional)
        </p>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Categoria</legend>
        <div className="flex gap-4" role="radiogroup" aria-labelledby="categoria-legend">
          {['estudos', 'guias', 'história'].map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="categoria"
                value={cat}
                checked={categoria === cat}
                onChange={() => setCategoria(cat)}
                className="h-4 w-4 text-terreiro-green focus:ring-terreiro-green"
                aria-checked={categoria === cat}
              />
              <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="space-y-2">
        <Label htmlFor="arquivo">Arquivo</Label>
        <div className="flex items-center gap-2">
          <Label 
            htmlFor="arquivo" 
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terreiro-green"
          >
            Selecionar arquivo
          </Label>
          <Input 
            id="arquivo" 
            type="file" 
            onChange={handleFileChange} 
            className="hidden"
            aria-describedby="arquivo-help"
          />
          {arquivo && (
            <p className="text-sm text-gray-500 truncate max-w-xs">
              {getFileName()}
            </p>
          )}
        </div>
        <p id="arquivo-help" className="text-xs text-gray-500">
          Formatos aceitos: PDF, DOC, DOCX (opcional)
        </p>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2"
        >
          Cancelar
        </Button>
        <Button 
          className="bg-terreiro-green hover:bg-terreiro-green/90 px-4 py-2" 
          type="submit"
        >
          {initial ? 'Salvar alterações' : 'Adicionar material'}
        </Button>
      </div>
    </form>
  );
};

export default FormLeitura;
