import { tokenFetch } from '../utils/fetchClient';

export const saleService = {
  crateSale: (saleData) => {
    tokenFetch('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  },
};
