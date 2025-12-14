'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useFetchMarketCardDetail } from '@/libs/hooks/useFetchMarketCardDetail';
import SellerDetailPage from './_components/SellerDetailPage';
import BuyerDetailPage from './_components/BuyerDetailPage';

export default function MarketPlaceDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { marketDetailCard, marketDetailLoading } = useFetchMarketCardDetail(id);

  if (marketDetailLoading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  if (!marketDetailCard)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        해당 카드를 찾을 수 없습니다.
      </p>
    );

  const creatorId = marketDetailCard.userCard.photoCard.creatorId;
  const isSeller = user?.id === creatorId;

  return isSeller ? (
    <SellerDetailPage card={marketDetailCard} />
  ) : (
    <BuyerDetailPage card={marketDetailCard} />
  );
}
