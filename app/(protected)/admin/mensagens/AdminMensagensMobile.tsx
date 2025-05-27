"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Tipagem para as mensagens
interface Mensagem {
  id: number;
  titulo: string;
  subtitulo?: string;
  descricao: string;
  data: string;
  urgente: boolean;
  rascunho?: boolean; // Propriedade para indicar se é um rascunho
}

export default function AdminMensagensMobile() {
  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState<string>("todas");
  const router = useRouter();
  
  // Dados simulados - em uma aplicação real, isso viria de uma API
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      titulo: "Reunião de Planejamento",
      subtitulo: "Planejamento mensal",
      descricao: "Reunião para planejar as atividades do próximo mês",
      data: "2024-06-10",
      urgente: true,
      rascunho: false
    },
    {
      id: 2,
      titulo: "Festa Junina",
      descricao: "Venha participar da nossa festa junina",
      data: "2024-06-23",
      urgente: false,
      rascunho: true
    }
  ]);

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' // Adiciona timezone para evitar problemas de fuso horário
    };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  // Navegar para edição
  const editarMensagem = (id: number) => {
    router.push(`/admin/mensagens/${id}`);
  };

  // Filtrar mensagens por aba
  const mensagensFiltradas = mensagens.filter((mensagem) => {
    const buscaLower = busca.toLowerCase();
    const correspondeABusca =
      mensagem.titulo.toLowerCase().includes(buscaLower) ||
      (mensagem.subtitulo && mensagem.subtitulo.toLowerCase().includes(buscaLower)) ||
      mensagem.descricao.toLowerCase().includes(buscaLower);
    if (abaAtiva === "todas") return correspondeABusca;
    if (abaAtiva === "enviadas") return correspondeABusca && !mensagem.rascunho;
    if (abaAtiva === "rascunhos") return correspondeABusca && mensagem.rascunho;
    return false;
  });

  // Excluir mensagem
  const excluirMensagem = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      setMensagens(mensagens.filter(msg => msg.id !== id));
    }
  }

  return (
    <div className="fixed inset-0 bg-[#006B3F] pt-16">
      {/* Conteúdo Principal */}
      <main className="absolute top-28 bottom-0 left-0 right-0 bg-white p-6 overflow-auto rounded-t-[35px] shadow-[0_0_15px_rgba(0,0,0,0.10)]">
        <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com botão voltar */}
        <div className="flex items-center mb-6">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-[#006B3F]" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Mensagens</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar mensagens..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Abas de Filtro */}
        <div className="flex items-center mb-6">
          <div className="flex space-x-1 w-full justify-start">
            <button
              onClick={() => setAbaAtiva('todas')}
              className={`px-4 py-2 text-sm font-medium ${abaAtiva === 'todas' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setAbaAtiva('enviadas')}
              className={`px-4 py-2 text-sm font-medium ${abaAtiva === 'enviadas' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Enviadas
            </button>
            <button
              onClick={() => setAbaAtiva('rascunhos')}
              className={`px-4 py-2 text-sm font-medium ${abaAtiva === 'rascunhos' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Rascunhos
            </button>
          </div>
        </div>

        {/* Lista de mensagens em cards */}
        <div className="space-y-4">
          {mensagensFiltradas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma mensagem encontrada
            </div>
          ) : (
            mensagensFiltradas.map((mensagem) => (
              <div
                key={mensagem.id}
                onClick={() => editarMensagem(mensagem.id)}
                className="group flex items-center p-4 bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.10)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#006B3F]/10 flex items-center justify-center text-[#006B3F] mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#006B3F] transition-colors">
                    {mensagem.titulo}
                  </h3>
                  {mensagem.subtitulo && (
                    <p className="text-xs text-gray-500 truncate">{mensagem.subtitulo}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formatarData(mensagem.data)}
                    {mensagem.urgente && (
                      <span className="ml-2 inline-block bg-red-50 text-red-700 border border-red-100 text-[10px] px-2 py-0.5 rounded-full align-middle">Urgente</span>
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botão flutuante de adicionar */}
        <div className="fixed bottom-8 right-8 z-10">
          <Button 
            className="rounded-full w-14 h-14 bg-terreiro-green hover:bg-terreiro-green/90 shadow-lg"
            onClick={() => router.push('/admin/mensagens/nova')}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        </div>
      </main>
    </div>
  );
}
