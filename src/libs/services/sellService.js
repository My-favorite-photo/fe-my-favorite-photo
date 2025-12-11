import { tokenFetch } from '../utils/fetchClient';

export const sellService = {
  // getMyCard: () => tokenFetch('/sells'),
  getMyCard: ({ keyword, grade, genre }) => {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (grade) params.append('grade', grade);
    if (genre) params.append('genre', genre);

    return tokenFetch(`/sells?${params.toString()}`);
  },
};
