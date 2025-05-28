"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Erva {
  id: number;
  nome: string;
  nomeCientifico: string;
  propriedades: string;
  indicacoes: string;
  contraindicacoes: string;
  imagem?: string;
}

export default function AdminErvasMobile() {
  const router = useRouter();
  const [busca, setBusca] = useState("");
  
  // Dados de exemplo - em uma aplicação real, isso viria de uma API
  const [ervas, setErvas] = useState<Erva[]>([
    {
      id: 1,
      nome: "Arruda",
      nomeCientifico: "Ruta graveolens",
      propriedades: "Proteção espiritual",
      indicacoes: "Banhos de proteção",
      contraindicacoes: "Gestantes"
    },
    {
      id: 2,
      nome: "Alecrim",
      nomeCientifico: "Rosmarinus officinalis",
      propriedades: "Limpeza e proteção",
      indicacoes: "Banhos de limpeza",
      contraindicacoes: "Nenhuma conhecida"
    }
  ]);

  const [filtroAtivo, setFiltroAtivo] = useState<'todas' | 'proteção' | 'limpeza'>('todas');

  // Filtra as ervas com base na busca e no filtro ativo
  const ervasFiltradas = ervas.filter(erva => {
    const buscaCorresponde = 
      erva.nome.toLowerCase().includes(busca.toLowerCase()) ||
      erva.nomeCientifico.toLowerCase().includes(busca.toLowerCase()) ||
      erva.propriedades.toLowerCase().includes(busca.toLowerCase()) ||
      erva.indicacoes.toLowerCase().includes(busca.toLowerCase());
      
    const filtroCorresponde = filtroAtivo === 'todas';
      
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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Ervas</h1>
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
              onClick={() => setFiltroAtivo('todas')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'todas' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Todas
            </button>
          </div>
        </div>

        {/* Lista de Ervas */}
        <div className="grid grid-cols-3 gap-4">
          {ervasFiltradas.length > 0 ? (
            ervasFiltradas.map((erva) => (
              <Link
                key={erva.id}
                href={`/admin/ervas/${erva.id}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200">
                  {erva.imagem ? (
                    <img
                      src={erva.imagem}
                      alt={erva.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/fx.png';
                      }}
                    />
                  ) : (
                    <span className="text-2xl flex items-center justify-center w-full h-full bg-gray-100">🌿</span>
                  )}
                </div>
                <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#006B3F] transition-colors">
                  {erva.nome}
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              Nenhuma erva encontrada
            </div>
          )}
        </div>

        {/* Botão Flutuante Adicionar */}
        <div className="fixed bottom-8 right-6">
          <Button 
            onClick={() => router.push('/admin/ervas/nova')}
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  );
}