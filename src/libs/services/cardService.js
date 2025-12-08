import { formDataFetch } from '../utils/fetchClient';

export const cardService = {
  createCard: (formData) =>
    formDataFetch('/cards', {
      method: 'POST',
      body: formData,
    }),
};
