"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getConsultasByDate, getConsultasByWeek, formatarHorario, getStatusColor } from "@/lib/consultas";
import { Consulta } from "@/lib/supabase";
import { toast } from "sonner";

type ViewMode = 'day' | 'week' | 'month';

export default function AgendaPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  useEffect(() => {
    loadConsultas();
  }, [currentDate, viewMode]);

  const loadConsultas = async () => {
    try {
      setLoading(true);
      let data: Consulta[] = [];

      if (viewMode === 'day') {
        data = await getConsultasByDate(currentDate.toISOString().split('T')[0]);
      } else if (viewMode === 'week') {
        const startOfWeek = getStartOfWeek(currentDate);
        data = await getConsultasByWeek(startOfWeek.toISOString().split('T')[0]);
      }

      setConsultas(data);
    } catch (error: any) {
      toast.error(error.message || "Erro ao carregar consultas");
    } finally {
      setLoading(false);
    }
  };

  const getStartOfWeek = (date: Date): Date => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    return new Date(start.setDate(diff));
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const getDateRangeText = (): string => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else if (viewMode === 'week') {
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('pt-BR')} - ${endOfWeek.toLocaleDateString('pt-BR')}`;
    } else {
      return currentDate.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long'
      });
    }
  };

  const getConsultasForDay = (date: Date): Consulta[] => {
    const dateStr = date.toISOString().split('T')[0];
    return consultas.filter(consulta => 
      consulta.data_consulta.split('T')[0] === dateStr
    );
  };

  const renderDayView = () => {
    const dayConsultas = getConsultasForDay(currentDate);
    
    return (
      <div className="space-y-4">
        {dayConsultas.length === 0 ? (
          <div className="text-center py-8">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhuma consulta agendada para este dia</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/agenda/nova">
                <Plus className="mr-2 h-4 w-4" />
                Agendar Consulta
              </Link>
            </Button>
          </div>
        ) : (
          dayConsultas.map((consulta) => (
            <Card key={consulta.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {formatarHorario(consulta.data_consulta)}
                        </span>
                        <Badge className={getStatusColor(consulta.status)}>
                          {consulta.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{(consulta as any).pacientes?.nome}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {consulta.tipo} • {consulta.duracao} min
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/agenda/${consulta.id}`}>
                        Ver Detalhes
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return day;
    });

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayConsultas = getConsultasForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <Card key={index} className={`min-h-[200px] ${isToday ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  <br />
                  <span className="text-lg">{day.getDate()}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-1">
                {dayConsultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="text-xs p-2 rounded bg-primary/10 hover:bg-primary/20 cursor-pointer"
                    onClick={() => window.location.href = `/dashboard/agenda/${consulta.id}`}
                  >
                    <div className="font-medium">
                      {formatarHorario(consulta.data_consulta)}
                    </div>
                    <div className="truncate">
                      {(consulta as any).pacientes?.nome}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos e consultas
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agenda/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </Link>
        </Button>
      </div>

      {/* Controles de Navegação */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-lg font-semibold min-w-[300px] text-center">
                {getDateRangeText()}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Dia</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
              >
                Hoje
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'day' && renderDayView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'month' && (
            <div className="text-center py-8">
              <p className="text-gray-500">Visualização mensal em desenvolvimento</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}