'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useFetchMarketCardDetail } from '@/libs/hooks/useFetchMarketCardDetail';
import SellerDetailPage from './_components/SellerDetailPage';
import BuyerDetailPage from './_components/BuyerDetailPage';

export default function MarketPlaceDetailPage() {
import Image from 'next/image';
import { useParams } from 'next/navigation';

import img_card from '@/assets/images/img_card.svg';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { Button } from '@/components/ui/button/Button';
import GradeLabel from '@/components/ui/label/GradeLabel';
import { useFetchPhotoCardDetail } from '@/libs/hooks/useFetchPhotoCardDetail';
import { GENRE_LABEL } from '@/libs/utils/genreLabel';

import CardBuyer from './_components/CardBuyer';

export default function SellDetailPage() {
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
