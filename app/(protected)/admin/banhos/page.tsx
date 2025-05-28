"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import dynamic from "next/dynamic"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormBanhos } from "./FormBanhos"
import { ervasMock, Erva } from "../ervas/page"

const AdminBanhosMobile = dynamic(() => import("./AdminBanhosMobile"), {
  loading: () => <p>Carregando...</p>,
})

const AdminBanhosDesktop = dynamic(() => import("./page.desktop"), {
  loading: () => <p>Carregando...</p>,
})

// Dados simulados
export type Banho = {
  id: number
  titulo: string
  subtitulo: string
  categoria: string
  ervas: number[]
}

const banhosMock: Banho[] = [
  { id: 1, titulo: "Banho de Descarrego", subtitulo: "Limpeza profunda", categoria: "limpeza", ervas: [1,2] },
  { id: 2, titulo: "Banho de Abertura de Caminhos", subtitulo: "Prosperidade e oportunidades", categoria: "prosperidade", ervas: [5,8] },
]

export default function AdminBanhosPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-white">
      {isMobile ? <AdminBanhosMobile /> : <AdminBanhosDesktop />}
    </div>
  );
}
