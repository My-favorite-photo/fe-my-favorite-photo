import Image from 'next/image';

import img_soldOut from '@/assets/icons/Ic_soldout.svg';
import img_card from '@/assets/images/img_card.svg';
import img_logo from '@/assets/images/logo.png';

import GradeLabel from '../label/GradeLabel';
import SaleStatusLabel from '../label/SaleStatusLabel';
import PhotoCardInfo from './PhotoCardInfo';

/**
 * * @param {object} userCard - 백엔드에서 받은 판매 정보 (userCard 스키마)
 */
export default function MySellingPhotoCard({ userCard }) {
  const cardDetails = userCard.photoCard;

  const isSoldOut = userCard.totalQuantity === 0 || userCard.status === 'SOLD_OUT';
  const displayStatus = userCard.status;
  {
    !isSoldOut && displayStatus && (
      <div className="absolute top-[10px] left-[10px]">
        <SaleStatusLabel status={displayStatus} />
      </div>
    )
  }
  const baseHost = process.env.NEXT_PUBLIC_IMAGE_HOST || 'http://127.0.0.1:3005';
  const fullImageUrl = cardDetails?.imageUrl
    ? cardDetails.imageUrl.startsWith('http')
      ? cardDetails.imageUrl
      : `${baseHost}/${cardDetails.imageUrl}`
    : img_card;

  return (
    <div
      className="relative flex flex-col items-center bg-gray-500 border border-gray-400 rounded-[2px]
        sm:w-[170px] sm:p-[10px]
        md:w-[342px] md:h-[517px] md:p-[20px]
        lg:w-[440px] lg:h-[600px] lg:p-[40px]
        "
    >
      <div className="relative">
        <Image
          src={fullImageUrl}
          alt={cardDetails?.title || "카드 이미지"}
          width={360}
          height={500}
        />

        {/* SOLD_OUT 처리 */}
        {isSoldOut && (
          <>
            <div className="absolute inset-0 bg-gray-500/70 rounded-[2px]" />

            <Image
              src={img_soldOut}
              alt="SOLD OUT 아이콘"
              width={100}
              height={100} // 임시 크기
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </>
        )}

        {/* 판매 상태 라벨 (ON_SALE, SOLD_OUT 등) */}
        <div className="absolute top-[10px] left-[10px]">
          <SaleStatusLabel status={displayStatus} />
        </div>
      </div>

      <div className="w-full flex flex-col sm:gap-[5px] md:gap-[10px] lg:gap-[10px] sm:mt-[10px] md:mt-[25px] lg:mt-[25px]">
        <p className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:text-[14px] md:text-[22px] lg:text-[22px]">
          {cardDetails?.name}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px] sm:text-[10px] md:text-[16px] lg:text-[16px]">
            <GradeLabel grade={cardDetails?.grade} />
            <span className="border border-l-gray-400 text-4 font-normal sm:h-[14px] md:h-[23px] lg:h-[23px]" />
            <span className="text-4 font-normal text-gray-300">{cardDetails?.genre}</span>
          </div>
          <span className="text-white text-4 font-normal text-right underline underline-offset-2 decoration-0 sm:text-[10px] md:text-[16px] lg:text-[16px]">
            {cardDetails?.author}
          </span>
        </div>
      </div>

      <div className="w-full border border-b-gray-400 sm:my-[10px] md:my-[20px] lg:my-[20px]" />

      <div className="w-full flex flex-col justify-between items-center sm:gap-[5px] text-[10px] md:gap-[10px] text-[16px] lg:gap-[10px] text-[16px]">
        <PhotoCardInfo
          card={{ price: userCard.price }}
          type='price'
        />
        <div className="w-full flex justify-between items-center text-gray-300">
          <span className="font-medium">판매 수량:</span>
          <span className="font-bold text-white">{userCard.totalQuantity}개</span>
        </div>
      </div>

      <Image
        src={img_logo}
        alt="로고"
        width={99}
        height={18}
        className="absolute bottom-10 sm:hidden md:block lg:block"
      />
    </div>
  );
}