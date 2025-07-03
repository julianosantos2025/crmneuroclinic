"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Video,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getConsultaById, updateConsulta, deleteConsulta, formatarDataHora, getStatusColor, calcularDuracaoConsulta } from "@/lib/consultas";
import { calcularIdade } from "@/lib/pacientes";
import { Consulta } from "@/lib/supabase";
import { toast } from "sonner";

export default function DetalhesConsultaPage() {
  const router = useRouter();
  const params = useParams();
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadConsulta(params.id as string);
    }
  }, [params.id]);

  const loadConsulta = async (id: string) => {
    try {
      setLoading(true);
      const data = await getConsultaById(id);
      setConsulta(data);
    } catch (error: any) {
      toast.error(error.message || "Erro ao carregar consulta");
      router.push("/dashboard/agenda");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!consulta) return;

    try {
      setUpdating(true);
      const updatedConsulta = await updateConsulta(consulta.id, { status: newStatus });
      setConsulta(updatedConsulta);
      toast.success("Status da consulta atualizado!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!consulta) return;

    try {
      await deleteConsulta(consulta.id);
      toast.success("Consulta excluída com sucesso!");
      router.push("/dashboard/agenda");
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir consulta");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!consulta) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Consulta não encontrada</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/agenda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Agenda
          </Link>
        </Button>
      </div>
    );
  }

  const paciente = (consulta as any).pacientes;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/agenda">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes da Consulta</h1>
            <p className="text-muted-foreground">
              {formatarDataHora(consulta.data_consulta)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {consulta.status === 'agendada' && (
            <>
              <Button
                variant="outline"
                onClick={() => handleUpdateStatus('realizada')}
                disabled={updating}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Marcar como Realizada
              </Button>
              <Button
                variant="outline"
                onClick={() => handleUpdateStatus('cancelada')}
                disabled={updating}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/agenda/${consulta.id}/editar`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              {consulta.tipo === 'teleconsulta' && (
                <DropdownMenuItem>
                  <Video className="mr-2 h-4 w-4" />
                  Iniciar Teleconsulta
                </DropdownMenuItem>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Consulta</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir esta consulta? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações da Consulta */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Informações da Consulta
                </span>
                <Badge className={getStatusColor(consulta.status)}>
                  {consulta.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Data e Hora</label>
                  <p className="text-lg">{formatarDataHora(consulta.data_consulta)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Duração</label>
                  <p className="text-lg">{consulta.duracao} minutos</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo</label>
                  <p className="text-lg capitalize">{consulta.tipo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Valor</label>
                  <p className="text-lg">
                    {consulta.valor ? `R$ ${consulta.valor.toFixed(2)}` : 'Não informado'}
                  </p>
                </div>
              </div>

              {consulta.observacoes && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Observações</label>
                    <p className="mt-1">{consulta.observacoes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Informações do Paciente */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{paciente?.nome}</h3>
                {paciente?.data_nascimento && (
                  <p className="text-sm text-gray-500">
                    {calcularIdade(paciente.data_nascimento)} anos
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                {paciente?.telefone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{paciente.telefone}</span>
                  </div>
                )}

                {paciente?.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{paciente.email}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/pacientes/${paciente?.id}`}>
                    Ver Perfil Completo
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/prontuarios/${paciente?.id}`}>
                    Ver Prontuário
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={consulta.pago ? "default" : "secondary"}>
                  {consulta.pago ? "Pago" : "Pendente"}
                </Badge>
              </div>
              {consulta.valor && (
                <div className="flex items-center justify-between mt-2">
                  <span>Valor:</span>
                  <span className="font-semibold">R$ {consulta.valor.toFixed(2)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}