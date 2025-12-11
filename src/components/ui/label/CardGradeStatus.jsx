'use client';

import GradeBox from '@/components/ui/label/GradeBox';
import { useFetchSaleCards } from '@/libs/hooks/useFetchSaleCards';

export default function CardGradeStatus() {
  const { myLocalSellingCards } = useFetchSaleCards();

  const gradeCount = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  };

  // 등급별 남은 카드 수 합산
  myLocalSellingCards.forEach((card) => {
    if (card.totalQuantity && gradeCount[card.photoCard.grade] !== undefined) {
      gradeCount[card.photoCard.grade] += card.totalQuantity;
    }
  });

  // 전체 수량
  const totalRemain = Object.values(gradeCount).reduce((sum, val) => sum + val, 0);

  return (
    <div className="w-full mx-auto flex flex-col sm:max-w-[345px] sm:mt-[20px] md:max-w-[704px] md:mt-[40px] lg:max-w-[1480px] lg:mt-[40px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <span className="text-gray-200 sm:text-[14px] md:text-[20px] lg:text-[24px] font-bold">
          {/**로그인한 유저명 */}님이 보유한 포토카드
        </span>
        <span className="text-gray-300 text-right sm:text-[12px] lg:text-[18px] lg:text-[20px] font-normal">
          ({totalRemain}장)
        </span>
      </div>
      <div className="flex sm:gap-[10px] md:gap-[10px] lg:gap-[20px]">
        <GradeBox grade="COMMON" count={gradeCount.COMMON} />
        <GradeBox grade="RARE" count={gradeCount.RARE} />
        <GradeBox grade="SUPER_RARE" count={gradeCount.SUPER_RARE} />
        <GradeBox grade="LEGENDARY" count={gradeCount.LEGENDARY} />
      </div>

      <div className="border-b border-gray-400 sm:my-[15px] md:mt-[40px] md:mb-[20px] lg:mt-[40px] lg:mb-[20px]" />
    </div>
  );
}
