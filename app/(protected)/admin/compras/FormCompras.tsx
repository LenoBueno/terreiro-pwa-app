import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import React from "react";

interface FormComprasProps {
  values: {
    item: string;
    quantidade: number;
    unidade: string;
    preco: number;
    categoria: string;
    responsavel: string;
  };
  onChange: (values: Partial<FormComprasProps["values"]>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function FormCompras({ values, onChange, onSubmit, onCancel, submitLabel = "Adicionar" }: FormComprasProps) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <DialogHeader>
        <DialogTitle>Adicionar Nova Compra</DialogTitle>
        <DialogDescription>Preencha os dados da nova compra.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="item">Item</Label>
          <Input id="item" value={values.item} onChange={e => onChange({ item: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input id="quantidade" type="number" min="1" value={values.quantidade} onChange={e => onChange({ quantidade: Number(e.target.value) })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unidade">Unidade</Label>
            <Select value={values.unidade} onValueChange={value => onChange({ unidade: value })}>
              <SelectTrigger id="unidade">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade">Unidade</SelectItem>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="litro">Litro</SelectItem>
                <SelectItem value="pacote">Pacote</SelectItem>
                <SelectItem value="kit">Kit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preco">Preço Unitário (R$)</Label>
          <Input id="preco" type="number" min="0.01" step="0.01" value={values.preco} onChange={e => onChange({ preco: Number(e.target.value) })} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={values.categoria} onValueChange={value => onChange({ categoria: value })}>
            <SelectTrigger id="categoria">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ritual">Ritual</SelectItem>
              <SelectItem value="ervas">Ervas</SelectItem>
              <SelectItem value="limpeza">Limpeza</SelectItem>
              <SelectItem value="alimentacao">Alimentação</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsavel">Responsável</Label>
          <Input id="responsavel" value={values.responsavel} onChange={e => onChange({ responsavel: e.target.value })} required />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button className="bg-terreiro-green hover:bg-terreiro-green/90" type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
}
