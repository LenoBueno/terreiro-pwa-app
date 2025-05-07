import { type NextRequest, NextResponse } from "next/server"

// Usuários mockados para demonstração
const MOCK_USERS = [
  {
    id: "1",
    email: "root@admin.com",
    password: "148750",
    name: "Administrador",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@user.com",
    password: "148750",
    name: "Usuário",
    role: "user" as const,
  },
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar credenciais
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    // Remover senha antes de enviar para o cliente
    const { password: _, ...userWithoutPassword } = user

    // Determinar para onde redirecionar com base no papel do usuário
    const redirectUrl = user.role === "admin" ? "/admin/dashboard" : "/dashboard"

    return NextResponse.json(
      {
        success: true,
        user: userWithoutPassword,
        redirectUrl,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
