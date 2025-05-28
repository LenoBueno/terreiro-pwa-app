"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { FormErvas } from "./FormErvas"

const AdminErvasMobile = dynamic(() => import("./AdminErvasMobile"), {
  loading: () => <p>Carregando...</p>,
})

const AdminErvasDesktop = dynamic(() => import("./page.desktop"), {
  loading: () => <p>Carregando...</p>,
})

// Dados simulados
export type Erva = {
  id: number
  nome: string
  nomeCientifico: string
  descricao: string
  categoria: string
}

export const ervasMock: Erva[] = [
  {
    id: 1,
    nome: "Arruda",
    nomeCientifico: "Ruta graveolens",
    descricao: "Erva de proteção espiritual e limpeza energética.",
    categoria: "proteção",
  },
  {
    id: 2,
    nome: "Guiné",
    nomeCientifico: "Petiveria alliacea",
    descricao: "Utilizada para afastar energias negativas e proteção.",
    categoria: "proteção",
  },  
]


export default function AdminErvasPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-white">
      {isMobile ? <AdminErvasMobile /> : <AdminErvasDesktop />}
    </div>
  );
}
