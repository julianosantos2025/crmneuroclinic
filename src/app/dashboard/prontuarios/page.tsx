"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Upload, Download, Search } from "lucide-react";

export default function ProntuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prontuários</h1>
          <p className="text-muted-foreground">
            Gerencie prontuários e documentos dos pacientes
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Novo Prontuário
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Prontuários Digitais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Evolução clínica e registros de sessões
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Anexos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload de exames e documentos
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Relatórios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Geração de relatórios e laudos
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
              <h3 className="font-semibold mb-2">Prontuário Inteligente</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• IA para auxiliar na escrita</li>
                <li>• Templates personalizáveis</li>
                <li>• Histórico de evolução</li>
                <li>• Busca avançada</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Documentos</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload de arquivos</li>
                <li>• Assinatura digital</li>
                <li>• Controle de versões</li>
                <li>• Backup automático</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}