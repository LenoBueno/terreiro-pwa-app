"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, User } from "lucide-react"

// Dados simulados de conversas
const conversasIniciais = [
  {
    id: 1,
    usuario: {
      id: 2,
      nome: "João da Paz",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciais: "JP",
    },
    mensagens: [
      {
        id: 1,
        texto: "Olá, gostaria de saber se haverá gira neste sábado.",
        data: "10/05/2025 14:30",
        remetente: "usuario",
      },
      {
        id: 2,
        texto: "Olá João! Sim, teremos gira de caboclos neste sábado às 19h.",
        data: "10/05/2025 14:35",
        remetente: "admin",
      },
      {
        id: 3,
        texto: "Ótimo! Estarei presente.",
        data: "10/05/2025 14:40",
        remetente: "usuario",
      },
    ],
    naolidas: 0,
    ultimaMensagem: "10/05/2025 14:40",
  },
  {
    id: 2,
    usuario: {
      id: 3,
      nome: "Ana Clara",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciais: "AC",
    },
    mensagens: [
      {
        id: 1,
        texto: "Preciso confirmar minha participação no mutirão de limpeza.",
        data: "09/05/2025 10:15",
        remetente: "usuario",
      },
      {
        id: 2,
        texto: "Olá Ana! Sua participação está confirmada. Obrigado!",
        data: "09/05/2025 10:20",
        remetente: "admin",
      },
    ],
    naolidas: 0,
    ultimaMensagem: "09/05/2025 10:20",
  },
  {
    id: 3,
    usuario: {
      id: 5,
      nome: "Fernanda Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciais: "FL",
    },
    mensagens: [
      {
        id: 1,
        texto: "Gostaria de agendar uma consulta com a Mãe de Santo.",
        data: "08/05/2025 16:45",
        remetente: "usuario",
      },
    ],
    naolidas: 1,
    ultimaMensagem: "08/05/2025 16:45",
  },
]

export default function AdminChatPage() {
  const [conversas, setConversas] = useState(conversasIniciais)
  const [conversaAtual, setConversaAtual] = useState<number | null>(null)
  const [novaMensagem, setNovaMensagem] = useState("")
  const [busca, setBusca] = useState("")

  // Filtrar conversas
  const conversasFiltradas = conversas.filter((conversa) =>
    conversa.usuario.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  // Obter conversa atual
  const getConversaAtual = () => {
    return conversas.find((conversa) => conversa.id === conversaAtual)
  }

  // Enviar mensagem
  const enviarMensagem = () => {
    if (!novaMensagem.trim() || conversaAtual === null) return

    const novaMensagemObj = {
      id: Math.max(...getConversaAtual()!.mensagens.map((m) => m.id)) + 1,
      texto: novaMensagem,
      data: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      remetente: "admin" as const,
    }

    setConversas(
      conversas.map((conversa) => {
        if (conversa.id === conversaAtual) {
          return {
            ...conversa,
            mensagens: [...conversa.mensagens, novaMensagemObj],
            ultimaMensagem: novaMensagemObj.data,
          }
        }
        return conversa
      }),
    )

    setNovaMensagem("")
  }

  // Marcar mensagens como lidas
  const marcarComoLidas = (conversaId: number) => {
    setConversas(
      conversas.map((conversa) => {
        if (conversa.id === conversaId) {
          return {
            ...conversa,
            naolidas: 0,
          }
        }
        return conversa
      }),
    )
  }

  // Selecionar conversa
  const selecionarConversa = (conversaId: number) => {
    setConversaAtual(conversaId)
    marcarComoLidas(conversaId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="admin-title tracking-tight">Chat</h2>
        <p className="text-muted-foreground text-xs">Gerencie as conversas com os membros do terreiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="admin-subtitle">Conversas</CardTitle>
            <div className="mt-2">
              <Input placeholder="Buscar usuário..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {conversasFiltradas.map((conversa) => (
                <div
                  key={conversa.id}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-muted transition-colors ${
                    conversaAtual === conversa.id ? "bg-muted" : ""
                  }`}
                  onClick={() => selecionarConversa(conversa.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversa.usuario.avatar || "/placeholder.svg"} alt={conversa.usuario.nome} />
                    <AvatarFallback>{conversa.usuario.iniciais}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversa.usuario.nome}</p>
                      <p className="text-xs text-muted-foreground">{conversa.ultimaMensagem.split(" ")[0]}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversa.mensagens[conversa.mensagens.length - 1].texto}
                    </p>
                  </div>
                  {conversa.naolidas > 0 && (
                    <div className="h-5 w-5 rounded-full bg-terreiro-green text-white flex items-center justify-center text-xs">
                      {conversa.naolidas}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="admin-subtitle">
              {conversaAtual !== null ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={getConversaAtual()?.usuario.avatar || "/placeholder.svg"}
                      alt={getConversaAtual()?.usuario.nome}
                    />
                    <AvatarFallback>{getConversaAtual()?.usuario.iniciais}</AvatarFallback>
                  </Avatar>
                  <span>{getConversaAtual()?.usuario.nome}</span>
                </div>
              ) : (
                "Selecione uma conversa"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {conversaAtual !== null ? (
              <>
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {getConversaAtual()?.mensagens.map((mensagem) => (
                    <div
                      key={mensagem.id}
                      className={`flex ${mensagem.remetente === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          mensagem.remetente === "admin" ? "bg-terreiro-green text-white" : "bg-muted"
                        }`}
                      >
                        <p>{mensagem.texto}</p>
                        <p className="text-xs mt-1 opacity-70">{mensagem.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={novaMensagem}
                      onChange={(e) => setNovaMensagem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          enviarMensagem()
                        }
                      }}
                    />
                    <Button className="admin-button bg-terreiro-green hover:bg-terreiro-green/90" onClick={enviarMensagem}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                <User className="h-12 w-12 mb-2" />
                <p>Selecione uma conversa para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
