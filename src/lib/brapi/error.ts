import Brapi from 'brapi';

export const brapiErrors = (error: unknown) => {
  if (error instanceof Brapi.APIError) {
    switch (error.status) {
      case 400:
        return 'Requisição inválida. Verifique os dados enviados.';
      case 401:
        return 'Token de acesso da Brapi é inválido ou expirou.';

      case 403:
        return 'Você não tem permissão para acessar este recurso.';

      case 404:
        return 'Ativo ou recurso não encontrado.';

      case 422:
        return 'Dados inválidos fornecidos para a consulta.';

      case 429:
        return 'Limite de requisições excedido. Tente novamente em instantes.';

      default:
        if (error.status && error.status >= 500) {
          return 'Erro interno nos servidores da Brapi. Tente mais tarde.';
        }
    }
  }

  if (error instanceof Brapi.APIConnectionError)
    return 'Falha na conexão com os servidores da Brapi. Verifique sua internet.';

  return null;
};
