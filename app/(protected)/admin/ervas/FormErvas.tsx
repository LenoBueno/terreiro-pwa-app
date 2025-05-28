"use client"

import { useState, useRef, ChangeEvent, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface FormErvasProps {
  initialData?: {
    nome: string
    nomeCientifico: string
    propriedades: string
    indicacoes: string
    contraindicacoes: string
    imagemUrl?: string
  }
  onSubmit: (data: {
    nome: string
    nomeCientifico: string
    propriedades: string
    indicacoes: string
    contraindicacoes: string
    imagem?: File | null
  }) => void
  onCancel: () => void
}

export function FormErvas({ initialData, onSubmit, onCancel }: FormErvasProps) {
  const [nome, setNome] = useState(initialData?.nome || "")
  const [nomeCientifico, setNomeCientifico] = useState(initialData?.nomeCientifico || "")
  const [propriedades, setPropriedades] = useState(initialData?.propriedades || "")
  const [indicacoes, setIndicacoes] = useState(initialData?.indicacoes || "")
  const [contraindicacoes, setContraindicacoes] = useState(initialData?.contraindicacoes || "")
  const [imagem, setImagem] = useState<File | null>(null)
  const [imagemPreview, setImagemPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Atualiza a prévia da imagem quando initialData.imagemUrl muda
  useEffect(() => {
    if (initialData?.imagemUrl) {
      setImagemPreview(initialData.imagemUrl)
    }
  }, [initialData?.imagemUrl])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ 
      nome, 
      nomeCientifico,
      propriedades, 
      indicacoes, 
      contraindicacoes, 
      imagem 
    })
  }
  
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImagem(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  function handleRemoveImage() {
    setImagem(null)
    setImagemPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="nome" className="block mb-1 font-medium">Nome</Label>
        <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="nomeCientifico" className="block mb-1 font-medium">Nome Científico</Label>
        <Input id="nomeCientifico" value={nomeCientifico} onChange={e => setNomeCientifico(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="propriedades" className="block mb-1 font-medium">Propriedades</Label>
        <Textarea id="propriedades" value={propriedades} onChange={e => setPropriedades(e.target.value)} required rows={3} />
      </div>
      <div>
        <Label htmlFor="indicacoes" className="block mb-1 font-medium">Indicações</Label>
        <Textarea id="indicacoes" value={indicacoes} onChange={e => setIndicacoes(e.target.value)} required rows={3} />
      </div>
      <div>
        <Label htmlFor="contraindicacoes" className="block mb-1 font-medium">Contraindicações</Label>
        <Textarea id="contraindicacoes" value={contraindicacoes} onChange={e => setContraindicacoes(e.target.value)} required rows={3} />
      </div>
      <div>
        <Label htmlFor="imagem" className="block mb-1 font-medium">Imagem</Label>
        <div className="flex flex-col gap-2">
          {imagemPreview && (
            <div className="relative w-32 h-32 mb-2">
              <img 
                src={imagemPreview} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md" 
              />
              <button 
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <Input 
            id="imagem"
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            ref={fileInputRef}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  )
}
