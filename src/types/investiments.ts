import { Asset, AssetTransaction, AssetCategory } from '@/generated/prisma/client';

export type InvestimentType = Omit<Asset, 'createdAt' | 'updatedAt'>;
export type InvestimentTransactionType = Omit<AssetTransaction, 'createdAt' | 'updatedAt'>;
export type InvestimentCategoryType = AssetCategory;
