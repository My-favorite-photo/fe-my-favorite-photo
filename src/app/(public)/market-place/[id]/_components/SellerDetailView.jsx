'use client';

import Image from 'next/image';

import Img_Card from '@/assets/images/svg/marketplacelogo.png';
import { CardTitle } from '@/components/common/card-title/CardTitle';
import { CardExchange } from '@/components/ui/card/PhotoCardExchange';

import CardSeller from './CardSeller';

export function SellerDetailView({ card }) {
  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = card.userCard.photoCard.imageUrl
    ? card.userCard.photoCard.imageUrl.startsWith('http')
      ? card.userCard.photoCard.imageUrl
      : `${baseHost}/${card.userCard.photoCard.imageUrl}`
    : Img_Card; // 기본 이미지는 폴백


  return (
    <>
      <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
        <main className="max-w-[1080px] mx-auto px-6 py-8">
          <div className="mb-10">
            <div className="mb-6">마켓플레이스</div>
            <h1 className="text-3xl font-bold mb-6">{card.userCard.photoCard.name}</h1>
            <div className="h-[1px] bg-[#2a2a2a]" />
          </div>

          <section className="grid grid-cols-[1fr_320px] gap-10 mb-16">
            <div className="relative w-full h-full object-cover aspect-4/3 bg-black rounded-lg overflow-hidden">
              <Image
                src={fullImageUrl}
                alt="카드 이미지"
                fill
              />
            </div>

            <div>
              <div className="bg-[#161616] rounded-md h-fit mb-6">
                {/* // 오른쪽 */}
                <CardSeller
                  grade={card.userCard.photoCard.grade}
                  category={card.userCard.photoCard.genre}
                  title={card.title}
                  description={card.userCard.photoCard.description}
                  price={card.price}
                  remaining={card.remaining}
                  total={card.total}
                  // 교환 희망정보
                  wishGrade={card.grade}
                  wishCategory={card.genre}
                  wishDescription={card.description}
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <CardTitle
                titleMessage="교환 제시 목록"
                className="text-2xl font-bold mb-2.5 sm:mb-5 sm:text-[2rem] md:text-[2.5rem]"
              />
            </div>

            {card.trade && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {card.trade.map((tradeItem, idx) =>
                  <div key={tradeItem.id || idx}>
                    <CardExchange
                      tradeItem={tradeItem}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

