"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TestTube, Plus, Brain, FileText, BarChart3 } from "lucide-react";

export default function TestesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testes Neuropsicopedagógicos</h1>
          <p className="text-muted-foreground">
            Gerencie e aplique testes baseados no DSM-5
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Novo Teste
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Testes Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Biblioteca de testes neuropsicopedagógicos
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Testes Aplicados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Histórico de testes realizados
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Relatórios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Análises e relatórios dos resultados
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades Planejadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Testes Manuais</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Criação de testes personalizados</li>
                <li>• Múltipla escolha e resposta livre</li>
                <li>• Escalas Likert</li>
                <li>• Correção automatizada</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">IA Integrada</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Geração automática baseada no DSM-5</li>
                <li>• Adaptação por faixa etária</li>
                <li>• Sugestões por diagnóstico</li>
                <li>• Análise inteligente de resultados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}