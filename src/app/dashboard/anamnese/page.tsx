"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Users, Brain, FileText } from "lucide-react";

export default function AnamnesesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Anamnese</h1>
          <p className="text-muted-foreground">
            Gerador inteligente de anamneses por faixa etária
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Nova Anamnese
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Infantil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Anamnese para crianças (0-12 anos)
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Adolescente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Anamnese para adolescentes (13-17 anos)
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
              Adulto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Anamnese para adultos (18+ anos)
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
              <h3 className="font-semibold mb-2">Gerador Manual</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Templates por faixa etária</li>
                <li>• Campos customizáveis</li>
                <li>• Histórico familiar</li>
                <li>• Desenvolvimento neuromotor</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">IA Integrada</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Geração automática por perfil</li>
                <li>• Perguntas adaptativas</li>
                <li>• Sugestões baseadas em sintomas</li>
                <li>• Assinatura digital</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}