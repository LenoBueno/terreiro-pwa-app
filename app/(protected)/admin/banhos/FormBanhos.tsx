"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export interface Erva {
  id: number
  nome: string
  nomeCientifico: string
  descricao: string
  categoria: string
}

interface FormBanhosProps {
  initialData?: {
    titulo: string
    subtitulo: string
    categoria: string
    ervas: number[]
  }
  ervasDisponiveis: Erva[]
  onSubmit: (data: {
    titulo: string
    subtitulo: string
    categoria: string
    ervas: number[]
  }) => void
  onCancel: () => void
}

const categorias = [
  "limpeza",
  "prosperidade",
  "protecao",
  "amor",
  "harmonia"
]

export function FormBanhos({ initialData, ervasDisponiveis, onSubmit, onCancel }: FormBanhosProps) {
  const [titulo, setTitulo] = useState(initialData?.titulo || "")
  const [subtitulo, setSubtitulo] = useState(initialData?.subtitulo || "")
  const [categoria, setCategoria] = useState(initialData?.categoria || "")
  const [ervas, setErvas] = useState<number[]>(initialData?.ervas || [])

  function handleErvaToggle(id: number) {
    setErvas((prev) => prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ titulo, subtitulo, categoria, ervas })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Título</label>
        <Input value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Subtítulo</label>
        <Input value={subtitulo} onChange={e => setSubtitulo(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Categoria</label>
        <select
          className="block w-full border rounded px-3 py-2"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Ervas</label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded p-2">
          {ervasDisponiveis.map(erva => (
            <label key={erva.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ervas.includes(erva.id)}
                onChange={() => handleErvaToggle(erva.id)}
              />
              <span>{erva.nome}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-terreiro-green hover:bg-terreiro-green/90">Salvar</Button>
      </div>
    </form>
  )
}
