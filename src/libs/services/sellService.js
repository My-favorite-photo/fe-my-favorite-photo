import { tokenFetch } from '../utils/fetchClient';

export const sellService = {
  getMyCard: () => tokenFetch('/sells'),
};
