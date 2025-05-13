"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FormUsuariosProps {
  initialData?: {
    nome: string
    sobrenome: string
    dataNascimento: string
    telefone: string
    email: string
    orixa: string
    dataBatismo: string
    dataObrigacao: string
    cargo: string
    ativo: boolean
  }
  onSubmit: (data: {
    nome: string
    sobrenome: string
    dataNascimento: string
    telefone: string
    email: string
    orixa: string
    dataBatismo: string
    dataObrigacao: string
    cargo: string
    ativo: boolean
  }) => void
  onCancel: () => void
}

export function FormUsuarios({ initialData, onSubmit, onCancel }: FormUsuariosProps) {
  const [nome, setNome] = useState(initialData?.nome || "")
  const [sobrenome, setSobrenome] = useState(initialData?.sobrenome || "")
  const [dataNascimento, setDataNascimento] = useState(initialData?.dataNascimento || "")
  const [telefone, setTelefone] = useState(initialData?.telefone || "")
  const [email, setEmail] = useState(initialData?.email || "")
  const [orixa, setOrixa] = useState(initialData?.orixa || "")
  const [dataBatismo, setDataBatismo] = useState(initialData?.dataBatismo || "")
  const [dataObrigacao, setDataObrigacao] = useState(initialData?.dataObrigacao || "")
  const [cargo, setCargo] = useState(initialData?.cargo || "membro")
  const [ativo, setAtivo] = useState(initialData?.ativo ?? true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ nome, sobrenome, dataNascimento, telefone, email, orixa, dataBatismo, dataObrigacao, cargo, ativo })
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{maxWidth:'600px', margin:'0 auto'}} onSubmit={handleSubmit}>

      <div>
        <label className="block mb-1 font-medium">Cargo</label>
        <div className="flex gap-4">
          {['admin', 'editor', 'membro'].map(role => (
            <label key={role} className="inline-flex items-center gap-1 cursor-pointer text-sm">
              <input
                type="radio"
                name="cargo"
                value={role}
                checked={cargo === role}
                onChange={() => setCargo(role)}
                className="accent-terreiro-green"
              />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Nome</label>
        <Input value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Sobrenome</label>
        <Input value={sobrenome} onChange={e => setSobrenome(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Data de Nascimento</label>
        <Input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Telefone</label>
        <Input value={telefone} onChange={e => setTelefone(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">E-mail</label>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Orixá</label>
        <Input value={orixa} onChange={e => setOrixa(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Data de Batismo</label>
        <Input type="date" value={dataBatismo} onChange={e => setDataBatismo(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Data de Obrigação</label>
        <Input type="date" value={dataObrigacao} onChange={e => setDataObrigacao(e.target.value)} required />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-terreiro-green hover:bg-terreiro-green/90">Salvar</Button>
      </div>
    </form>
  )
}
