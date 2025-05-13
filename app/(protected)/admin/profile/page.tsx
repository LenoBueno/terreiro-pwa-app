
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Shield, LogOut, User, Bell, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [tab, setTab] = useState<'perfil' | 'notificacoes' | 'seguranca'>('perfil');
  const router = useRouter();
  
  // Dados simulados do admin
  const [dadosPerfil, setDadosPerfil] = useState({
    nome: 'João Silva',
    email: 'joao.silva@terreiro.org',
    telefone: '(11) 98765-4321',
    dataNascimento: '10/01/1980',
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    cargo: 'Administrador',
    dataIngresso: '01/01/2022',
    avatar: '/placeholder.svg?height=200&width=200',
    bio: 'Administrador do terreiro desde 2020. Responsável pela gestão digital e comunicação.'
  })
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: true,
    eventos: true,
    mensagens: true,
  })
  const [senhaAtual, setSenhaAtual] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Atualizar dados do perfil
  const atualizarPerfil = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Perfil atualizado com sucesso!")
    }, 1000)
  }

  // Atualizar notificações
  const atualizarNotificacoes = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Preferências de notificação atualizadas com sucesso!")
    }, 1000)
  }

  // Atualizar senha
  const atualizarSenha = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (novaSenha !== confirmarSenha) {
      setIsLoading(false)
      alert("As senhas não coincidem!")
      return
    }
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
        <h1 className="text-3xl font-bold">Perfil do Administrador</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências.</p>
        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" className="admin-button" onClick={() => router.back()}>
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
        {/* Card lateral com avatar e dados detalhados do admin */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações</CardTitle>
            <CardDescription>Seus dados administrativos</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-3">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src={dadosPerfil.avatar || "/placeholder.svg"} alt={dadosPerfil.nome} />
              <AvatarFallback className="text-lg">{(dadosPerfil.nome || '').split(' ').map(p => p[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-base font-semibold">{dadosPerfil.nome}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="bg-terreiro-green text-white text-xs px-2 py-0.5">
                {dadosPerfil.cargo}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="w-full space-y-2">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-terreiro-green" />
                <span className="text-sm">{dadosPerfil.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-terreiro-green" />
                <span className="text-sm">{dadosPerfil.telefone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-terreiro-green" />
                <span className="text-sm">{dadosPerfil.dataNascimento}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-terreiro-green" />
                <span className="text-sm">{dadosPerfil.endereco}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-terreiro-green" />
                <span className="text-sm">Admin desde {dadosPerfil.dataIngresso}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="w-full flex items-start gap-2">
              <span className="h-4 w-4 font-medium text-xs">Bio:</span>
              <span className="text-xs italic text-gray-700">{dadosPerfil.bio}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full h-8 text-xs">
              <LogOut className="mr-1 h-3 w-3" />
              Sair
            </Button>
          </CardFooter>
        </Card>

        {/* Card principal com abas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>Gerencie suas configurações de conta</CardDescription>
          </CardHeader>
          <CardContent>
            {tab === 'perfil' && (
              <form onSubmit={atualizarPerfil}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input
                          id="nome"
                          value={dadosPerfil.nome}
                          onChange={e => setDadosPerfil({ ...dadosPerfil, nome: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={dadosPerfil.email}
                          onChange={e => setDadosPerfil({ ...dadosPerfil, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={dadosPerfil.telefone}
                          onChange={e => setDadosPerfil({ ...dadosPerfil, telefone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento">Data de nascimento</Label>
                        <Input
                          id="dataNascimento"
                          value={dadosPerfil.dataNascimento}
                          onChange={e => setDadosPerfil({ ...dadosPerfil, dataNascimento: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={dadosPerfil.endereco}
                        onChange={e => setDadosPerfil({ ...dadosPerfil, endereco: e.target.value })}
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
            )}
            {tab === 'notificacoes' && (
              <form onSubmit={atualizarNotificacoes}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notificações por email</h3>
                        <p className="text-sm text-muted-foreground">Receba notificações por email sobre atividades importantes.</p>
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
            )}
            {tab === 'seguranca' && (
              <form onSubmit={atualizarSenha}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senhaAtual">Senha atual</Label>
                      <Input
                        id="senhaAtual"
                        type="password"
                        value={senhaAtual}
                        onChange={e => setSenhaAtual(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="novaSenha">Nova senha</Label>
                      <Input
                        id="novaSenha"
                        type="password"
                        value={novaSenha}
                        onChange={e => setNovaSenha(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        value={confirmarSenha}
                        onChange={e => setConfirmarSenha(e.target.value)}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
