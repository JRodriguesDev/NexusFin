import { Prisma } from '@/generated/prisma/client';

export const prismaErrors = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P1001':
        return 'Não foi possível conectar ao banco de dados. Tente novamente mais tarde.';
      case 'P1002':
        return 'O tempo limite de conexão foi excedido. Tente novamente mais tarde.';

      // Violação de Unicidade
      case 'P2002':
        return 'Já existe um registro com esses dados.';

      // Registro não encontrado (útil para Update/Delete de transação)
      case 'P2025':
        return 'A transação solicitada não foi encontrada.';

      // Falha em Chave Estrangeira (ex: userId inexistente)
      case 'P2003':
        return 'Falha de associação: o usuário associado não existe.';

      default:
        return 'Erro interno ao processar a operação no banco de dados.';
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'Dados inválidos fornecidos para o banco de dados.';
  }

  return null;
};
