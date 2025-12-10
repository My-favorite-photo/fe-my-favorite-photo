'use client';

import { useState, useEffect } from 'react';
import { cardService } from '@/libs/services/cardService';

export function useFetchCards({ searchKeyword = '', filter = {} }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const response = await cardService.getCard({
          keyword: searchKeyword,
          grade: filter.grade?.[0]?.value,
          genre: filter.genre?.[0]?.value,
          sort:
            filter.price === '낮은 가격순'
              ? 'low'
              : filter.price === '높은 가격순'
                ? 'high'
                : filter.price === '최신순'
                  ? 'latest'
                  : 'latest', // 기본 최신순
        });
        console.log(response);

        setCards(response.cards || []);
      } catch (error) {
        console.error('카드 불러오기 실패:', error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, [searchKeyword, filter]);

  // 판매 중 카드
  const sellingCards = cards.filter((card) =>
    (card.userCards || []).some((c) => c.status === 'ON_SALE'),
  );

  // 카드 sold out 여부
  const isCardSoldOut = (card) => card.totalQuantity === 0;

  return { cards, loading, sellingCards, isCardSoldOut };
}
