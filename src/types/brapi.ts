import type { Brapi } from 'brapi';

export type BrapiStockListResponse = Brapi.QuoteListResponse['stocks'];
export type BrapiQuoteTypes = Brapi.QuoteListParams['type'];
