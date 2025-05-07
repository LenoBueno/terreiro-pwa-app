# PWA Terreiro

![PWA Terreiro Logo](/public/icons/icon-192x192.png)

## Sobre o Projeto

PWA Terreiro é uma aplicação web progressiva (PWA) desenvolvida para facilitar a gestão e comunicação em terreiros de religiões de matriz africana. A plataforma oferece funcionalidades para membros e administradores, permitindo o gerenciamento de eventos, frentes espirituais, mensagens, e muito mais.

## Características

### Para Membros
- Dashboard personalizado
- Calendário de eventos
- Acesso a materiais de leitura
- Mensagens e comunicados
- Catálogo de ervas e banhos
- Chat comunitário
- Perfil personalizado

### Para Administradores
- Painel administrativo completo
- Gerenciamento de usuários
- Administração de frentes espirituais
- Criação e edição de eventos
- Sistema de mensagens e comunicados
- Controle de limpeza e compras
- Gerenciamento de ervas e banhos
- Relatórios e estatísticas

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com renderização do lado do servidor
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **PWA**: Recursos de Progressive Web App
- **Lucide Icons**: Biblioteca de ícones

## Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/seu-usuario/pwa-terreiro.git

# Entre no diretório do projeto
cd pwa-terreiro

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
\`\`\`

## Estrutura do Projeto

\`\`\`
pwa-terreiro/
├── app/                    # Diretório principal da aplicação Next.js
│   ├── admin/              # Área administrativa
│   ├── dashboard/          # Dashboard do usuário
│   ├── frentes/            # Frentes espirituais
│   ├── eventos/            # Eventos
│   ├── leitura/            # Material de leitura
│   ├── mensagens/          # Sistema de mensagens
│   ├── limpeza/            # Gestão de limpeza
│   ├── compras/            # Gestão de compras
│   ├── ervas/              # Catálogo de ervas
│   ├── banhos/             # Catálogo de banhos
│   ├── chat/               # Sistema de chat
│   ├── profile/            # Perfil do usuário
│   ├── login/              # Página de login
│   ├── register/           # Página de registro
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── admin-sidebar.tsx   # Sidebar administrativa
│   ├── app-sidebar.tsx     # Sidebar da aplicação
│   ├── theme-provider.tsx  # Provedor de tema
│   └── ui/                 # Componentes de UI
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilitários e funções
├── public/                 # Arquivos estáticos
│   ├── icons/              # Ícones da PWA
│   └── manifest.json       # Manifesto da PWA
├── styles/                 # Estilos globais
├── tailwind.config.ts      # Configuração do Tailwind
└── next.config.mjs         # Configuração do Next.js
\`\`\`

## Funcionalidades a Implementar

- [ ] Autenticação de usuários
- [ ] Integração com backend
- [ ] Service Worker para funcionalidades offline
- [ ] Notificações push
- [ ] Upload de imagens
- [ ] Sistema de permissões baseado em papéis
- [ ] Exportação de relatórios
- [ ] Calendário interativo
- [ ] Sistema de busca avançada

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para questões, sugestões ou feedback, entre em contato através de [seu-email@exemplo.com](mailto:seu-email@exemplo.com).

---

Desenvolvido com ❤️ para a comunidade de terreiros.
