"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

import { CardTitle } from '@/components/common/card-title/CardTitle';
import MySellingPhotoCard from "@/components/ui/card/MySellingPhotoCard";
import PhotoCard from "@/components/ui/card/PhotoCard";
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';
import { sellService } from "@/libs/services/sellService";

import SellingFilter from './_components/SellingFilter';

export default function MySelling() {
  const [myLocalSellingCards, setMyLocalSellingCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySellingData = async () => {
      try {
        const response = await sellService.getMyCard();
        console.log(response)
        setMyLocalSellingCards(response.cards);
      } catch (error) {
        console.error("나의 판매된 상품을 가져오는데 실패했습니다.", error)
      } finally {
        setLoading(false);
      }
    }

    fetchMySellingData();
  }, [])

  if (loading) {
    return <div>판매 목록을 불러오는중입니다...</div>
  }

  return (
    <div className="sm:mb-[80px] md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle size="L" titleMessage="나의 판매 포토카드" className="w-full mx-auto" />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle size="M" titleMessage="나의 판매 포토카드" className="w-full mx-auto" />
        </div>
      </div>
      <CardGradeStatus />
      <SellingFilter />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"> {/* 적절한 레이아웃 설정 */}
        {myLocalSellingCards.map((card) => (
          <Link
            key={card.id} // 고유 key 사용
            href={`/gallery/${card.id}`}
          >
            <MySellingPhotoCard
              userCard={card} // 개별 card 객체 전달
            />
          </Link>
        ))}
      </div>
    </div >
  );
}
