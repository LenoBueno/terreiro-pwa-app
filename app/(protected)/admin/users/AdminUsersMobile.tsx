export default function AdminUsersMobile() {
  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] flex flex-col px-2 pt-2 pb-[132px]">
      <h1 className="text-base font-medium mb-1">Usuários</h1>
      <div className="space-y-2">
        <div className="bg-white rounded shadow-sm p-2 mb-1">
          <div className="font-medium text-sm">Maria da Mata</div>
          <div className="text-xs text-muted-foreground">Oxum</div>
          <div className="text-xs">(11) 99999-1111</div>
        </div>
        <div className="bg-white rounded shadow-sm p-2 mb-1">
          <div className="font-medium text-sm">João da Paz</div>
          <div className="text-xs text-muted-foreground">Ogum</div>
          <div className="text-xs">(21) 98888-2222</div>
        </div>
      </div>
      <button className="fixed bottom-32 right-3 bg-terreiro-green text-white rounded-full shadow px-4 py-2 font-bold text-sm z-20">Novo Usuário</button>
    </div>
  )
}
