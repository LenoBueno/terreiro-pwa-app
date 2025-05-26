"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, ArrowLeft, Edit, Trash2, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Usuario {
  id: number
  nome: string
  email: string
  telefone: string
  orixa: string
  cargo: 'admin' | 'editor' | 'membro'
  status: 'ativo' | 'inativo'
}

export default function AdminUsersMobile() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  
  // Dados de exemplo - em uma aplicação real, isso viria de uma API
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Maria da Mata",
      email: "maria@example.com",
      telefone: "(11) 99999-1111",
      orixa: "Oxum",
      cargo: 'admin',
      status: 'ativo'
    },
    {
      id: 2,
      nome: "João da Paz",
      email: "joao@example.com",
      telefone: "(21) 98888-2222",
      orixa: "Ogum",
      cargo: 'editor',
      status: 'ativo'
    },
    {
      id: 3,
      nome: "Ana Clara",
      email: "ana@example.com",
      telefone: "(31) 97777-3333",
      orixa: "Iemanjá",
      cargo: 'membro',
      status: 'inativo'
    },
    {
      id: 4,
      nome: "Pedro Silva",
      email: "pedro@example.com",
      telefone: "(41) 96666-4444",
      orixa: "Oxóssi",
      cargo: 'membro',
      status: 'ativo'
    },
    {
      id: 5,
      nome: "Carla Santos",
      email: "carla@example.com",
      telefone: "(51) 95555-5555",
      orixa: "Iansã",
      cargo: 'editor',
      status: 'ativo'
    }
  ])

  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'admin' | 'editor' | 'membro'>('todos')

  // Filtra os usuários com base na busca e no filtro ativo
  const usuariosFiltrados = usuarios.filter(usuario => {
    const buscaCorresponde = 
      usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.telefone.includes(busca) ||
      usuario.orixa.toLowerCase().includes(busca.toLowerCase())
      
    const filtroCorresponde = 
      filtroAtivo === 'todos' || 
      usuario.cargo === filtroAtivo
      
    return buscaCorresponde && filtroCorresponde
  })

  // Função para obter as iniciais do nome
  const getIniciais = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        {/* Cabeçalho com botão voltar */}
        <div className="flex items-center mb-6">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Usuários</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Abas de Filtro por Cargo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {['todos', 'admin', 'editor', 'membro'].map((cargo) => (
              <button
                key={cargo}
                onClick={() => setFiltroAtivo(cargo as any)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  filtroAtivo === cargo
                    ? 'text-[#006B3F] border-b-2 border-[#006B3F]'
                    : 'text-gray-500 hover:text-[#006B3F]'
                }`}
              >
                {cargo === 'todos' 
                  ? 'Todos' 
                  : cargo.charAt(0).toUpperCase() + cargo.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Lista de Usuários */}
        <div className="grid grid-cols-3 gap-4">
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => (
              <div 
                key={usuario.id}
                onClick={() => {
                  console.log('Navegando para editar usuário:', usuario.id);
                  router.push(`/admin/users/${usuario.id}`);
                }}
                className="group flex flex-col items-center cursor-pointer w-20"
              >
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 group-hover:scale-105">
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-gray-100 text-gray-700">
                    {getIniciais(usuario.nome)}
                  </div>
                </div>
                <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#006B3F] transition-colors line-clamp-1 w-full">
                  {usuario.nome}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              Nenhum usuário encontrado
            </div>
          )}
        </div>

        {/* Botão Flutuante Adicionar */}
        <div className="fixed bottom-8 right-6">
          <Button 
            onClick={() => router.push('/admin/users/nova')}
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  )
}
