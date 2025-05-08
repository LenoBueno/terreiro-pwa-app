
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Dados de exemplo do perfil
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@terreiro.org',
    role: 'Administrador',
    phone: '(11) 98765-4321',
    bio: 'Administrador do terreiro desde 2020. Responsável pela gestão digital e comunicação.',
    avatar: '/placeholder.svg?height=100&width=100',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  })

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar as alterações
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil do Administrador</h1>
          <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Alterar Foto
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email} 
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Cargo</Label>
                      <Input 
                        id="role" 
                        value={profile.role} 
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone} 
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea 
                      id="bio" 
                      rows={4} 
                      value={profile.bio} 
                      disabled={!isEditing}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>
                    Salvar Alterações
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Atualizar Senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure como deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.notifications.email}
                    onChange={(e) => setProfile({...profile, notifications: {...profile.notifications, email: e.target.checked}})}
                    className="toggle"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-muted-foreground">Receba notificações push</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.notifications.push}
                    onChange={(e) => setProfile({...profile, notifications: {...profile.notifications, push: e.target.checked}})}
                    className="toggle"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-muted-foreground">Receba notificações por SMS</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={profile.notifications.sms}
                    onChange={(e) => setProfile({...profile, notifications: {...profile.notifications, sms: e.target.checked}})}
                    className="toggle"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
