import { tokenFetch } from '../utils/fetchClient';

export const tradeService = {
  requestSale: (saleData) => {
    return tokenFetch('/trades', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },

  applicantCancel: (tradeId) => {
    return tokenFetch(`/trades/${tradeId}/cancel`, {
      method: 'POST',
    });
  },
};
