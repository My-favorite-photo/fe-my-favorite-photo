import Image from 'next/image';
import img_card from '@/assets/images/img_card.svg';
import img_logo from '@/assets/images/logo.png';
import img_soldout from '@/assets/icons/Ic_soldout.svg';
import GradeLabel from '../label/GradeLabel';
import PhotoCardInfo from './PhotoCardInfo';

export default function PhotoCard({ card, type = 'remain', cardImage, soldoutIcon }) {
  return (
    <div
      className="relative flex flex-col items-center bg-gray-500 border border-gray-400 rounded-[2px]
        sm:w-[170px] sm:p-[10px]
        md:w-[342px] md:h-[517px] md:p-[20px]
        lg:w-[440px] lg:h-[600px] lg:p-[40px]
        "
    >
      <div className="relative">
        <Image src={img_card} alt="카드 이미지" width={cardImage.width} height={cardImage.height} />

        {card.status === 'SOLD_OUT' && (
          <>
            <div className="absolute inset-0 bg-gray-500/70 rounded-[2px]" />

            <Image
              src={img_soldout}
              alt="SOLD OUT 아이콘"
              width={soldoutIcon.width}
              height={soldoutIcon.height}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </>
        )}
      </div>

      <div className="w-full flex flex-col sm:gap-[5px] md:gap-[10px] lg:gap-[10px] sm:mt-[10px] md:mt-[25px] lg:mt-[25px]">
        <p className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:text-[14px] md:text-[22px] lg:text-[22px]">
          {card.title}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px] sm:text-[10px] md:text-[16px] lg:text-[16px]">
            <GradeLabel grade={card.grade} />
            <span className="border border-l-gray-400 text-4 font-normal sm:h-[14px] md:h-[23px] lg:h-[23px]" />
            <span className="text-4 font-normal text-gray-300">{card.genre}</span>
          </div>
          <span className="text-white text-4 font-normal text-right underline underline-offset-2 decoration-0 sm:text-[10px] md:text-[16px] lg:text-[16px]">
            {card.author}
          </span>
        </div>
      </div>

      <div className="w-full border border-b-gray-400 sm:my-[10px] md:my-[20px] lg:my-[20px]" />

      <div className="w-full flex flex-col justify-between items-center sm:gap-[5px] text-[10px] md:gap-[10px] text-[16px] lg:gap-[10px] text-[16px]">
        <PhotoCardInfo card={card} type={type} />
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
