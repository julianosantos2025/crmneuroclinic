"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, CreditCard } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Perfil Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Informações pessoais e profissionais
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Preferências de notificações
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Senha e autenticação
            </p>
            <Button variant="outline" disabled className="w-full">
              Em Desenvolvimento
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Plano e Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Gerenciar assinatura
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
              <h3 className="font-semibold mb-2">Gestão de Conta</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Edição de perfil</li>
                <li>• Configurações de privacidade</li>
                <li>• Backup de dados</li>
                <li>• Exportação de relatórios</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Planos SaaS</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Básico (1 profissional)</li>
                <li>• Intermediário (até 3 usuários)</li>
                <li>• Ouro (equipe completa)</li>
                <li>• Recursos por plano</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}