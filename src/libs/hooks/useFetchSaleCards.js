'use client';

import { useEffect, useState } from 'react';

import { sellService } from '../services/sellService';

export function useFetchSaleCards(params = {}) {
  const { searchKeyword = '', filter = {} } = params;
  const { grade = '', genre = '' } = filter;

  const [myLocalSellingCards, setMyLocalSellingCards] = useState([]);
  const [saleCardsLoading, setSaleCardsLoading] = useState(true);

  useEffect(() => {
    async function fetchMySellingData() {
      try {
        const response = await sellService.getMyCard({
          keyword: searchKeyword,
          grade: grade,
          genre: genre,
        });
        console.log(response);
        setMyLocalSellingCards(response.cards);
      } catch (error) {
        console.error('나의 판매된 상품을 가져오는데 실패했습니다.', error);
        // setMyLocalSellingCards([]);
      } finally {
        setSaleCardsLoading(false);
      }
    }

    fetchMySellingData();
  }, [searchKeyword, grade, genre]);

  // 판매 중 카드
  const sellingCards = myLocalSellingCards.filter(
    (card) => card.status === 'ON_SALE' || card.status === 'TRADING',
  );

  // 카드 sold out 여부
  const isCardSoldOut = (card) => card.totalQuantity === 0;

  return {
    myLocalSellingCards,
    saleCardsLoading,
    sellingCards,
    isCardSoldOut,
  };
}
