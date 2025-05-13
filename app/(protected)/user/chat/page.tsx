"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Send, User, Users } from "lucide-react"

// Dados simulados de conversas
const conversasIniciais = [
  {
    id: 1,
    tipo: "individual",
    nome: "Maria da Mata",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "MM",
    ultimaMensagem: "Olá, tudo bem? Precisamos conversar sobre a próxima gira.",
    horario: "10:30",
    naoLidas: 2,
    mensagens: [
      {
        id: 1,
        remetente: "Maria da Mata",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "MM",
        conteudo: "Olá, tudo bem?",
        horario: "10:25",
        enviada: false,
      },
      {
        id: 2,
        remetente: "Maria da Mata",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "MM",
        conteudo: "Precisamos conversar sobre a próxima gira.",
        horario: "10:30",
        enviada: false,
      },
    ],
  },
  {
    id: 2,
    tipo: "individual",
    nome: "João da Paz",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "JP",
    ultimaMensagem: "As ervas para o ritual já foram separadas.",
    horario: "09:15",
    naoLidas: 0,
    mensagens: [
      {
        id: 1,
        remetente: "João da Paz",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "JP",
        conteudo: "Bom dia! Como estão os preparativos?",
        horario: "09:10",
        enviada: false,
      },
      {
        id: 2,
        remetente: "Você",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "VC",
        conteudo: "Bom dia! Estamos organizando tudo conforme o planejado.",
        horario: "09:12",
        enviada: true,
      },
      {
        id: 3,
        remetente: "João da Paz",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "JP",
        conteudo: "As ervas para o ritual já foram separadas.",
        horario: "09:15",
        enviada: false,
      },
    ],
  },
  {
    id: 3,
    tipo: "grupo",
    nome: "Frente de Caboclos",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "FC",
    ultimaMensagem: "Ana: Alguém pode trazer velas extras para a gira?",
    horario: "Ontem",
    naoLidas: 5,
    mensagens: [
      {
        id: 1,
        remetente: "Carlos",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "CS",
        conteudo: "Boa tarde a todos! Confirmando a gira para sexta-feira às 20h.",
        horario: "Ontem, 14:30",
        enviada: false,
      },
      {
        id: 2,
        remetente: "Maria",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "MM",
        conteudo: "Olá pessoal! Alguém já confirmou o espaço para sexta?",
        horario: "Ontem, 15:45",
        enviada: false,
      },
      {
        id: 3,
        remetente: "Ana",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "AC",
        conteudo: "Alguém pode trazer velas extras para a gira?",
        horario: "Ontem, 18:20",
        enviada: false,
      },
    ],
  },
  {
    id: 4,
    tipo: "grupo",
    nome: "Organização do Terreiro",
    avatar: "/placeholder.svg?height=40&width=40",
    iniciais: "OT",
    ultimaMensagem: "Roberto: A limpeza do salão principal será no sábado às 9h.",
    horario: "Segunda",
    naoLidas: 0,
    mensagens: [
      {
        id: 1,
        remetente: "Roberto",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "RS",
        conteudo: "A limpeza do salão principal será no sábado às 9h.",
        horario: "Segunda, 10:00",
        enviada: false,
      },
      {
        id: 2,
        remetente: "Você",
        avatar: "/placeholder.svg?height=40&width=40",
        iniciais: "VC",
        conteudo: "Estarei presente para ajudar.",
        horario: "Segunda, 10:15",
        enviada: true,
      },
    ],
  },
]

export default function ChatPage() {
  const [conversas, setConversas] = useState(conversasIniciais)
  const [conversaAtiva, setConversaAtiva] = useState<number | null>(null)
  const [mensagem, setMensagem] = useState("")
  const [filtro, setFiltro] = useState("todas")
  const mensagensRef = useRef<HTMLDivElement>(null)

  // Filtrar conversas
  const conversasFiltradas =
    filtro === "todas"
      ? conversas
      : filtro === "individuais"
        ? conversas.filter((conversa) => conversa.tipo === "individual")
        : conversas.filter((conversa) => conversa.tipo === "grupo")

  // Encontrar conversa ativa
  const conversaAtual = conversaAtiva !== null ? conversas.find((c) => c.id === conversaAtiva) : null

  // Enviar mensagem
  const enviarMensagem = () => {
    if (mensagem.trim() === "" || conversaAtiva === null) return

    const novaMensagem = {
      id: Date.now(),
      remetente: "Você",
      avatar: "/placeholder.svg?height=40&width=40",
      iniciais: "VC",
      conteudo: mensagem,
      horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      enviada: true,
    }

    setConversas(
      conversas.map((conversa) => {
        if (conversa.id === conversaAtiva) {
          return {
            ...conversa,
            mensagens: [...conversa.mensagens, novaMensagem],
            ultimaMensagem: `Você: ${mensagem}`,
            horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }
        }
        return conversa
      }),
    )

    setMensagem("")
  }

  // Marcar mensagens como lidas ao abrir conversa
  useEffect(() => {
    if (conversaAtiva !== null) {
      setConversas(
        conversas.map((conversa) => {
          if (conversa.id === conversaAtiva) {
            return {
              ...conversa,
              naoLidas: 0,
            }
          }
          return conversa
        }),
      )
    }
  }, [conversaAtiva])

  // Rolar para o final das mensagens quando a conversa muda ou novas mensagens são adicionadas
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight
    }
  }, [conversaAtual?.mensagens])

  return (
    <div className="container mx-auto p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
          <p className="text-muted-foreground">Comunique-se com outros membros do terreiro.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow h-[calc(100%-5rem)]">
          <Card className="md:col-span-1 flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle>Conversas</CardTitle>
              <Tabs defaultValue="todas" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="todas" onClick={() => setFiltro("todas")}>
                    Todas
                  </TabsTrigger>
                  <TabsTrigger value="individuais" onClick={() => setFiltro("individuais")}>
                    <User className="h-4 w-4 mr-1" />
                    Diretas
                  </TabsTrigger>
                  <TabsTrigger value="grupos" onClick={() => setFiltro("grupos")}>
                    <Users className="h-4 w-4 mr-1" />
                    Grupos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-2">
                {conversasFiltradas.map((conversa) => (
                  <div
                    key={conversa.id}
                    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                      conversaAtiva === conversa.id ? "bg-terreiro-green text-white" : "hover:bg-muted"
                    }`}
                    onClick={() => setConversaAtiva(conversa.id)}
                  >
                    <Avatar>
                      <AvatarImage src={conversa.avatar || "/placeholder.svg"} alt={conversa.nome} />
                      <AvatarFallback>{conversa.iniciais}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${conversaAtiva === conversa.id ? "text-white" : ""}`}>
                          {conversa.nome}
                        </p>
                        <span
                          className={`text-xs ${
                            conversaAtiva === conversa.id ? "text-white/80" : "text-muted-foreground"
                          }`}
                        >
                          {conversa.horario}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          conversaAtiva === conversa.id
                            ? "text-white/80"
                            : conversa.naoLidas > 0
                              ? "font-medium"
                              : "text-muted-foreground"
                        }`}
                      >
                        {conversa.ultimaMensagem}
                      </p>
                    </div>
                    {conversa.naoLidas > 0 && (
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                          conversaAtiva === conversa.id
                            ? "bg-white text-terreiro-green"
                            : "bg-terreiro-green text-white"
                        }`}
                      >
                        {conversa.naoLidas}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 flex flex-col h-full">
            {conversaAtual ? (
              <>
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversaAtual.avatar || "/placeholder.svg"} alt={conversaAtual.nome} />
                      <AvatarFallback>{conversaAtual.iniciais}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{conversaAtual.nome}</CardTitle>
                      <CardDescription>
                        {conversaAtual.tipo === "grupo" ? "Conversa em grupo" : "Conversa individual"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-auto p-4" ref={mensagensRef}>
                  <div className="space-y-4">
                    {conversaAtual.mensagens.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.enviada ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-2 max-w-[80%] ${msg.enviada ? "flex-row-reverse" : "flex-row"}`}>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.remetente} />
                            <AvatarFallback>{msg.iniciais}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${msg.enviada ? "bg-terreiro-green text-white" : "bg-muted"}`}
                          >
                            {conversaAtual.tipo === "grupo" && !msg.enviada && (
                              <p className="text-xs font-medium mb-1">{msg.remetente}</p>
                            )}
                            <p className="text-sm">{msg.conteudo}</p>
                            <p
                              className={`text-xs mt-1 text-right ${
                                msg.enviada ? "text-white/80" : "text-muted-foreground"
                              }`}
                            >
                              {msg.horario}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-3">
                  <div className="flex w-full gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          enviarMensagem()
                        }
                      }}
                    />
                    <Button className="bg-terreiro-green hover:bg-terreiro-green/90" onClick={enviarMensagem}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Enviar</span>
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground mt-2">Selecione uma conversa para começar a enviar mensagens.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
