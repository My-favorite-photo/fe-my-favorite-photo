'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CardTitle } from '@/components/common/card-title/CardTitle';
import { Button } from '@/components/ui/button/Button';
import PhotoCardList from '@/components/ui/card/PhotoCardList';
import CardGradeStatus from '@/components/ui/label/CardGradeStatus';
import { tokenFetch } from '@/libs/utils/fetchClient';

import GalleryFilter from './_components/GalleryFilter';

export default function MyGalleryPage() {
  const [myCards, setMyCards] = useState(null);

  function normalizeMyCard(card) {
    return {
      id: card.photoCardId, // 마켓은 photoCardId를 card.id로 씀
      name: card.name,
      grade: card.grade,
      genre: card.genre,
      imageUrl: card.imageUrl,
      price: card.price,
      totalQuantity: card.totalQuantity,
      status: card.status,
      createdAt: card.createdAt,

      userCards: [
        {
          status: card.status,
          totalQuantity: card.totalQuantity,
        },
      ],
    };
  }

  useEffect(() => {
    async function loadMyCards() {
      try {
        const res = await tokenFetch('/cards/my');

        const normalized = res.cards.map(normalizeMyCard);

        setMyCards(normalized);
      } catch (error) {
        console.error('불러오기 실패 :', error);
      }
    }
    loadMyCards();
  }, []);

  if (!myCards) {
    return <p className="text-white text-center">카드 불러오는중</p>;
  }

  return (
    <div className="sm:mb-20 md:mb-[110px] lg:mb-[140px]">
      <div className="hidden md:w-full md:block md:mt-[60px] lg-w-full lg:block lg:mt-[60px]">
        {/* lg일 때 */}
        <div className="font-normal font-br hidden lg:block lg:text-[62px]">
          <CardTitle
            size="L"
            titleMessage="마이갤러리"
            buttonSize="L"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
            LinkUrl="/gallery/create"
          />
        </div>

        {/* md일 때 */}
        <div className="font-normal font-br hidden md:block md:text-[48px] lg:hidden">
          <CardTitle
            size="M"
            titleMessage="마이갤러리"
            buttonSize="S"
            buttonMessage="포토카드 생성하기"
            className="w-full mx-auto"
            LinkUrl="/gallery/create"
          />
        </div>
      </div>
      <CardGradeStatus cards={myCards} />
      <GalleryFilter />
      <PhotoCardList cards={myCards} type="count" isGalleryPage={true} />
      <Link
        href="/gallery/create"
        className="flex justify-center fixed bottom-[15px] left-0 w-full"
      >
        <Button size="S" className="w-[345px] h-[55px] md:hidden lg:hidden">
          포토카드 생성하기
        </Button>
      </Link>
    </div>
  );
}
