import { supabase, Consulta, ConsultaInsert, ConsultaUpdate } from './supabase';

export async function getConsultas(): Promise<Consulta[]> {
  const { data, error } = await supabase
    .from('consultas')
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .order('data_consulta', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar consultas: ${error.message}`);
  }

  return data || [];
}

export async function getConsultasByDate(date: string): Promise<Consulta[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('consultas')
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .gte('data_consulta', startOfDay.toISOString())
    .lte('data_consulta', endOfDay.toISOString())
    .order('data_consulta', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar consultas: ${error.message}`);
  }

  return data || [];
}

export async function getConsultasByWeek(startDate: string): Promise<Consulta[]> {
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('consultas')
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .gte('data_consulta', start.toISOString())
    .lte('data_consulta', end.toISOString())
    .order('data_consulta', { ascending: true });

  if (error) {
    throw new Error(`Erro ao buscar consultas: ${error.message}`);
  }

  return data || [];
}

export async function getConsultaById(id: string): Promise<Consulta | null> {
  const { data, error } = await supabase
    .from('consultas')
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email,
        data_nascimento
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Erro ao buscar consulta: ${error.message}`);
  }

  return data;
}

export async function createConsulta(consulta: Omit<ConsultaInsert, 'user_id'>): Promise<Consulta> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('consultas')
    .insert({
      ...consulta,
      user_id: user.id,
    })
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .single();

  if (error) {
    throw new Error(`Erro ao criar consulta: ${error.message}`);
  }

  return data;
}

export async function updateConsulta(id: string, updates: ConsultaUpdate): Promise<Consulta> {
  const { data, error } = await supabase
    .from('consultas')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .single();

  if (error) {
    throw new Error(`Erro ao atualizar consulta: ${error.message}`);
  }

  return data;
}

export async function deleteConsulta(id: string): Promise<void> {
  const { error } = await supabase
    .from('consultas')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Erro ao deletar consulta: ${error.message}`);
  }
}

export async function getConsultasProximas(limit: number = 5): Promise<Consulta[]> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('consultas')
    .select(`
      *,
      pacientes (
        id,
        nome,
        telefone,
        email
      )
    `)
    .gte('data_consulta', now)
    .eq('status', 'agendada')
    .order('data_consulta', { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Erro ao buscar próximas consultas: ${error.message}`);
  }

  return data || [];
}

export function formatarHorario(dataConsulta: string): string {
  return new Date(dataConsulta).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatarData(dataConsulta: string): string {
  return new Date(dataConsulta).toLocaleDateString('pt-BR');
}

export function formatarDataHora(dataConsulta: string): string {
  return new Date(dataConsulta).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'agendada':
      return 'bg-blue-100 text-blue-800';
    case 'realizada':
      return 'bg-green-100 text-green-800';
    case 'cancelada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function calcularDuracaoConsulta(dataInicio: string, duracao: number): string {
  const inicio = new Date(dataInicio);
  const fim = new Date(inicio.getTime() + duracao * 60000);
  
  return `${formatarHorario(dataInicio)} - ${formatarHorario(fim.toISOString())}`;
}