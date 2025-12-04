import Image from 'next/image';
import ExchangeImg from '@/assets/images/Img_exchange.png';
import BeachImg from '@/assets/images/svg/img_beach.png';
import { Button } from '../button/Button';
import GradeLabel from '../label/GradeLabel';

function ResponsiveText({ mobile, desktop }) {
  return (
    <>
      <span className="sm:hidden text-[0.525rem] font-bold">{mobile}</span>
      <span className="hidden sm:inline sm:text-[0.875rem] sm:font-medium md:text-[1rem]">
        {desktop}
      </span>
    </>
  );
}

export function CardExchange({
  grade = 'COMMON',
  category = '풍경',
  price = 4,
  nickname = '프로여행러',
  title = '스페인 여행',
  description = '스페인 여행 사진도 좋은데 우리집 앞마당 포토카드와 교환하고 싶습니다!',
  onApprove = () => {},
  onReject = () => {},
}) {
  const cardImage = grade === 'SUPER_RARE' ? BeachImg : ExchangeImg;
  const displayDescription =
    grade === 'SUPER_RARE' ? '여름 바다 풍경 사진과 교환하실래요?' : description;

  return (
    <div
      className="flex flex-col max-w-42.5 max-h-77 p-2.5
                 border border-[rgba(255,255,255,0.10)] rounded-[2px]
                 sm:max-w-85.5 sm:max-h-140.25 sm:p-5
                 md:max-w-110 md:max-h-156.5 md:p-10"
    >
      <div
        className="relative max-w-37.5 max-h-28 aspect-video
                   sm:max-w-75.5 sm:max-h-[14.1563rem]
                   md:max-w-90 md:max-h-67.5"
      >
        <Image src={cardImage} alt="교환될 사진" fill />
      </div>

      <div className="border-b border-gray-600 mt-2.5 sm:mt-4 pb-1">
        <h1 className="text-white text-[0.875rem] font-bold sm:text-[1.25rem]">{title}</h1>

        <div className="flex items-center gap-[6px] mt-2 sm:mt-3 whitespace-nowrap overflow-hidden">
          <div className="origin-left scale-[0.7] flex-shrink-0">
            <GradeLabel grade={grade} size="xs" />
          </div>

          <span className="text-gray-400 text-[0.5rem]">|</span>

          <span className="text-gray-300 text-[0.55rem] sm:text-[0.7rem]">{category}</span>

          <span className="text-gray-400 text-[0.5rem]">|</span>

          <span className="text-white text-[0.55rem] sm:text-[0.7rem]">
            {price}P<span className="text-gray-300 text-[0.55rem] sm:text-[0.7rem]">에 구매</span>
          </span>

          <span className="text-gray-400 text-[0.5rem]">|</span>

          <span className="text-white underline text-[0.55rem] sm:text-[0.7rem]">{nickname}</span>
        </div>
      </div>

      <div className="mt-3 mb-5 sm:mt-5 sm:mb-6 md:mb-10">
        <p
          className="text-white text-[0.55rem] tracking-tight sm:text-[0.9rem]
                     line-clamp-2"
          style={{ minHeight: '43px' }}
        >
          {displayDescription}
        </p>
      </div>

      <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-5">
        <Button
          intent="secondary"
          thickness="thin"
          className="py-4.25 h-10 hover:bg-gray-500 sm:h-13.75 md:h-15"
          onClick={onReject}
        >
          <ResponsiveText mobile="거절" desktop="거절하기" />
        </Button>

        <Button
          thickness="thin"
          className="py-4.25 h-10 hover:bg-main/90 sm:h-13.75 md:h-15"
          onClick={onApprove}
        >
          <ResponsiveText mobile="승인" desktop="승인하기" />
        </Button>
      </div>
    </div>
  );
}
