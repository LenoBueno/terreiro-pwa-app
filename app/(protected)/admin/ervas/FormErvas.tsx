"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormErvasProps {
  initialData?: {
    nome: string
    nomeCientifico: string
    descricao: string
    categoria: string
  }
  onSubmit: (data: {
    nome: string
    nomeCientifico: string
    descricao: string
    categoria: string
  }) => void
  onCancel: () => void
}

const categorias = [
  "proteção",
  "prosperidade",
  "harmonia"
]

export function FormErvas({ initialData, onSubmit, onCancel }: FormErvasProps) {
  const [nome, setNome] = useState(initialData?.nome || "")
  const [nomeCientifico, setNomeCientifico] = useState(initialData?.nomeCientifico || "")
  const [descricao, setDescricao] = useState(initialData?.descricao || "")
  const [categoria, setCategoria] = useState(initialData?.categoria || "")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ nome, nomeCientifico, descricao, categoria })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <Input value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nome Científico</label>
        <Input value={nomeCientifico} onChange={e => setNomeCientifico(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Descrição</label>
        <Textarea value={descricao} onChange={e => setDescricao(e.target.value)} required rows={3} />
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
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-terreiro-green hover:bg-terreiro-green/90">Salvar</Button>
      </div>
    </form>
  )
}
