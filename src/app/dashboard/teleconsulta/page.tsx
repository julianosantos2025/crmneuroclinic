"use client";

import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Plus, Link as LinkIcon, Calendar, Settings } from "lucide-react";

export default function TeleconsultaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teleconsulta</h1>
          <p className="text-muted-foreground">
            Realize atendimentos online com segurança
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Nova Sala
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Salas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Consultas em andamento
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5" />
              Links de Acesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Geração de links seguros
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Teleconsultas agendadas
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
              <h3 className="font-semibold mb-2">Plataforma Integrada</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Salas virtuais seguras</li>
                <li>• Gravação com consentimento</li>
                <li>• Chat integrado</li>
                <li>• Compartilhamento de tela</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recursos Avançados</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sala de espera virtual</li>
                <li>• Notas em tempo real</li>
                <li>• Integração com prontuário</li>
                <li>• Lembretes automáticos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}