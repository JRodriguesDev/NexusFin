import { graphicsDataAction } from '../actions';
import { CashFlowGraphic } from './cashFlowGraphic';
import { AssetAllocationsGraphic } from './AssetAllocationGraphic';
import { CardErrorState } from './cardError';

export const Graphics = async () => {
  const data = await graphicsDataAction();

  if (!data.success || !data.data) return <CardErrorState message={data.message} />;

  const { cashFlow, ...investimentData } = data.data;
  const cashFlowData = cashFlow;
  const AssetAllocationGraphicData = investimentData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Gráfico 1: Fluxo de Caixa */}
      <CashFlowGraphic cashFlowData={cashFlowData} />

      {/* Gráfico 2: Alocação de Ativos */}
      <AssetAllocationsGraphic graphicsData={AssetAllocationGraphicData} />
    </div>
  );
};
