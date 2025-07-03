"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  TestTube,
  TrendingUp,
  Clock,
  DollarSign,
  Plus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getPacientes } from "@/lib/pacientes";
import { getConsultasProximas } from "@/lib/consultas";
import { Paciente, Consulta } from "@/lib/supabase";
import { toast } from "sonner";

export default function DashboardPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [proximasConsultas, setProximasConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [pacientesData, consultasData] = await Promise.all([
        getPacientes(),
        getConsultasProximas(5)
      ]);
      
      setPacientes(pacientesData);
      setProximasConsultas(consultasData);
    } catch (error: any) {
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  const pacientesAtivos = pacientes.filter(p => p.status === 'ativo').length;
  const consultasHoje = proximasConsultas.filter(c => {
    const hoje = new Date().toDateString();
    const dataConsulta = new Date(c.data_consulta).toDateString();
    return hoje === dataConsulta;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao seu painel de controle neuropsicopedagógico
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pacientes/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Link>
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pacientesAtivos}</div>
            <p className="text-xs text-muted-foreground">
              {pacientes.length} total cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultasHoje}</div>
            <p className="text-xs text-muted-foreground">
              {proximasConsultas.length} próximas agendadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Testes Aplicados
            </CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Em desenvolvimento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              Em desenvolvimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Seções Principais */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Próximas Consultas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Próximas Consultas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {proximasConsultas.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Nenhuma consulta agendada</p>
                <Button asChild className="mt-2" size="sm">
                  <Link href="/dashboard/agenda/nova">
                    Agendar Consulta
                  </Link>
                </Button>
              </div>
            ) : (
              proximasConsultas.map((consulta) => {
                const paciente = (consulta as any).pacientes;
                const dataConsulta = new Date(consulta.data_consulta);
                const isToday = dataConsulta.toDateString() === new Date().toDateString();
                
                return (
                  <div key={consulta.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{paciente?.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {consulta.tipo} • {consulta.duracao}min
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {dataConsulta.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isToday ? 'Hoje' : dataConsulta.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/pacientes/novo">
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar Novo Paciente
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/agenda/nova">
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Consulta
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/testes">
                <TestTube className="mr-2 h-4 w-4" />
                Aplicar Teste
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/anamnese">
                <Users className="mr-2 h-4 w-4" />
                Criar Anamnese
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}