'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import img_card from '@/assets/images/img_card.svg';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { Button } from '@/components/ui/button/Button';
import TradeCard from '@/components/ui/card/TradeCard';
import GradeLabel from '@/components/ui/label/GradeLabel';
import { useFetchPhotoCardDetail } from '@/libs/hooks/useFetchPhotoCardDetail';
import { GENRE_LABEL } from '@/libs/utils/genreLabel';
import { useExchange } from '@/providers/ExchangeProvider';
import { MODAL_TYPES, useModal } from '@/providers/ModalProvider';

import CardBuyer from './_components/CardBuyer';

export default function SellDetailPage() {
  const { id } = useParams();
  const { openModal } = useModal()
  const { setTargetSaleId } = useExchange()
  const { card, loading } = useFetchPhotoCardDetail(id);

  const handleOpenCardDetail = () => {
    // 현재 모달에 card를 saleId로 가정하겠습니다.
    // 프롭 드릴링을 피하기 위해 프로바이더를 이용하여 TradeOfferModal로 넣어줍니다.
    setTargetSaleId(id);
    openModal(MODAL_TYPES.SELL_PHOTO_CARD, {
      title: "포토카드 교환하기",
      subTitle: "마이갤러리",
      modal: "exchange",
    })
  }

  if (loading)
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

  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = card?.imageUrl
    ? card.imageUrl.startsWith('http')
      ? card.imageUrl
      : `${baseHost}/${card.imageUrl}`
    : img_card; // 기본 이미지는 폴백

  return (
    <main className=" text-white px-[.9375rem] sm:px-5 md:container md:mx-auto">
      <h1 className="hidden text-gray-300 font-br tracking-[-0.72px] text-sm md:text-2xl md:block md:mb-15 md:mt-[40px] lg:block lg:mt-[60px]">
        마켓플레이스
      </h1>
      <CardTitle
        titleMessage={card.userCard.photoCard.name}
        className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[32px] md:text-[40px]"
      />
      <section className="mt-6.5 sm:flex sm:gap-5 sm:mt-12 md:gap-20">
        <div className="relative max-w-[960px] mb-[1.2656rem] sm:flex-1">
          <Image src={fullImageUrl} alt="포토카드 이미지" width={960} height={720} />
        </div>
        <div className="sm:flex-1">
          <CardBuyer card={card} />
        </div>
      </section>

      <section className="mt-30">
        <div className="sm:flex sm:border-b sm:border-gray-100 sm:pb-5 md:border-b md:items-end">
          <CardTitle
            titleMessage="교환 희망 정보"
            className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[2rem] sm:border-0 md:mb-0 md:text-[2.5rem]"
          />
          <Button onClick={() => handleOpenCardDetail()} thickness="thin" className="hidden py-4.25 sm:block md:text-lg md:h-15">
            포토카드 교환하기
          </Button>
        </div>

        <p className="mt-11.5 text-lg font-bold md:text-2xl">
          푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.
        </p>
        <div className="flex gap-2.5 mt-5 mb-10 md:gap-3.75">
          <GradeLabel grade={card.grade} size />
          <div className="text-gray-400">|</div>
          <p className="text-gray-300 text-lg md:text-2xl">{GENRE_LABEL[card.genre]}</p>
        </div>

        <Button onClick={() => handleOpenCardDetail()} thickness="thin" className="w-full mb-10 sm:hidden">
          포토카드 교환하기
        </Button>
      </section>

      {/* // 내가 제시한 교환 목록 */}
      {card.trade && card.trade.length > 0 && (
        <section>
          <CardTitle
            titleMessage="내가 제시한 교환 목록"
            className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[2rem] md:text-[2.5rem]"
          />
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4  mb-11.5 sm:mb-12 md:mt-17.5' >
            {card.trade.map((tradeItem, idx) =>
              <div key={tradeItem.id || idx} >
                <TradeCard
                  tradeItem={tradeItem}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
