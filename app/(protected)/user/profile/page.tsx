"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, Calendar, MapPin, Shield, Bell, Lock, LogOut, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// Dados simulados do usuário
const usuario = {
  nome: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 98765-4321",
  dataNascimento: "15/05/1985",
  endereco: "Rua das Flores, 123 - São Paulo, SP",
  avatar: "/placeholder.svg?height=200&width=200",
  iniciais: "JS",
  frente: "Caboclos",
  cargo: "Membro",
  dataIngresso: "10/01/2020",
  notificacoes: {
    email: true,
    push: true,
    eventos: true,
    mensagens: true,
  },
}

export default function ProfilePage() {
  const [tab, setTab] = useState<'perfil' | 'notificacoes' | 'seguranca'>('perfil');
  const router = useRouter();
  const [dadosPerfil, setDadosPerfil] = useState({
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone,
    dataNascimento: usuario.dataNascimento,
    endereco: usuario.endereco,
  })

  const [notificacoes, setNotificacoes] = useState(usuario.notificacoes)
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Atualizar dados do perfil
  const atualizarPerfil = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de atualização
    setTimeout(() => {
      setIsLoading(false)
      alert("Perfil atualizado com sucesso!")
    }, 1000)
  }

  // Atualizar notificações
  const atualizarNotificacoes = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de atualização
    setTimeout(() => {
      setIsLoading(false)
      alert("Preferências de notificação atualizadas com sucesso!")
    }, 1000)
  }

  // Atualizar senha
  const atualizarSenha = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validação simples
    if (novaSenha !== confirmarSenha) {
      setIsLoading(false)
      alert("As senhas não coincidem!")
      return
    }

    // Simulação de atualização
    setTimeout(() => {
      setIsLoading(false)
      setSenhaAtual("")
      setNovaSenha("")
      setConfirmarSenha("")
      alert("Senha atualizada com sucesso!")
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências.</p>
        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>Voltar</span>
          </Button>
          <Tabs defaultValue={tab} onValueChange={v => setTab(v as any)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="perfil">
                <User className="h-4 w-4 mr-2" />
                Dados pessoais
              </TabsTrigger>
              <TabsTrigger value="notificacoes">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="seguranca">
                <Lock className="h-4 w-4 mr-2" />
                Segurança
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações</CardTitle>
            <CardDescription>Seus dados no terreiro</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={usuario.avatar || "/placeholder.svg"} alt={usuario.nome} />
              <AvatarFallback className="text-4xl">{usuario.iniciais}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{usuario.nome}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-terreiro-green text-white">
                {usuario.cargo}
              </Badge>
              <Badge variant="outline">{usuario.frente}</Badge>
            </div>
            <Separator className="my-4" />
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-terreiro-green" />
                <span className="text-sm">{usuario.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-terreiro-green" />
                <span className="text-sm">{usuario.telefone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-terreiro-green" />
                <span className="text-sm">{usuario.dataNascimento}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-terreiro-green" />
                <span className="text-sm">{usuario.endereco}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-terreiro-green" />
                <span className="text-sm">Membro desde {usuario.dataIngresso}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>Gerencie suas configurações de conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="perfil">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="perfil">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="notificacoes">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="seguranca">
                  <Lock className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
              </TabsList>
              <TabsContent value="perfil" className="mt-4">
                <form onSubmit={atualizarPerfil}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input
                          id="nome"
                          value={dadosPerfil.nome}
                          onChange={(e) => setDadosPerfil({ ...dadosPerfil, nome: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={dadosPerfil.email}
                          onChange={(e) => setDadosPerfil({ ...dadosPerfil, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={dadosPerfil.telefone}
                          onChange={(e) => setDadosPerfil({ ...dadosPerfil, telefone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento">Data de nascimento</Label>
                        <Input
                          id="dataNascimento"
                          value={dadosPerfil.dataNascimento}
                          onChange={(e) => setDadosPerfil({ ...dadosPerfil, dataNascimento: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={dadosPerfil.endereco}
                        onChange={(e) => setDadosPerfil({ ...dadosPerfil, endereco: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-terreiro-green hover:bg-terreiro-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="notificacoes" className="mt-4">
                <form onSubmit={atualizarNotificacoes}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações por email</h3>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações por email sobre atividades importantes.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificacoes.email}
                          onChange={() => setNotificacoes({ ...notificacoes, email: !notificacoes.email })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terreiro-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terreiro-green"></div>
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações push</h3>
                        <p className="text-sm text-muted-foreground">Receba notificações push no seu dispositivo.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificacoes.push}
                          onChange={() => setNotificacoes({ ...notificacoes, push: !notificacoes.push })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terreiro-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terreiro-green"></div>
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Eventos</h3>
                        <p className="text-sm text-muted-foreground">Receba notificações sobre eventos e giras.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificacoes.eventos}
                          onChange={() => setNotificacoes({ ...notificacoes, eventos: !notificacoes.eventos })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terreiro-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terreiro-green"></div>
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mensagens</h3>
                        <p className="text-sm text-muted-foreground">Receba notificações sobre novas mensagens.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificacoes.mensagens}
                          onChange={() => setNotificacoes({ ...notificacoes, mensagens: !notificacoes.mensagens })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-terreiro-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-terreiro-green"></div>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-terreiro-green hover:bg-terreiro-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Salvando..." : "Salvar preferências"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="seguranca" className="mt-4">
                <form onSubmit={atualizarSenha}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senhaAtual">Senha atual</Label>
                      <Input
                        id="senhaAtual"
                        type="password"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="novaSenha">Nova senha</Label>
                      <Input
                        id="novaSenha"
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-terreiro-green hover:bg-terreiro-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Atualizando..." : "Atualizar senha"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
