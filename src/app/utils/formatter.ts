export const formatCpf = (cpf: string): string => {
  // Remove caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, '');

  // Aplica a formatação do CPF: 999.999.999-99
  if (cpf.length === 11) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  return cpf;
}