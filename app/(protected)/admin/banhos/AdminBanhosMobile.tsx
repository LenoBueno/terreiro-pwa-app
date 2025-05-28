"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Banho {
  id: number;
  nome: string;
  tipo: string;
  descricao?: string;
  ervas?: string[];
  indicacoes?: string;
  contraindicacoes?: string;
  modoPreparo?: string;
  imagem?: string;
}

export default function AdminBanhosMobile() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  
  // Dados de exemplo - em uma aplicação real, isso viria de uma API
  const [banhos, setBanhos] = useState<Banho[]>([
    {
      id: 1,
      nome: "Banho de Abertura",
      tipo: "prosperidade",
      descricao: "Banho para abrir caminhos",
      ervas: ["Alecrim", "Arruda", "Manjericão"],
      indicacoes: "Para abrir caminhos e oportunidades",
      contraindicacoes: "Nenhuma conhecida",
      modoPreparo: "Ferver as ervas e coar"
    },
    {
      id: 2,
      nome: "Banho de Proteção",
      tipo: "proteção",
      descricao: "Banho para proteção espiritual",
      ervas: ["Arruda", "Guiné", "Espada de São Jorge"],
      indicacoes: "Para proteção espiritual",
      contraindicacoes: "Gestantes",
      modoPreparo: "Macerar as ervas e ferver"
    }
  ]);

  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'prosperidade' | 'proteção' | 'limpeza'>('todos');

  // Filtra os banhos com base na busca e no filtro ativo
  const banhosFiltrados = banhos.filter(banho => {
    const buscaCorresponde = 
      banho.nome.toLowerCase().includes(busca.toLowerCase()) ||
      banho.tipo.toLowerCase().includes(busca.toLowerCase()) ||
      banho.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
      banho.ervas?.some(erva => erva.toLowerCase().includes(busca.toLowerCase()));
      
    const filtroCorresponde = 
      filtroAtivo === 'todos' || 
      banho.tipo === filtroAtivo;
      
    return buscaCorresponde && filtroCorresponde;
  });

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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Banhos</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Abas de Filtro */}
        <div className="flex items-center mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setFiltroAtivo('todos')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'todos' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroAtivo('prosperidade')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'prosperidade' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Prosperidade
            </button>
            <button
              onClick={() => setFiltroAtivo('proteção')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'proteção' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Proteção
            </button>
            <button
              onClick={() => setFiltroAtivo('limpeza')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'limpeza' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Limpeza
            </button>
          </div>
        </div>

        {/* Lista de Banhos */}
        <div className="grid grid-cols-3 gap-4">
          {banhosFiltrados.length > 0 ? (
            banhosFiltrados.map((banho) => (
              <Link
                key={banho.id}
                href={`/admin/banhos/${banho.id}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200">
                  {banho.imagem ? (
                    <img
                      src={banho.imagem}
                      alt={banho.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/fx.png';
                      }}
                    />
                  ) : (
                    <span className="text-2xl flex items-center justify-center w-full h-full bg-gray-100">💧</span>
                  )}
                </div>
                <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#006B3F] transition-colors">
                  {banho.nome}
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              Nenhum banho encontrado
            </div>
          )}
        </div>

        {/* Botão Flutuante Adicionar */}
        <div className="fixed bottom-8 right-6">
          <Button 
            onClick={() => router.push('/admin/banhos/nova')}
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  );
}