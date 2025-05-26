"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Função para obter a imagem do orixá com base no tipo (nação/umbanda) e nome
const getOrixaImage = (nome: string, tipo: string): string => {
  // Mapeamento de nomes para formatos de arquivo
  const formatarNomeArquivo = (nome: string): string => {
    // Remove acentos e caracteres especiais, mantendo letras e espaços
    const semAcentos = nome.normalize('NFD').replace(/[^\w\s]/gi, '');
    // Remove espaços e mantém a primeira letra de cada palavra em maiúscula
    return semAcentos
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
      .join('')
      // Tratamento especial para nomes com caracteres específicos
      .replace('Oba', 'Obá')
      .replace('Ode', 'Odé')
      .replace('Ossaim', 'Ossain')
      .replace('Oxala', 'Oxalá')
      .replace('Xango', 'Xangô')
      .replace('Xapana', 'Xapanã')
      .replace('Iansa', 'Iansã')
      .replace('Ibeji', 'Ibejis')
      .replace('Iemanja', 'Iemanjá');
  };

  try {
    // Determina o caminho base com base no tipo
    const pasta = tipo === 'nacao' ? 'Nação' : 'Umbanda';
    const nomeFormatado = formatarNomeArquivo(nome);
    
    // Tenta encontrar a imagem correspondente
    const caminhoImagem = `/images/${pasta}/${nomeFormatado}.jpg`;
    
    // Em produção, você pode querer verificar a existência do arquivo via API
    return caminhoImagem;
  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    return '/images/fx.png'; // Imagem padrão caso ocorra algum erro
  }
};

interface Frente {
  id: number;
  nome: string;
  tipo: string;
  imagem?: string;
}

export default function AdminFrentesMobile() {
  const router = useRouter();
  const [filtroAtivo, setFiltroAtivo] = useState<'umbanda' | 'nacao'>('umbanda');
  
  // Dados de exemplo para as frentes com imagens
  const [frentes, setFrentes] = useState<Frente[]>([
    { id: 1, nome: "Bará", tipo: "nacao" },
    { id: 2, nome: "Ogum", tipo: "umbanda" },
    { id: 3, nome: "Oxóssi", tipo: "umbanda" },
    { id: 4, nome: "Xangô", tipo: "nacao" },
    { id: 5, nome: "Oxum", tipo: "nacao" },
    { id: 6, nome: "Iemanjá", tipo: "nacao" },
    { id: 7, nome: "Iansã", tipo: "nacao" },
    { id: 8, nome: "Oxalá", tipo: "nacao" },
  ]);
  
  const [busca, setBusca] = useState("");
  
  // Filtra as frentes com base na busca e no filtro ativo
  const frentesFiltradas = frentes.filter(frente => {
    const buscaCorresponde = frente.nome.toLowerCase().includes(busca.toLowerCase());
    const filtroCorresponde = frente.tipo === filtroAtivo;
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
          <h1 className="text-xl font-semibold text-[#006B3F] flex-1">Frentes</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar frentes..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/50 focus:border-transparent"
          />
        </div>

        {/* Abas de Filtro */}
        <div className="flex items-center mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setFiltroAtivo('umbanda')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'umbanda' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Umbanda
            </button>
            <button
              onClick={() => setFiltroAtivo('nacao')}
              className={`px-4 py-2 text-sm font-medium ${filtroAtivo === 'nacao' ? 'text-[#006B3F] border-b-2 border-[#006B3F]' : 'text-gray-500 hover:text-[#006B3F]'}`}
            >
              Nação
            </button>
          </div>
        </div>
        
        {/* Lista de Frentes */}
        <div className="grid grid-cols-3 gap-4">
          {frentesFiltradas.length > 0 ? (
            frentesFiltradas.map((frente) => {
              const imagemOrixa = getOrixaImage(frente.nome, frente.tipo);
              
              return (
                <Link
                  key={frente.id}
                  href={`/admin/frentes/${frente.id}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 shadow-[0_0px_7px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow duration-200">
                    <img 
                      src={imagemOrixa} 
                      alt={frente.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Previne loop de erro
                        target.src = '/images/fx.png'; // Imagem padrão
                      }}
                    />
                  </div>
                  <span className="text-xs text-center font-medium text-gray-700 group-hover:text-[#006B3F] transition-colors">
                    {frente.nome}
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="col-span-4 text-center py-8 text-gray-500">
              Nenhuma frente encontrada
            </div>
          )}
        </div>

        {/* Botão Flutuante Adicionar */}
        <div className="fixed bottom-8 right-6">
          <Button 
            onClick={() => router.push('/admin/frentes/nova')}
            className="rounded-full w-14 h-14 p-0 flex items-center justify-center bg-[#006B3F] hover:bg-[#005a33] shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>
    </div>
  );
}
