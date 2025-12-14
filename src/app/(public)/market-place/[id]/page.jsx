"use client"
import { useParams } from "next/navigation"

import { useFetchPhotoCardDetail } from "@/libs/hooks/useFetchPhotoCardDetail"
import { useUser } from "@/libs/hooks/useUser";

import { BuyerDetailView } from "./_components/BuyerDetailView";
import { SellerDetailView } from "./_components/SellerDetailView";

export default function MarketPlaceDetailPage() {
  const { id } = useParams();

  const { card, loading: cardLoading } = useFetchPhotoCardDetail(id);
  const { currentUserId, loading: userLoading } = useUser();

  if (cardLoading || userLoading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  if (!card)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        해당 카드를 찾을 수 없습니다.
      </p>
    );

  const isOwner = card.sellerId === currentUserId;

  const viewProps = {
    card,
    // 데이터 갱신 기능도 있었으면 good
  }

  if (!isOwner) {
    return <BuyerDetailView {...viewProps} />
  }

  return <SellerDetailView {...viewProps} />
}