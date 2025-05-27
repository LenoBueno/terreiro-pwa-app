"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Evento {
  id: number
  titulo: string
  subtitulo: string
  descricao: string
  data: string
}

export default function AdminEventosMobile() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [eventos, setEventos] = useState<Evento[]>([])
  
  // Carregar eventos - em uma aplicação real, isso viria de uma API
  useEffect(() => {
    // Simulando uma chamada de API
    const fetchEventos = async () => {
      try {
        // Dados de exemplo
        const eventosExemplo: Evento[] = [
          {
            id: 1,
            titulo: "Gira de Caboclos",
            subtitulo: "Sessão especial",
            descricao: "Evento espiritual com entidades caboclas.",
            data: "2025-05-15"
          },
          {
            id: 2,
            titulo: "Estudo sobre Ervas",
            subtitulo: "Aula aberta",
            descricao: "Aprenda sobre ervas e seus usos na espiritualidade.",
            data: "2025-05-18"
          },
          {
            id: 3,
            titulo: "Festa de Iemanjá",
            subtitulo: "Comemoração anual",
            descricao: "Homenagem à Rainha do Mar.",
            data: "2025-05-25"
          }
        ];
        setEventos(eventosExemplo);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    fetchEventos();
  }, [])

  // Filtra os eventos com base na busca
  const eventosFiltrados = eventos.filter(evento => 
    evento.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    (evento.subtitulo && evento.subtitulo.toLowerCase().includes(busca.toLowerCase()))
  )

  // Função para formatar a data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Função para obter as iniciais do título
  const getIniciais = (titulo: string) => {
    return titulo
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Eventos</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Lista de Eventos */}
        <div className="space-y-4">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((evento) => (
              <div 
                key={evento.id}
                onClick={() => router.push(`/admin/eventos/${evento.id}`)}
                className="group flex items-center p-4 bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#006B3F] transition-colors">
                    {evento.titulo}
                  </h3>
                  {evento.subtitulo && (
                    <p className="text-xs text-gray-500 truncate">{evento.subtitulo}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formatarData(evento.data)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum evento encontrado
            </div>
          )}
        </div>

        {/* Botão Adicionar */}
        <div className="fixed bottom-8 right-6">
          <Link href="/admin/eventos/nova">
            <Button 
              className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
